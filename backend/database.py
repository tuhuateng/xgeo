from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
import pathlib

# Load env
env_path = pathlib.Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

# Default to sqlite for development if no DATABASE_URL is set
# This allows the user to run immediately without installing Postgres locally if they choose
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./sql_app.db")

# Handle Postgres URL format for SQLAlchemy (postgres:// -> postgresql://)
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
