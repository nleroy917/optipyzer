import sys
sys.path.append('..')

from lib.CodonDataPull import *
from lib.codon_optimizer import CodonOptimizer


if __name__ == '__main__':

    # create test list of organism id's
    organism_list = [16736] # E. Coli
    weights = {16736: 1}

    # create test data
    dna_seq = 'ATGCTAGCTAGTATCGATGATATCGATCGTCAGTACATGAGTCGCTTAGATCGTACGTCGATGAGCTGCTAGCTATCA'
    pro_seq = 'PGISAQWVDWVRWNLKSYDGKYQQFGPIQ'

    optipyzer = CodonOptimizer('codon_usage_data.db')
    optipyzer.set_organisms(organism_list,weights)
    optipyzer.optimize(dna_seq,seq_type='dna')
    optipyzer.report()