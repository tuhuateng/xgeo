from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from starlette.middleware.sessions import SessionMiddleware
from . import models, database
from .services import deepseek, auth
import os

# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Session Middleware is required for Authlib
# SECRET_KEY should be in .env, using a default for dev
app.add_middleware(SessionMiddleware, secret_key=os.environ.get("SECRET_KEY", "dev_secret_key"))

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "GEO Content Flow API is running (SQLAlchemy + AI + Auth)"}


@app.get("/api/auth/wechat/login")
async def login_wechat(request: Request):
    redirect_uri = request.url_for('auth_wechat_callback')
    return await auth.oauth.wechat.authorize_redirect(request, redirect_uri)

@app.get("/api/auth/wechat/callback")
async def auth_wechat_callback(request: Request, db: Session = Depends(get_db)):
    try:
        token = await auth.oauth.wechat.authorize_access_token(request)
        user_info = await auth.oauth.wechat.userinfo(token=token)
        if user_info:
            # Check if user exists (WeChat uses openid or unionid)
            # For simplicity, we'll map openid to email-like format if email is missing
            wechat_id = user_info.get('openid')
            fake_email = f"{wechat_id}@wechat.user"
            
            db_user = db.query(models.User).filter(models.User.email == fake_email).first()
            if not db_user:
                # Create new user
                db_user = models.User(
                    email=fake_email,
                    name=user_info.get('nickname', 'WeChat User'),
                    avatar=user_info.get('headimgurl', ''),
                    role="registered"
                )
                db.add(db_user)
                db.commit()
                db.refresh(db_user)
            
            # Update session
            request.session['user'] = {
                "id": db_user.id,
                "email": db_user.email,
                "name": db_user.name,
                "avatar": db_user.avatar,
                "role": db_user.role
            }
            
        return {"user": request.session.get('user'), "token": token}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/auth/me")
async def get_current_user(request: Request):
    user = request.session.get('user')
    if not user:
        # For demo, return a mock user if not logged in
        return {
            "name": "Demo User", 
            "avatar": "https://github.com/shadcn.png",
            "role": "registered"
        }
        # In production: raise HTTPException(status_code=401, detail="Not authenticated")
    return user
    

# --- AI Analysis Route ---
from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    brand: str

@app.post("/api/analyze")
async def analyze_brand(request: AnalyzeRequest, db: Session = Depends(get_db)):
    # Call Multi-Model Analysis
    from .services import analysis
    result = await analysis.analyze_brand_across_models(request.brand)
    
    if result:
        # Save to DB
        new_score = models.GeoScore(
            total=result.get("total_score", 0),
            visibility=result.get("dimensions", {}).get("visibility", 0),
            comprehension=result.get("dimensions", {}).get("comprehension", 0),
            representation=result.get("dimensions", {}).get("representation", 0),
            optimization=result.get("dimensions", {}).get("optimization", 0)
        )
        db.add(new_score)
        db.commit()
        db.refresh(new_score)
        
        # Save Model Comparisons
        if "model_breakdown" in result:
            for m in result["model_breakdown"]:
                comp = models.ModelComparison(
                    region="china" if m["provider"] in ["Doubao", "Kimi"] else "global",
                    model_name=m["provider"],
                    score=m.get("score", 0)
                )
                db.add(comp)
            db.commit()
        
        return result
    
    raise HTTPException(status_code=500, detail="Analysis failed")

@app.get("/api/dashboard/overview")
def get_overview(db: Session = Depends(get_db)):
    try:
        # Try to get latest score
        score = db.query(models.GeoScore).order_by(models.GeoScore.created_at.desc()).first()
        if not score:
            # Insert mock data if empty
            mock_score = models.GeoScore(
                total=82.4,
                visibility=86,
                comprehension=79,
                representation=83,
                optimization=77
            )
            db.add(mock_score)
            db.commit()
            db.refresh(mock_score)
            return mock_score
        return score
    except Exception as e:
        print(f"Error fetching overview: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/dashboard/models")
def get_models(db: Session = Depends(get_db)):
    try:
        models_data = db.query(models.ModelComparison).all()
        if not models_data:
            # Insert mock data
            mock_data = [
                models.ModelComparison(region="china", model_name="文心一言", score=90),
                models.ModelComparison(region="china", model_name="智谱GLM", score=74),
                models.ModelComparison(region="china", model_name="Kimi", score=78),
                models.ModelComparison(region="china", model_name="豆包", score=75),
                models.ModelComparison(region="global", model_name="ChatGPT", score=85),
                models.ModelComparison(region="global", model_name="Claude", score=83),
                models.ModelComparison(region="global", model_name="Gemini", score=81),
                models.ModelComparison(region="global", model_name="Perplexity", score=79)
            ]
            db.add_all(mock_data)
            db.commit()
            for m in mock_data: db.refresh(m)
            return mock_data
        return models_data
    except Exception as e:
        print(f"Error fetching models: {e}")
        return []

@app.get("/api/dashboard/recommendations")
def get_recommendations(db: Session = Depends(get_db)):
    try:
        recs = db.query(models.Recommendation).all()
        if not recs:
            # Insert mock data
            mock_recs = [
                models.Recommendation(
                    type="content", priority="high", title="结构化FAQ优化",
                    suggestion="在官网首页添加FAQ结构化模块，明确品牌USP与关键词匹配",
                    impact="+12% 理解度提升", action="立即优化"
                ),
                models.Recommendation(
                    type="schema", priority="medium", title="JSON-LD结构化数据",
                    suggestion="为产品页增加JSON-LD标注以提高LLM索引能力",
                    impact="+8% 可见度提升", action="查看方案"
                ),
                models.Recommendation(
                    type="authority", priority="high", title="高权威信源扩展",
                    suggestion="增加知乎专栏、CSDN等高权威平台的内容发布频率",
                    impact="+15% 提及率提升", action="制定策略"
                )
            ]
            db.add_all(mock_recs)
            db.commit()
            for r in mock_recs: db.refresh(r)
            return mock_recs
        return recs
    except Exception as e:
        print(f"Error fetching recommendations: {e}")
        return []
