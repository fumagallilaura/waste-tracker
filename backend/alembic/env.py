import os
import sys
from logging.config import fileConfig
from dotenv import load_dotenv

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# Adiciona o diretório raiz do backend ao PYTHONPATH do Python
current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(current_dir, ".."))
sys.path.insert(0, current_dir)
sys.path.insert(0, root_dir)

# Carrega as variáveis do arquivo .env se ele existir localmente
load_dotenv()

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Sobrescreve a URL do alembic.ini com a variável de ambiente DATABASE_URL, se definida
database_url = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/waste_tracker")
if database_url:
    config.set_main_option("sqlalchemy.url", database_url)

# Interpret the config file for Python logging.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Importe o Base dos seus modelos SQLAlchemy e atribua ao target_metadata
# 1. Importe o Base do local correto do seu projeto
from app.adapters.outbound.database.base import Base
from app.adapters.outbound.database.model.category_model import CategoryModel
from app.adapters.outbound.database.model.expense_model import ExpenseModel

target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()