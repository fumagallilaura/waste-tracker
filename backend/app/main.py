from fastapi import FastAPI
from app.adapters.inbound.api.v1.endpoints.category import router as category_router

app = FastAPI(
    title="Kitchen Waste Tracker API",
    description="API de gestão de desperdício e custos operacionais com Arquitetura Hexagonal",
    version="1.0.0"
)

app.include_router(category_router, prefix="/api/v1")

@app.get("/health", tags=["Health Check"])
def health_check():
    return {
        "status": "online",
        "service": "kitchen-waste-tracker-backend",
        "architecture": "hexagonal"
    }

@app.get("/")
def read_root():
    return {"message": "Waste Tracker API is running! Check /docs for documentation."}