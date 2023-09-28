from .database import SessionLocal
from .models import Organism, AutocompleteOrganism, CodonUsage
from ..const import AA_CODON_LIBRARY


# not used unless the database connection
# is required at the endpoint level
def _get_db():
    """Fetch database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_autocomplete_organisms():
    """Return list of organisms for the autocomplete component"""

    with SessionLocal() as db:
        return db.query(AutocompleteOrganism).all()


def calc_codon_usage(organism_id: int):
    """
    Function to calculate the codon usage data for a given organism.
    The codon usage data in this context is the percentage that a particular
    codon is used when coding for a particular amino acid.

    Function will return a dictionary of dictionaries; All single-letter
    amino acid codes will be keys in the dictionary, and associated with
    each of those is another dictionary with each codon the corresponds
    to the amino acid and the percentage that the codon is used.
    """
    # cast as int
    organism_id = int(organism_id)

    # initialize
    counts = {}
    codon_usage = {}

    # Iterate through each amino acid in the library, and pull data for it
    for aa in AA_CODON_LIBRARY:
        # Pull data for that particular amino acid and its codon preferences
        result = amino_acid_usage(organism_id, aa)

        # sum total codons used for percentage calculations
        sum_codons = sum(result)

        # Check for data issues (Sometings codon usage data is low, and must be dealt with)
        if sum_codons == 0:
            print(
                "Not enough codon data found... Skipping Organism {}".format(
                    organism_id
                )
            )
            break

        aa_dict = {}

        # for each codon associated with that amino acid
        # we will add the usage data to it and make an amino acid dictionjary data structure for it.
        for i, codon in enumerate(AA_CODON_LIBRARY[aa]):
            aa_dict[codon] = result[i]

        # add this amino acid dicitionary to the total codon usage dictionary.
        counts[aa] = aa_dict
        codon_usage[aa] = counts[aa].copy()

        # turn the codon counts into percentages using the sum.
        for codon in codon_usage[aa]:
            codon_usage[aa][codon] /= sum_codons

    return counts, codon_usage  # Return this dictionary of dictiomaries


def amino_acid_usage(org_id: int, aa: str):
    """
    Pull the codon usage data for a particular organism and
    a particular amino acid.
    """
    with SessionLocal() as db:
        # get list of codons
        codons = AA_CODON_LIBRARY[aa]

        # map returned codons to model attributes and
        # use to return usage data
        cols = [getattr(CodonUsage, c) for c in codons]
        return db.query(*cols).filter(CodonUsage.org_id == org_id).first()


def search_for_species(name: str) -> list[Organism]:
    """Search for an organism based on a name"""
    with SessionLocal() as db:
        return db.query(Organism).filter(Organism.species.ilike(f"%{name}%")).all()


def get_species_by_id(org_id: str) -> Organism:
    """return an organism object given an org_id"""
    with SessionLocal() as db:
        return db.query(Organism).get(org_id)
