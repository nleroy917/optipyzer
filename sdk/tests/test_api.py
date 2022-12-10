import pytest
import optipyzer

@pytest.fixture
def api() -> optipyzer.API:
    return optipyzer.API(local=False)

@pytest.fixture
def dna_seq():
  return "ATGGCCCTTTAA"

@pytest.fixture
def protein_seq():
  return "MAMAPRTEINSEQENCE"

def test_optimize_dna(api: optipyzer.API, dna_seq: str):

  result = api.optimize(
    seq=dna_seq,
    seq_type="dna",
    weights={122563: 2, 122638: 1},
  )

  assert isinstance(result['optimized_ad'], str)
  assert isinstance(result['optimized_sd'], str)

def test_optimize_dna_with_pop_names(api: optipyzer.API, dna_seq: str):

  result = api.optimize(
    seq=dna_seq,
    seq_type="dna",
    weights={"human": 2, "mouse": 1},
  )

  assert isinstance(result['optimized_ad'], str)
  assert isinstance(result['optimized_sd'], str)

def test_optimize_protein(api: optipyzer.API, protein_seq: str):

  result = api.optimize(
    seq=protein_seq,
    seq_type="protein",
    weights={122563: 2, 122638: 1},
  )

  assert isinstance(result['optimized_ad'], str)
  assert isinstance(result['optimized_sd'], str)

def test_optimize_protein_with_pop_names(api: optipyzer.API, protein_seq: str):

    result = api.optimize(
      seq=protein_seq,
      seq_type="protein",
      weights={"human": 2, "mouse": 1},
    )

    assert isinstance(result['optimized_ad'], str)
    assert isinstance(result['optimized_sd'], str)

def test_search(api: optipyzer.API):
    result = api.search("homo sapiens")
    assert len(result) > 0
    for s in result['organisms']:
        assert "homo sapiens" in s["species"].lower()

def test_pull_codons(api: optipyzer.API):
    result = api.pull_codons("human")
    assert isinstance(result, dict)
    assert isinstance(result['codon_usage'], dict)