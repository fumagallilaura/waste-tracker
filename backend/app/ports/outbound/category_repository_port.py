from abc import ABC, abstractmethod
from typing import List, Optional
from app.core.domain.category import Category

class CategoryRepositoryPort(ABC):

    @abstractmethod
    def save(self, category: Category) -> Category:
        pass

    @abstractmethod
    def find_all(self) -> List[Category]:
        pass

    @abstractmethod
    def find_by_id(self, category_id: str) -> Optional[Category]:
        pass

    @abstractmethod
    def delete(self, category_id: str) -> None:
        pass