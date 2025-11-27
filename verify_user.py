from backend import models, database
from sqlalchemy.orm import Session

# Create tables
models.Base.metadata.create_all(bind=database.engine)

def test_user_creation():
    db = database.SessionLocal()
    try:
        # Check if test user exists
        user = db.query(models.User).filter(models.User.email == "test@example.com").first()
        if not user:
            print("Creating test user...")
            user = models.User(
                email="test@example.com",
                name="Test User",
                role="white_label"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        
        print(f"User found: {user.name}, Role: {user.role}")
        assert user.role == "white_label"
        print("Verification Successful!")
    except Exception as e:
        print(f"Verification Failed: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    test_user_creation()
