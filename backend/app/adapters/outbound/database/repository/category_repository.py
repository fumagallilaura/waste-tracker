from typing import List, Optional
from sqlalchemy.orm import Session
from app.core.domain.category import Category
from app.ports.outbound.category_repository_port import CategoryRepositoryPort
from app.adapters.outbound.database.model.category_model import CategoryModel

class CategoryRepository(CategoryRepositoryPort):
    def __init__(self, session: Session):
        self.session = session

    def save(self, category: Category) -> Category:
        db_category = CategoryModel(
            id=category.id,
            name=category.name,
            parent_id=category.parent_id,
            created_z=category.created_z
        )
        self.session.add(db_category)
        self.session.commit()
        self.session.refresh(db_category)
        return category

    def find_all(self) -> List[Category]:
        models = self.session.query(CategoryModel).all()
        return [
            Category(id=m.id, name=m.name, parent_id=m.parent_id, created_z=m.created_z)
            for m in models
        ]

    def find_by_id(self, category_id: str) -> Optional[Category]:
        m = self.session.query(CategoryModel).filter(CategoryModel.id == category_id).first()
        if not m:
            return None
        return Category(id=m.id, name=m.name, parent_id=m.parent_id, created_z=m.created_z)

    def delete(self, category_id: str) -> None:
        m = self.session.query(CategoryModel).filter(CategoryModel.id == category_id).first()
        if m:
            self.session.delete(m)
            self.session.commit()