import sys, os
myPath = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, myPath + '/../')

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_base():
    response = client.get("/")
    assert response.status_code == 200