from sqlalchemy import Column, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.adapters.outbound.database.base import Base

class ExpenseModel(Base):
    __tablename__ = "expenses"

    id = Column(String(36), primary_key=True)
    description = Column(String(200), nullable=False)
    amount = Column(Float, nullable=False)
    category_id = Column(String(36), ForeignKey("categories.id", ondelete="SET NULL"), nullable=True)
    created_z = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relacionamento opcional com a categoria
    category = relationship("CategoryModel", backref="expenses")