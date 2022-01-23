from fastapi import APIRouter

from ..request_models import species_name
from ..response_models import SearchResult
from ..db.interfaces import calc_codon_usage, get_autocomplete_organisms, get_species_by_id, search_for_species

router = APIRouter(
    prefix="/species"
)

@router.get("/")
async def get_species_list():
    orgs = get_autocomplete_organisms()
    return {
        'organisms': orgs
    }

@router.get("/search", response_model=SearchResult)
async def search_species(name: str = species_name, limit: int = None):
    """Search for a species"""
    if limit is not None:
        results = search_for_species(name)[:limit]
    else:
        results = search_for_species(name)
    
    return {
        'num_results': len(results),
        'organisms': results,
        'search_query': name
    }

@router.get("/{id}")
async def get_organism(id: str):
    org = get_species_by_id(id)
    return {
        'organism': org,
        'id': id
    }

@router.get("/{id}/codons")
async def get_organism_codon_usage(id: str):
    org = get_species_by_id(id)
    counts, codon_usage = calc_codon_usage(id)
    return {
        'organism': org,
        'counts': counts,
        'codon_usage': codon_usage
    }