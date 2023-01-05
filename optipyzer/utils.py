import re
from typing import Union
from .const import AMINO_ACID_LOOKUP, CODON_LOOKUP, POPULAR_SPECIES


def aa_to_dna(seq: str) -> str:
    """Convert an amino acid sequence to a dna sequence"""
    dna = ""
    for res in seq:
        dna += CODON_LOOKUP[res.upper()]
    return dna


def dna_to_aa(seq: str) -> str:
    """Convert a DNA sequence to an amino acid sequence."""

    # validate input
    if len(seq) % 3 != 0:
        raise ValueError("Sequence must be divisible by 3.")

    protein = ""
    for i in range(0, len(seq), 3):
        codon = seq[i : i + 3]
        protein += AMINO_ACID_LOOKUP[codon]
    return protein


def seq_detect(seq: str) -> str:
    """Attempt to detect if a sequence is DNA or Protein"""
    if all(c.lower() in "atgc" for c in seq):
        return "dna"
    else:
        return "protein"


def clean_seq(s: str) -> str:
    # remove all newlines and whitespace
    return re.sub(r"\s+", "", s)


def prepare_org_id(org_id: Union[str, int]) -> int:
    """
    Prepare an organism ID for use in a request

    :param org_id: The organism ID to prepare

    :return: The prepared organism ID
    """
    if isinstance(org_id, str):
        if org_id in POPULAR_SPECIES:
            org_id = POPULAR_SPECIES[org_id]
        else:
            try:
                org_id = int(org_id)
            except ValueError:
                raise ValueError(f"Invalid organism ID: {org_id}")
    elif isinstance(org_id, int):
        pass
    else:
        raise ValueError(f"Invalid organism ID: {org_id}")
    return org_id
