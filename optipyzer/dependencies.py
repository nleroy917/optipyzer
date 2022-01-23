from fastapi import HTTPException

from .db.interfaces import get_species_by_id
from .const import VALID_AMINO_ACIDS
from .utils import clean_seq
from .request_models import OptimizeQuery

def verify_dna(query: OptimizeQuery):
    # clean seqeunce
    query.seq = clean_seq(query.seq)

    # verify that the sequeryuence length
    # is divisible by 3 (codons)
    if len(query.seq) % 3 != 0:
        raise HTTPException(400, detail="DNA sequence must be devisible by 3")
    
    # verify all characters are
    # ATGC
    for base, i in zip(query.seq, range(len(query.seq))):
        if base.upper() not in "ATGC":
            raise HTTPException(400, f"Invalid base '{base}' in query at position: {i}")
    return query

def verify_protein(query: OptimizeQuery):
    # clean seqeunce
    query.seq = clean_seq(query.seq)

    # verify each residue is valid
    for aa, i in zip(query.seq, range(len(query.seq))):
        if aa.upper() not in VALID_AMINO_ACIDS:
            raise HTTPException(400, f"Invalid residue '{aa}' in query at position: {i}")
    return query

def verify_org_id(org_id: str):
    org = get_species_by_id(org_id)
    if org is None:
        raise HTTPException(404, f"Organism id '{org_id}' not found in database.")
    return org_id