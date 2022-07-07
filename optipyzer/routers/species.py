from fastapi import APIRouter, Depends

from optipyzer.dependencies import verify_org_id

from ..request_models import species_name
from ..response_models import CodonUsage, SearchResult
from ..db.interfaces import (
    calc_codon_usage,
    get_autocomplete_organisms,
    get_species_by_id,
    search_for_species,
)

router = APIRouter(prefix="/species")


@router.get("/")
async def get_species_list():
    orgs = get_autocomplete_organisms()
    return {"organisms": orgs}


@router.get("/search", response_model=SearchResult)
async def search_species(name: str = species_name, limit: int = None):
    """Search for a species"""
    if limit is not None:
        results = search_for_species(name)[:limit]
    else:
        results = search_for_species(name)

    return {"num_results": len(results), "organisms": results, "search_query": name}


@router.get("/{org_id}")
async def get_organism(org_id: str = Depends(verify_org_id)):
    org = get_species_by_id(org_id)
    return {"organism": org, "id": org_id}


@router.get("/{org_id}/codons", response_model=CodonUsage)
async def get_organism_codon_usage(org_id: str = Depends(verify_org_id)):
    org = get_species_by_id(org_id)
    counts, codon_usage = calc_codon_usage(org_id)
    return {"organism": org, "counts": counts, "codon_usage": codon_usage}
