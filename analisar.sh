#!/bin/bash

# Removemos o 'set -e' estrito para evitar que uma falha isolada interrompa todo o script abruptamente
set +e

echo "🚀 Iniciando o SonarQube e o banco de dados..."
docker compose up -d sonarqube db

echo "⏳ Aguardando o SonarQube iniciar completamente..."
until curl -s http://localhost:9000/api/system/status | grep -q '"status":"UP"'; do
  sleep 5
  echo -n "."
done

echo -e "\n⏳ Aguardando o motor interno do SonarQube estabilizar..."
sleep 10

echo "🔑 Tentando gerar o token de autenticação automaticamente..."
SONAR_TOKEN=""
for i in {1..5}; do
  TOKEN_RESPONSE=$(curl -s -u "admin:S&nh@!123456" -X POST "http://localhost:9000/api/user_tokens/generate?name=auto-token-$(date +%s)")
  SONAR_TOKEN=$(echo "$TOKEN_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('token', ''))" 2>/dev/null)

  if [ -n "$SONAR_TOKEN" ] && [ "$SONAR_TOKEN" != "None" ]; then
    break
  fi
  
  sleep 3
done

# Se falhar, pede a intervenção rápida para primeiro acesso
if [ -z "$SONAR_TOKEN" ] || [ "$SONAR_TOKEN" == "None" ]; then
  echo -e "\n⚠️  [PRIMEIRO ACESSO DETECTADO]"
  echo "O SonarQube exige a alteração da senha padrão no primeiro login."
  echo "--------------------------------------------------------------------------------"
  echo "1️⃣ Abra o navegador em: http://localhost:9000"
  echo "2️⃣ Faça login com: admin / S&nh@!123456"
  echo "3️⃣ Altere a senha e finalize a tela de boas-vindas."
  echo "--------------------------------------------------------------------------------"
  read -p "Pressione [ENTER] aqui no terminal assim que terminar de alterar a senha..."

  TOKEN_RESPONSE=$(curl -s -u "admin:S&nh@!123456" -X POST "http://localhost:9000/api/user_tokens/generate?name=auto-token-$(date +%s)")
  SONAR_TOKEN=$(echo "$TOKEN_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('token', ''))" 2>/dev/null)
  
  if [ -z "$SONAR_TOKEN" ] || [ "$SONAR_TOKEN" == "None" ]; then
    echo "❌ Erro ao gerar o token. Verifique a senha cadastrada."
    exit 1
  fi
fi

echo "✅ Token gerado com sucesso!"

# --- Cobertura e Análise do Backend ---
echo "🧪 Executando testes e gerando relatório de cobertura do Backend..."
cd backend

if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
elif [ -f ".venv/bin/activate" ]; then
    source .venv/bin/activate
elif [ -f "venv/Scripts/activate" ]; then
    source venv/Scripts/activate
elif [ -f ".venv/Scripts/activate" ]; then
    source .venv/Scripts/activate
fi

pip install -q pytest-cov

if command -v pytest &> /dev/null; then
    pytest --cov=app --cov-report=xml:coverage.xml
elif [ -f "venv/bin/pytest" ]; then
    venv/bin/pytest --cov=app --cov-report=xml:coverage.xml
elif [ -f "venv/Scripts/pytest.exe" ]; then
    venv/Scripts/pytest.exe --cov=app --cov-report=xml:coverage.xml
else
    python -m pytest --cov=app --cov-report=xml:coverage.xml
fi

if type deactivate &> /dev/null; then
    deactivate
fi

cd ..

# --- Análise do Backend ---
echo "🔍 Executando análise do Backend no SonarQube..."
MSYS_NO_PATHCONV=1 docker run --rm -i \
  --network waste-tracker_waste-network \
  -v "${PWD}:/usr/src" \
  sonarsource/sonar-scanner-cli \
  -Dsonar.host.url=http://sonarqube:9000 \
  -Dsonar.token=$SONAR_TOKEN \
  -Dsonar.projectBaseDir=/usr/src \
  -Dproject.settings=sonar-project-backend.properties

# --- Análise do Frontend ---
echo "🔍 Executando análise do Frontend no SonarQube..."
MSYS_NO_PATHCONV=1 docker run --rm -i \
  --network waste-tracker_waste-network \
  -v "${PWD}:/usr/src" \
  sonarsource/sonar-scanner-cli \
  -Dsonar.host.url=http://sonarqube:9000 \
  -Dsonar.token=$SONAR_TOKEN \
  -Dsonar.projectBaseDir=/usr/src \
  -Dproject.settings=sonar-project-frontend.properties

echo "🎉 Análises do Backend e Frontend concluídas com sucesso! Acesse http://localhost:9000 para ver os resultados separados."