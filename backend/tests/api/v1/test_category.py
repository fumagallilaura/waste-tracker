def test_create_category(client):
    response = client.post(
        "/api/v1/categories/",
        json={"name": "Eletrônicos", "parent_id": None}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Eletrônicos"
    assert "id" in data

def test_list_categories(client):
    # Cria uma categoria primeiro
    client.post("/api/v1/categories/", json={"name": "Alimentação"})

    # Testa a listagem
    response = client.get("/api/v1/categories/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Alimentação"