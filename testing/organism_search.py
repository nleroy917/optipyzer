import sqlite3
import os

os.system('clear')

def calc_codon_usage(organism_id):
    codon_usage = {}
    aa_codon_library = {'ALA': ['GCT','GCC','GCA','GCG'],
                  'ARG': ['CGT','CGC','CGA','CGG','AGA','AGG'],
                  'ASN': ['AAT','AAC'],
                  'ASP': ['GAT','GAC'],
                  'CYS': ['TGT','TGC'],
                  'GLN': ['CAA','CAG'],
                  'GLU': ['GAA','GAG'],
                  'GLY': ['GGT','GGC','GGA','GGG'],
                  'HIS': ['CAT','CAC'],
                  'ILE': ['ATT','ATC','ATA'],
                  'LEU': ['TTA','TTG','CTT','CTC','CTA','CTG'],
                  'LYS': ['AAA','AAG'],
                  'MET': ['ATG'],
                  'PHE': ['TTT','TTC'],
                  'PRO': ['CCT','CCC','CCA','CCG'],
                  'SER': ['TCT','TCC','TCA','TCG','AGT','AGC'],
                  'THR': ['ACT','ACC','ACA','ACG'],
                  'TRP': ['TGG'],
                  'TYR': ['TAT','TAC'],
                  'VAL': ['GTT','GTC','GTA','GTG'],
                  'STOP': ['TAA','TAG','TGA']}

    for aa in aa_codon_library:
        result = get_codon_data(organism_id,aa)
        sum_codons = sum(result)
        i = 0
        aa_dict = {}
        for codon in aa_codon_library[aa]:
            aa_dict[codon] = result[i]
            i += 1

        codon_usage[aa] = aa_dict

        for codon in codon_usage[aa]:
            codon_usage[aa][codon] /= sum_codons


    return codon_usage


def get_codon_data(org_id,aa):
    codon_aa_dict = {'ALA': ['GCT','GCC','GCA','GCG'],
                  'ARG': ['CGT','CGC','CGA','CGG','AGA','AGG'],
                  'ASN': ['AAT','AAC'],
                  'ASP': ['GAT','GAC'],
                  'CYS': ['TGT','TGC'],
                  'GLN': ['CAA','CAG'],
                  'GLU': ['GAA','GAG'],
                  'GLY': ['GGT','GGC','GGA','GGG'],
                  'HIS': ['CAT','CAC'],
                  'ILE': ['ATT','ATC','ATA'],
                  'LEU': ['TTA','TTG','CTT','CTC','CTA','CTG'],
                  'LYS': ['AAA','AAG'],
                  'MET': ['ATG'],
                  'PHE': ['TTT','TTC'],
                  'PRO': ['CCT','CCC','CCA','CCG'],
                  'SER': ['TCT','TCC','TCA','TCG','AGT','AGC'],
                  'THR': ['ACT','ACC','ACA','ACG'],
                  'TRP': ['TGG'],
                  'TYR': ['TAT','TAC'],
                  'VAL': ['GTT','GTC','GTA','GTG'],
                  'STOP': ['TAA','TAG','TGA']}
    codons = ''
    i = 1
    for codon in codon_aa_dict[aa]:
        if i < len(codon_aa_dict[aa]):
            codons += codon + ', '
        else:
            codons += codon
        i += 1

    query = '''SELECT {} FROM codon_usage
                WHERE org_id = ?'''.format(codons)
    curs.execute(query, [org_id])
    result = curs.fetchall()
    if len(result) == 0:
        print('No organism id found, did you enter it correctly?')
        exit(1)
    else:
        return result[0] # Return the result to the main program.

# CREATE AND CONNECT TO THE DATABASE
# FOR THIS PURPOSES OF THIS TESTING CODE< THE DB IS MADE IN MEMORY
try:
    conn = sqlite3.connect('./codon_usage_data.db')
    print('Connection made')
except:
    print('error')
    exit(1)

curs = conn.cursor()

organism = input('Search for organism: ')

query = '''SELECT org_id, species, taxid
           FROM organisms
           WHERE species LIKE ?'''

curs.execute(query,['%'+organism+'%'])

results = curs.fetchall()

os.system('clear')
if len(results) == 1:
    print('{} result found'.format(len(results)))
elif len(results) == 0:
    print('{} results found'.format(len(results)))
    exit(0)
else:
    print('{} results found'.format(len(results)))

counter = 1
page_num = 1
num_pages = int(len(results)/50)
if len(results) > 50:
    for result in results:
        print(result)
        if counter == 50:
            response = input('Showing 50 of {} results (page {} of {})... Continue? (Y/N) '.format(len(results),page_num,num_pages))
            if response == 'N' or response == 'n':
                break
            else:
                os.system('clear')
                page_num += 1
                counter = 1
                continue
        counter += 1
else:
    for result in results:
        print(result)

if len(results) == 1:
    response = input('Get codon usage data for this organism? (Y/N)')
    if response == 'Y' or 'y':
        response = results[0][0]
        pass

    else:
        exit(0)
else:
    organism_id = input('Type organism ID for organism of interest, otherwise, hit enter to escape: ')
    if not organism_id:
        exit(0)
    else:
        pass

# get data
codon_usage = {}
os.system('clear')

codon_usage = calc_codon_usage(organism_id)

# Display Results
print('GENETIC CODON USAGE DATA:')
print('------------------------')
for aa_key in codon_usage:
    print(aa_key + ':')
    for codon_key in codon_usage[aa_key]:
        print('\t{}: {}%'.format(codon_key,round(codon_usage[aa_key][codon_key]*100,2)))

    print('------------------------')