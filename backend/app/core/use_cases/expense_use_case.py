import uuid
from typing import List, Optional
from app.core.domain.expense import Expense
from app.ports.outbound.expense_repository_port import ExpenseRepositoryPort

class ExpenseUseCase:
    def __init__(self, repository: ExpenseRepositoryPort):
        self.repository = repository

    def create_expense(self, description: str, amount: float, category_id: Optional[str] = None) -> Expense:
        expense_id = str(uuid.uuid4())
        expense = Expense(
            id=expense_id,
            description=description,
            amount=amount,
            category_id=category_id
        )
        return self.repository.save(expense)

    def list_expenses(self) -> List[Expense]:
        return self.repository.find_all()

    def get_expense_by_id(self, expense_id: str) -> Optional[Expense]:
        return self.repository.find_by_id(expense_id)

    def delete_expense(self, expense_id: str) -> None:
        self.repository.delete(expense_id)