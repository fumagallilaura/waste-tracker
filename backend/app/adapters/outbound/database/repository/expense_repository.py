from typing import List, Optional
from sqlalchemy.orm import Session
from app.core.domain.expense import Expense
from app.ports.outbound.expense_repository_port import ExpenseRepositoryPort
from app.adapters.outbound.database.model.expense_model import ExpenseModel

class ExpenseRepository(ExpenseRepositoryPort):
    def __init__(self, session: Session):
        self.session = session

    def save(self, expense: Expense) -> Expense:
        db_expense = ExpenseModel(
            id=expense.id,
            description=expense.description,
            amount=expense.amount,
            category_id=expense.category_id,
            created_z=expense.created_z
        )
        self.session.add(db_expense)
        self.session.commit()
        self.session.refresh(db_expense)
        return expense

    def find_all(self) -> List[Expense]:
        models = self.session.query(ExpenseModel).all()
        return [
            Expense(
                id=m.id,
                description=m.description,
                amount=m.amount,
                category_id=m.category_id,
                created_z=m.created_z
            )
            for m in models
        ]

    def find_by_id(self, expense_id: str) -> Optional[Expense]:
        m = self.session.query(ExpenseModel).filter(ExpenseModel.id == expense_id).first()
        if not m:
            return None
        return Expense(
            id=m.id,
            description=m.description,
            amount=m.amount,
            category_id=m.category_id,
            created_z=m.created_z
        )

    def delete(self, expense_id: str) -> None:
        m = self.session.query(ExpenseModel).filter(ExpenseModel.id == expense_id).first()
        if m:
            self.session.delete(m)
            self.session.commit()