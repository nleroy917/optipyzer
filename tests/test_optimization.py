import sys, os

from tests.data import DNA_QUERY
myPath = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, myPath + '/../')

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_dna_optimization():
    response = client.post(
        "/optimize/dna",
        json=DNA_QUERY
    )
    assert response.status_code == 200