# Waste Tracker - Back-end

API desenvolvida em **FastAPI** utilizando arquitetura limpa (Clean Architecture), ORM SQLAlchemy e Pydantic para gestão de insumos, gastos e receitas.

## 🚀 Tecnologias
* Python 3.10+
* FastAPI
* SQLAlchemy
* Uvicorn
* Pydantic

## 📂 Estrutura do Projeto
* `app/core/`: Domínio da aplicação e casos de uso (regras de negócio).
* `app/adapters/inbound/`: Rotas/Endpoints da API (FastAPI) e Schemas de validação.
* `app/adapters/outbound/`: Conexão com banco de dados, sessões e repositórios.

## ⚙️ Como Executar

1. **Abra o terminal na pasta do back-end:**
   ```bash
   cd backend
   ```
2. Crie e ative um ambiente virtual:
```bash
python -m venv venv
# No Windows:
venv\Scripts\activate
# No Mac/Linux:
source venv/bin/activate
```
3. Instale as dependências:
```bash
pip install fastapi uvicorn sqlalchemy pydantic
# Ou se houver requirements.txt:
pip install -r requirements.txt
```
4. Execute o servidor de desenvolvimento:
```bash
uvicorn app.main:app --reload
```

A API estará rodando em http://localhost:8000. Você pode acessar a documentação interativa (Swagger UI) em http://localhost:8000/docs