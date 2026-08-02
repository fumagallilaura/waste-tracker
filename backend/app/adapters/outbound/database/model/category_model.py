from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.adapters.outbound.database.base import Base

class CategoryModel(Base):
    __tablename__ = "categories"

    id = Column(String(36), primary_key=True)
    name = Column(String(100), nullable=False)
    parent_id = Column(String(36), ForeignKey("categories.id", ondelete="CASCADE"), nullable=True)
    created_z = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Auto-relacionamento para árvore de categorias
    parent = relationship("CategoryModel", remote_side=[id], back_populates="children")
    children = relationship("CategoryModel", back_populates="parent", cascade="all, delete-orphan")