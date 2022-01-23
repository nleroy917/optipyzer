import sys, os

from tests.data import DNA_QUERY, PEPTIDE_QUERY
myPath = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, myPath + '/../')

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

REQUIRED_RESPONSE_DATA = [
        'query',
        'weights',
        'seq_type',
        'peptide_seq',
        'dna_seq',
        'stop_codon',
        'optimized_sd',
        'min_difference_sumsquares',
        'best_expression_sd',
        'optimized_ad',
        'min_difference_absvalue',
        'best_expression_ad'
    ]

def test_dna_optimization():
    # validate call
    response = client.post(
        "/optimize/dna",
        json=DNA_QUERY
    )
    assert response.status_code == 200

    # valdiate data
    data = response.json()
    assert all(k in data for k in REQUIRED_RESPONSE_DATA)

def test_dna_optimization():
    # validate call
    response = client.post(
        "/optimize/protein",
        json=PEPTIDE_QUERY
    )
    assert response.status_code == 200

    # valdiate data
    data = response.json()
    assert all(k in data for k in REQUIRED_RESPONSE_DATA)