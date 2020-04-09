import sqlite3
import os

def fetch_species_for_UI(db_file):

  curs = connect_to_db(db_file)
  query = '''
          SELECT * FROM autocomplete_data GROUP BY SPECIES
          '''

  curs.execute(query)
  result = curs.fetchall()

  names=[]
  speciesList = []

  for species in result:
    speciesList.append({'id': species[0],
                        'name':species[4]})

  return speciesList

def connect_to_db(db_file):

    # FOR THIS PURPOSES OF THIS TESTING CODE< THE DB IS MADE IN MEMORY
    try:
        conn = sqlite3.connect(db_file)
        #print('Connection made')
    except:
        print('Unable to connect to database')
        exit(1)

    return conn.cursor() # Return the cursor object


def calc_codon_usage(organism_id,curs):
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

    # initialize dicitionary
    counts = {}
    codon_usage = {}

    # define the amino acid and codon library
    aa_codon_library = {'A': ['GCT','GCC','GCA','GCG'],
                  'R': ['CGT','CGC','CGA','CGG','AGA','AGG'],
                  'N': ['AAT','AAC'],
                  'D': ['GAT','GAC'],
                  'C': ['TGT','TGC'],
                  'Q': ['CAA','CAG'],
                  'E': ['GAA','GAG'],
                  'G': ['GGT','GGC','GGA','GGG'],
                  'H': ['CAT','CAC'],
                  'I': ['ATT','ATC','ATA'],
                  'L': ['TTA','TTG','CTT','CTC','CTA','CTG'],
                  'K': ['AAA','AAG'],
                  'M': ['ATG'],
                  'F': ['TTT','TTC'],
                  'P': ['CCT','CCC','CCA','CCG'],
                  'S': ['TCT','TCC','TCA','TCG','AGT','AGC'],
                  'T': ['ACT','ACC','ACA','ACG'],
                  'W': ['TGG'],
                  'Y': ['TAT','TAC'],
                  'V': ['GTT','GTC','GTA','GTG'],
                  'Stop': ['TAA','TAG','TGA']}

    # Iterate through each aminp acid in the library, and pull data for it
    for aa in aa_codon_library:

        # Pull data for that particular amino acid and its codon preferences
        result = pull_data(organism_id,aa,curs)

        # sum total codons used for percentage calculations
        sum_codons = sum(result)

        # Check for data issues (Sometings codon usage data is low, and must be dealt with)
        if sum_codons == 0:
            print('Not enough codon data found... Skipping Organism {}'.format(organism_id))
            break

        # define indexor and new sub-dictionary
        i = 0
        aa_dict = {}

        # for each codon associated with that amino acid
        # we will add the usage data to it and make an amino acid dictionjary data structure for it.
        for codon in aa_codon_library[aa]:
            aa_dict[codon] = result[i]
            i += 1

        # add this amino acid dicitionary to the total codon usage dictionary.
        counts[aa] = aa_dict
        codon_usage[aa] = counts[aa].copy()

        # turn the codon counts into percentages using the sum.
        for codon in codon_usage[aa]:
            codon_usage[aa][codon] /= sum_codons

    return counts, codon_usage # Return this dictionary of dictiomaries


def pull_data(org_id,aa,curs):
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

    # Library of amino acids and codons they use
    aa_codon_library = {'A': ['GCT','GCC','GCA','GCG'],
                  'R': ['CGT','CGC','CGA','CGG','AGA','AGG'],
                  'N': ['AAT','AAC'],
                  'D': ['GAT','GAC'],
                  'C': ['TGT','TGC'],
                  'Q': ['CAA','CAG'],
                  'E': ['GAA','GAG'],
                  'G': ['GGT','GGC','GGA','GGG'],
                  'H': ['CAT','CAC'],
                  'I': ['ATT','ATC','ATA'],
                  'L': ['TTA','TTG','CTT','CTC','CTA','CTG'],
                  'K': ['AAA','AAG'],
                  'M': ['ATG'],
                  'F': ['TTT','TTC'],
                  'P': ['CCT','CCC','CCA','CCG'],
                  'S': ['TCT','TCC','TCA','TCG','AGT','AGC'],
                  'T': ['ACT','ACC','ACA','ACG'],
                  'W': ['TGG'],
                  'Y': ['TAT','TAC'],
                  'V': ['GTT','GTC','GTA','GTG'],
                  'Stop': ['TAA','TAG','TGA']}

    # itnitialize string to list codons in SQL query. Initialize indexor
    codons = ''
    i = 1

    # for each codon associated with amino acid, aa
    for codon in aa_codon_library[aa]:

        # if we are are not at the last codon, append to running list with comma
        if i < len(aa_codon_library[aa]):
            codons += codon + ', '

        # otherwise, append and dont add a comma
        else:
            codons += codon
        i += 1

    # generate query using the previously generated codon string
    query = '''SELECT {} FROM codon_usage
                WHERE org_id = ?'''.format(codons)

    # execute the query using the organism id passed
    curs.execute(query, [org_id])
    result = curs.fetchall()

    # result may return nothing, check. this will occur if the id is not found in the DB
    if len(result) == 0:
        print('No organism id found, did you enter it correctly?')
        exit(1)


    # results are returned as a list, but we know we will only get one
    # since we are searching by id. Each organism has a unique id. We need to
    # extract the query results from the list by indexing at the first item in
    # the list.
    else:
        return result[0] # Return the result to the main program.



def print_results(organism_list, usage_data):
    """
    a function to print the reuslts of the organism codon usage search. This function
    probably will only be used for testing annd demonstration purposes.
    inputs: - organism_list (list of ints), a list of integers that correspond to
              organism id's
            - usage_data (list of dicts), a list of dictionaries that correspond to
              organism id's in organism_list. This list of dicts contains the codon
              usage data for the organism as laid out in the calc_codon_usage fnc.
    returns: - nothing
    """
    for id,codon_usage in zip(organism_list,usage_data):
        print('\n\nGENETIC CODON USAGE DATA FOR {}:'.format(id))
        print('------------------------')
        for aa_key in codon_usage:
            print(aa_key + ':')
            for codon_key in codon_usage[aa_key]:
                print('\t{}: {}%'.format(codon_key,round(codon_usage[aa_key][codon_key]*100,2)))

            print('------------------------')


def get_species():

    organism_list = []

    id = input('Enter organism id, or hit ENTER to continue: ')
    if id:
        id = int(id)

    # Get organism IDs
    while id:
        organism_list.append(id)
        id = input('Enter organism id, or hit ENTER to continue: ')
        if id:
            id = int(id)

    return organism_list

def get_weights(organism_list):

    weights = {}
    for org in organism_list:
        weights[org] = float(input('Enter integer weight for {}: '.format(org)))

    return weights

def species_from_id(DB_NAME,org_id):

    curs = connect_to_db(DB_NAME)
    # generate query using the previously generated codon string
    query = '''SELECT * FROM organisms
                WHERE org_id = ?'''

    # execute the query using the organism id passed
    curs.execute(query, [org_id])
    result = curs.fetchall()

    return result[0]


# Testing code
if __name__ == '__main__':

    curs = connect_to_db('./codon_usage_data.db')

    organism_list = []


    id = input('Enter organism id, or hit ENTER to continue: ')
    if id:
        id = int(id)

    # Get organism IDs
    while id:
        organism_list.append(id)

        id = input('Enter organism id, or hit ENTER to continue: ')
        if id:
            id = int(id)

            usage_data = []
            for id in organism_list:
                usage_data.append(calc_codon_usage(id,curs))