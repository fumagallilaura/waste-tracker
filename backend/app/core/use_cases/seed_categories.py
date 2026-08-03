from sqlalchemy.orm import Session
from app.adapters.outbound.database.model.category_model import CategoryModel
import uuid

def seed_default_categories(db: Session):
    existing_count = db.query(CategoryModel).count()
    if existing_count > 0:
        return  # Já possui categorias, não faz nada

    default_categories = [
        {"id": str(uuid.uuid4()), "name": "Alimentação", "parent_id": None},
        {"id": str(uuid.uuid4()), "name": "Transporte", "parent_id": None},
        {"id": str(uuid.uuid4()), "name": "Lazer", "parent_id": None},
        {"id": str(uuid.uuid4()), "name": "Hortifruti", "parent_id": None}, # Exemplo útil para cozinha
    ]

    for cat_data in default_categories:
        category = CategoryModel(
            id=cat_data["id"],
            name=cat_data["name"],
            parent_id=cat_data["parent_id"]
        )
        db.add(category)
    
    db.commit()