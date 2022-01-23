from fastapi import APIRouter, Depends

from optipyzer.optimization import codon_optimize
from optipyzer.request_models import OptimizeQuery
from optipyzer.response_models import OptimizationResult

from ..dependencies import verify_dna, verify_protein

router = APIRouter(
    prefix="/optimize"
)

@router.post("/dna", response_model=OptimizationResult)
def optimize_dna(query: OptimizeQuery = Depends(verify_dna)):
    """Codon optimize a DNA sequence given a list of organism weights"""
    # map to list of organisms
    organism_list = [str(x) for x in query.weights]

    # coerce all weights and org_id's to str
    weights_cleaned = {}
    for org in query.weights:
        weights_cleaned[str(org)] = float(query.weights[org])

    result = codon_optimize(
        query.seq, organism_list, query.weights, seq_type='dna'
    )

    return result

@router.post("/protein", response_model=OptimizationResult)
def optimize_protein(query: OptimizeQuery = Depends(verify_protein)):
    """Codon optimize a protein sequence given a list of organism weights"""
    # map to list of organisms
    organism_list = [str(x) for x in query.weights]

    # coerce all weights and org_id's to str
    weights_cleaned = {}
    for org in query.weights:
        weights_cleaned[str(org)] = float(query.weights[org])

    result = codon_optimize(
        query.seq, organism_list, query.weights, seq_type='protein'
    )

    return result