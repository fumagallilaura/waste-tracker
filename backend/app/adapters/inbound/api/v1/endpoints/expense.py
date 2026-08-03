from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, ConfigDict
from sqlalchemy.orm import Session

from app.adapters.outbound.database.session import get_db
from app.adapters.outbound.database.repository.expense_repository import ExpenseRepository
from app.core.use_cases.expense_use_case import ExpenseUseCase

router = APIRouter(prefix="/expenses", tags=["Expenses"])

class ExpenseCreate(BaseModel):
    description: str
    amount: float
    category_id: Optional[str] = None

class ExpenseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    description: str
    amount: float
    category_id: Optional[str] = None

def get_expense_use_case(db: Session = Depends(get_db)) -> ExpenseUseCase:
    repo = ExpenseRepository(db)
    return ExpenseUseCase(repo)

@router.post("/", response_model=ExpenseResponse, status_code=status.HTTP_201_CREATED)
def create_expense(payload: ExpenseCreate, use_case: ExpenseUseCase = Depends(get_expense_use_case)):
    return use_case.create_expense(
        description=payload.description,
        amount=payload.amount,
        category_id=payload.category_id
    )

@router.get("/", response_model=List[ExpenseResponse])
def list_expenses(use_case: ExpenseUseCase = Depends(get_expense_use_case)):
    return use_case.list_expenses()

@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_expense(expense_id: str, use_case: ExpenseUseCase = Depends(get_expense_use_case)):
    expense = use_case.get_expense_by_id(expense_id)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    use_case.delete_expense(expense_id)
    return None