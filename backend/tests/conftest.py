import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app as fastapi_app
from app.adapters.outbound.database.base import Base
from app.adapters.outbound.database.session import get_db

# Importa o módulo dos models para que o Base conheça as tabelas
import app.adapters.outbound.database.model.category_model  # noqa: F401

# Banco SQLite em memória com StaticPool para manter a mesma conexão/tabelas ativas durante os testes
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db_session():
    # Cria as tabelas do banco em memória antes de cada teste
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        # Limpa as tabelas após o teste
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def client(db_session):
    # Sobrescreve a dependência get_db da aplicação para usar a sessão de teste
    def override_get_db():
        try:
            yield db_session
        finally:
            pass  # O fechamento é gerenciado pela fixture db_session

    fastapi_app.dependency_overrides[get_db] = override_get_db
    with TestClient(fastapi_app) as c:
        yield c
    fastapi_app.dependency_overrides.clear()