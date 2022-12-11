import re
from .const import VALID_AMINO_ACIDS, POPULAR_SPECIES


def clean_seq(s: str) -> str:
    """
    Clean a sequence string by removing all whitespace and newlines.

    :param s: The sequence string to clean

    :return: The cleaned sequence string
    """
    # remove all newlines and whitespace
    return re.sub(r"\s+", "", s)


def verify_dna(seq: str) -> None:
    """
    Verify that a DNA sequence is valid

    :param seq: The DNA sequence to verify
    """
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


def verify_protein(seq: str) -> None:
    """
    Verify that a protein sequence is valid

    :param seq: The protein sequence to verify
    """
    # clean seqeunce
    seq = clean_seq(seq)

    # verify each residue is valid
    for aa, i in zip(seq, range(len(seq))):
        if aa.upper() not in VALID_AMINO_ACIDS:
            raise ValueError(f"Invalid residue '{aa}' in query at position: {i}")

    return None


def popular_sepecies_to_id(species: str) -> int:
    """
    Convert a species string to it's id value

    :param species: The species string to convert

    :return: The id value of the species
    """
    if species.lower() in POPULAR_SPECIES:
        return POPULAR_SPECIES[species.lower()]
    else:
        raise ValueError(f"Invalid species name: {species}")
