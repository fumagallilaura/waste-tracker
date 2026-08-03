from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.adapters.inbound.api.v1.endpoints.category import router as category_router
from app.adapters.inbound.api.v1.endpoints.expense import router as expense_router
from app.adapters.outbound.database.session import SessionLocal, engine
from app.adapters.outbound.database.base import Base
from app.core.use_cases.seed_categories import seed_default_categories

# Importante para o Base reconhecer os models
from app.adapters.outbound.database.model.category_model import CategoryModel
from app.adapters.outbound.database.model.expense_model import ExpenseModel

app = FastAPI(
    title="Kitchen Waste Tracker API",
    description="API de gestão de desperdício e custos operacionais com Arquitetura Hexagonal",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_default_categories(db)
    finally:
        db.close()

app.include_router(category_router, prefix="/api/v1")
app.include_router(expense_router, prefix="/api/v1")

@app.get("/health", tags=["Health Check"])
def health_check():
    return {"status": "online", "service": "kitchen-waste-tracker-backend"}

@app.get("/")
def read_root():
    return {"message": "Waste Tracker API is running!"}