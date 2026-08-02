import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres:postgres@localhost:5432/waste_tracker"
)

# Cria a engine do SQLAlchemy
engine = create_engine(DATABASE_URL)

# Cria a fábrica de sessões (SessionLocal)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """
    Fábrica de sessão (Dependency Injection para o FastAPI).
    Abre a conexão com o banco, entrega para a rota usar,
    e garante que será fechada ao final da requisição (mesmo se houver erro).
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()