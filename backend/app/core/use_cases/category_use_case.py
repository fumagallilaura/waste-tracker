import uuid
from typing import List, Optional
from app.core.domain.category import Category
from app.ports.outbound.category_repository_port import CategoryRepositoryPort

class CategoryUseCase:
    def __init__(self, repository: CategoryRepositoryPort):
        self.repository = repository

    def create_category(self, name: str, parent_id: Optional[str] = None) -> Category:
        category_id = str(uuid.uuid4())
        category = Category(id=category_id, name=name, parent_id=parent_id)
        return self.repository.save(category)

    def list_categories(self) -> List[Category]:
        return self.repository.find_all()

    def get_category_by_id(self, category_id: str) -> Optional[Category]:
        return self.repository.find_by_id(category_id)

    def delete_category(self, category_id: str) -> None:
        self.repository.delete(category_id)