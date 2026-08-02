from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, ConfigDict
from sqlalchemy.orm import Session

from app.adapters.outbound.database.session import get_db 
from app.adapters.outbound.database.repository.category_repository import CategoryRepository
from app.core.use_cases.category_use_case import CategoryUseCase

router = APIRouter(prefix="/categories", tags=["Categories"])

class CategoryCreate(BaseModel):
    name: str
    parent_id: Optional[str] = None

class CategoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    parent_id: Optional[str] = None

def get_category_use_case(db: Session = Depends(get_db)) -> CategoryUseCase:
    repo = CategoryRepository(db)
    return CategoryUseCase(repo)

@router.post("/", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
def create_category(payload: CategoryCreate, use_case: CategoryUseCase = Depends(get_category_use_case)):
    return use_case.create_category(name=payload.name, parent_id=payload.parent_id)

@router.get("/", response_model=List[CategoryResponse])
def list_categories(use_case: CategoryUseCase = Depends(get_category_use_case)):
    return use_case.list_categories()

@router.get("/{category_id}", response_model=CategoryResponse)
def get_category(category_id: str, use_case: CategoryUseCase = Depends(get_category_use_case)):
    category = use_case.get_category_by_id(category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(category_id: str, use_case: CategoryUseCase = Depends(get_category_use_case)):
    category = use_case.get_category_by_id(category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    use_case.delete_category(category_id)
    return None