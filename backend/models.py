from sqlalchemy import Column, Integer, String, Float, Numeric, DateTime
from sqlalchemy.sql import func
from .database import Base

class GeoScore(Base):
    __tablename__ = "geo_scores"

    id = Column(Integer, primary_key=True, index=True)
    total = Column(Float)
    visibility = Column(Float)
    comprehension = Column(Float)
    representation = Column(Float)
    optimization = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ModelComparison(Base):
    __tablename__ = "model_comparisons"

    id = Column(Integer, primary_key=True, index=True)
    region = Column(String)
    model_name = Column(String)
    score = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)
    priority = Column(String)
    title = Column(String)
    suggestion = Column(String)
    impact = Column(String)
    action = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String, unique=True, index=True, nullable=True)
    name = Column(String)
    avatar = Column(String)
    role = Column(String, default="user")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class VerificationCode(Base):
    __tablename__ = "verification_codes"

    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String, index=True)
    code = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True))
