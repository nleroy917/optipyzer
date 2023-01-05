from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException

from ..optimization import codon_optimize
from ..request_models import OptimizeQuery
from ..response_models import OptimizationResult
from ..const import DEFAULT_NUM_ITERATIONS
from ..dependencies import verify_dna, verify_protein
from ..utils import prepare_org_id

router = APIRouter(prefix="/optimize")


@router.post("/dna", response_model=OptimizationResult)
def optimize_dna(query: OptimizeQuery = Depends(verify_dna)):
    """Codon optimize a DNA sequence given a list of organism weights"""
    # map to list of organisms
    try:
        organism_list = [prepare_org_id(x) for x in query.weights]
        for species in list(query.weights.keys()):
            query.weights[prepare_org_id(species)] = query.weights.pop(species)
    except ValueError as e:
        raise HTTPException(
            status_code=400, detail=f"Error validating organism id: {e}"
        )

    result = codon_optimize(
        query.seq,
        organism_list,
        query.weights,
        seq_type="dna",
        iterations=(query.iterations or DEFAULT_NUM_ITERATIONS),
        seed=query.seed,
    )

    return result


@router.post("/protein", response_model=OptimizationResult)
def optimize_protein(query: OptimizeQuery = Depends(verify_protein)):
    """Codon optimize a protein sequence given a list of organism weights"""
    # map to list of organisms
    try:
        organism_list = [prepare_org_id(x) for x in query.weights]
        for species in list(query.weights.keys()):
            query.weights[prepare_org_id(species)] = query.weights.pop(species)
    except ValueError as e:
        raise HTTPException(
            status_code=400, detail=f"Error validating organism id: {e}"
        )

    result = codon_optimize(
        query.seq,
        organism_list,
        query.weights,
        seq_type="protein",
        iterations=(query.iterations or DEFAULT_NUM_ITERATIONS),
        seed=query.seed,
    )

    return result
