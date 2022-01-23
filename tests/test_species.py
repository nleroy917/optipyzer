import sys, os

from tests.data import TEST_ORG, TEST_ORG_ID, TEST_SEARCH_QUERY
myPath = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, myPath + '/../')

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_species_fetch():
    # validate call
    response = client.get("/species")
    assert response.status_code == 200

    # validate data
    data = response.json()
    assert 'organisms' in data
    assert len(data['organisms']) > 0

def test_species_by_id():
    # validate call
    response = client.get(f"/species/{TEST_ORG_ID}")
    assert response.status_code == 200

    # validate data
    data = response.json()
    assert data == TEST_ORG

def test_species_codon_usage():
    # validate call
    response = client.get(f"/species/{TEST_ORG_ID}/codons")
    assert response.status_code == 200

    # validate we received all the data that 
    # is to be returned and that it is
    # of the right type (dict)
    data = response.json()
    REQUIRED_DATA = [
        'organism', 'counts', 'codon_usage'
    ]
    assert all(
        k in data and isinstance(data[k], dict) for k in REQUIRED_DATA
    )

def test_species_search():
    # validate call
    response = client.get(f"/species/search?name={TEST_SEARCH_QUERY}")
    assert response.status_code == 200

    # assert that data is correct
    # structure
    data = response.json()
    assert 'num_results' in data
    assert isinstance(data['num_results'], int)
    assert 'organisms' in data
    assert isinstance(data['organisms'], list)
    assert 'search_query' in data
    assert isinstance(data['search_query'], str)