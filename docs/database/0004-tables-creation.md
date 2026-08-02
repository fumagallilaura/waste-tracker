# Guia Prático: Como Criar e Migrar Tabelas com SQLAlchemy e Alembic

Este guia documenta o passo a passo completo para criar uma nova tabela no banco de dados utilizando **SQLAlchemy** para modelagem e **Alembic** para versionamento e migração.

---

## Passo 1: Criar o Modelo SQLAlchemy

Os modelos de banco de dados devem ser estruturados dentro da camada de infraestrutura/persistência do projeto (por exemplo, em `app/adapters/outbound/database/model/`).

1. Crie um arquivo para o seu modelo (ex: `product_model.py`).
2. Herde a classe de base comum `Base` (que utiliza o novo `DeclarativeBase` do SQLAlchemy).
3. Defina a tabela, as colunas e os relacionamentos.

### Exemplo de Código (`product_model.py`):
```python
from sqlalchemy import Column, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.adapters.outbound.database.base import Base

class ProductModel(Base):
    __tablename__ = "products"

    id = Column(String(36), primary_key=True)
    name = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)
    created_z = Column(DateTime, default=datetime.utcnow, nullable=False)
```

---

## Passo 2: Registrar o Modelo no `env.py` do Alembic

Para que o Alembic consiga detectar a nova tabela automaticamente via `--autogenerate`, o modelo precisa ser lido pelo Python antes de carregar o `target_metadata` no arquivo de configuração de migrações (`alembic/env.py`).

Abra o arquivo `alembic/env.py` e adicione a importação explícita do seu novo modelo antes da linha do `target_metadata`:

```python
# Importe o modelo para que o SQLAlchemy o registre no metadata
from app.adapters.outbound.database.model.product_model import ProductModel

target_metadata = Base.metadata
```

---

## Passo 3: Garantir que o Banco de Dados está Ativo

Certifique-se de que o container do PostgreSQL está rodando em segundo plano antes de rodar os comandos do Alembic:

```bash
docker compose up db -d
```

---

## Passo 4: Gerar o Arquivo de Migração

Com o terminal na pasta do backend e com o ambiente virtual (`venv`) ativado, execute o comando do Alembic para gerar a migração automaticamente:

```bash
alembic revision --autogenerate -m "create products table"
```

Ela vai tentar usar o valor da variável `DATABASE_URL` e, caso não encontre definida, vai usar a connection string a seguir: `"postgresql://postgres:postgres@127.0.0.1:5432/waste_tracker"`

* **Dica:** Abra o arquivo gerado dentro de `alembic/versions/` e verifique se os comandos `op.create_table` foram gerados corretamente dentro da função `upgrade()`.

---

## Passo 5: Aplicar a Migração no Banco de Dados

Para efetivar a criação da tabela no PostgreSQL conectado, execute:

```bash
alembic upgrade head
```

---

## Passo 6: Validar no DBeaver

1. Abra o **DBeaver** e selecione a sua conexão com o banco (`waste_tracker`).
2. Expanda: `Schemas` $
ightarrow$ `public` $
ightarrow$ `Tabelas`.
3. Clique com o botão direito em cima de **Tabelas** e clique em **Atualizar** (ou aperte `F5`).
4. Verifique se a nova tabela (`products`) e a tabela de controle (`alembic_version`) aparecem listadas corretamente.

---

### Troubleshooting

```bash
alembic stamp head
```

---

## Boas Práticas

- Sempre revise o arquivo gerado: O recurso --autogenerate é excelente, mas não é infalível. Ele pode falhar ao detectar renomeações de colunas (interpretando erroneamente como um drop seguido de um add). Sempre abra o arquivo em versions/ antes de rodar o upgrade para garantir que o script gerado está correto.

- Importe todos os modelos no env.py (ou centralize-os): Como você viu no passo a passo, o Alembic só gera o código se o Python carregar a classe do modelo na memória antes de ler o target_metadata. Em projetos maiores, costuma-se criar um arquivo base que importa todos os modelos da aplicação de uma só vez para evitar esquecimentos.

- Mantenha as migrações no Version Control (Git): Os arquivos gerados dentro da pasta alembic/versions/ devem ser comitados junto com o seu código para que o histórico do banco acompanhe as branches da aplicação.
