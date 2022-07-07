import re
from .const import AMINO_ACID_LOOKUP, CODON_LOOKUP


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
