# XGEO - 生成式引擎优化系统

AI驱动的内容生成、优化与分发平台，助力品牌实现智能化营销。

## 技术栈

- **前端**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **后端**: FastAPI (Python)
- **数据库**: PostgreSQL / Supabase
- **部署**: Render

## 本地开发

### 前端

```bash
npm install
npm run dev
```

### 后端

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

## 部署

本项目配置为使用 Render 进行部署。请参考 `DEPLOY_CN.md` 获取详细部署指南。
