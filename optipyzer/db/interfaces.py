from .database import SessionLocal
from .models import Organism, AutocompleteOrganism, CodonUsage
from ..const import AA_CODON_LIBRARY

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
    Function to calculate the codon usage data for a given organism. The codon usage data
    in this context is the percentage (characterized as a fraction) that a particular
    codon is used when coding for a particular amino acid.
    Inputs: - organism_id (int), an interger that corresponds to a particular organism
              inside the database
            - curs (object), a cursor object that is tied to the local database allowing
              for database access and manipulation
    returns: - codon_usage (dictionary of dictionaries), this dictionary of dictionaries
               has keys that correspond to specific amino acids. Those amino acid keys
               are associated with another dictionary that has the keys with values
               corresponding to alll the codon triplets that code for that amino
               acid. This sub-dictionary has decimal values that correspond to the
               probability that the codon is used when coding for the amino acid.
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
            print('Not enough codon data found... Skipping Organism {}'.format(organism_id))
            break

        # define index or and new sub-dictionary
        i = 0
        aa_dict = {}

        # for each codon associated with that amino acid
        # we will add the usage data to it and make an amino acid dictionjary data structure for it.
        for codon in AA_CODON_LIBRARY[aa]:
            aa_dict[codon] = result[i]
            i += 1

        # add this amino acid dicitionary to the total codon usage dictionary.
        counts[aa] = aa_dict
        codon_usage[aa] = counts[aa].copy()

        # turn the codon counts into percentages using the sum.
        for codon in codon_usage[aa]:
            codon_usage[aa][codon] /= sum_codons

    return counts, codon_usage # Return this dictionary of dictiomaries


def amino_acid_usage(org_id: int, aa: str):
    """
    function to pull the data from the local database for a particular organism
    and amino acid. The function uses the amino acid library to get the codons
    and create a SQL query that will pull the codon usage for one amino acid.
    Inputs: - org_id (int), integer that corresponds to a particular organism
            - aa (string), the 3-letter amino acid code to get data for
            - curs (object), a cursor object that lets you connect and run queries
                             on the database.
    return: the result found from the SQL query properly parsed and put into a
            correct data structure. It is a tuple that has number of times a codon
            was found in that organisms genome while in the correct reading frame.
            An example, if looking at Alanine (ALA), will return:
                    (1345, 1957, 698, 4098) for GCT, GCC, GCA, and GCG respectively.
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

def get_species_by_id(org_id: int) -> Organism:
    """return an organism object given an org_id"""
    with SessionLocal() as db:
        return db.query(Organism).get(org_id)