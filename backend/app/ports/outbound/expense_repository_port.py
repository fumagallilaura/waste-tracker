from abc import ABC, abstractmethod
from typing import List, Optional
from app.core.domain.expense import Expense

class ExpenseRepositoryPort(ABC):

    @abstractmethod
    def save(self, expense: Expense) -> Expense:
        pass

    @abstractmethod
    def find_all(self) -> List[Expense]:
        pass

    @abstractmethod
    def find_by_id(self, expense_id: str) -> Optional[Expense]:
        pass

    @abstractmethod
    def delete(self, expense_id: str) -> None:
        pass