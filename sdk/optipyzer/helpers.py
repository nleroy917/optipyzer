import re
from const import VALID_AMINO_ACIDS

def clean_seq(s: str) -> str:
    # remove all newlines and whitespace
    return re.sub(r"\s+", "", s)

def verify_dna(seq: str):
    # clean seqeunce
    seq = clean_seq(seq)

    # verify that the sequeryuence length
    # is divisible by 3 (codons)
    if len(seq) % 3 != 0:
        raise ValueError("DNA sequence must be devisible by 3")
    
    # verify all characters are
    # ATGC
    for base, i in zip(seq, range(len(seq))):
        if base.upper() not in "ATGC":
            raise ValueError(f"Invalid base '{base}' in query at position: {i}")
    
    return None

def verify_protein(seq: str):
    # clean seqeunce
    seq = clean_seq(seq)

    # verify each residue is valid
    for aa, i in zip(seq, range(len(seq))):
        if aa.upper() not in VALID_AMINO_ACIDS:
            raise ValueError(f"Invalid residue '{aa}' in query at position: {i}")
    
    return None