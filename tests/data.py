# Sequence sources: https://www.bioinformatics.nl/tools/crab_fasta.html

# >BTBSCRYR
TEST_DNA = """
tgcaccaaacatgtctaaagctggaaccaaaattact
ttctttgaagacaaaaactttcaaggccgccactatg
acagcgattgcgactgtgcagatttccacatgtacct
gagccgctgcaactccatcagagtggaaggaggcacc
tgggctgtgtatgaaaggcccaattttgctgggtaca
tgtacatcctaccccggggcgagtatcctgagtacca
gcactggatgggcctcaacgaccgcctcagctcctgc
agggctgttcacctgtctagtggaggccagtataagc
ttcagatctttgagaaaggggattttaatggtcagat
gcatgagaccacggaagactgcccttccatcatggag
cagttccacatgcgggaggtccactcctgtaaggtgc
tggagggcgcctggatcttctatgagctgcccaacta
ccgaggcaggcagtacctgctggacaagaaggagtac
cggaagcccgtcgactggggtgcagcttccccagctgt
ccagtctttccgccgcattgtggagtgatgatacagat
gcggccaaacgctggctggccttgtcatccaaataagc
attataaataaaacaattggctg
"""

# >crab_anapl ALPHA CRYSTALLIN B CHAIN (ALPHA(B)-CRYSTALLIN).
TEST_PEPTIDE = """
MDITIHNPLIRRPLFSWLAPSRIFDQIFGEHLQESELLPASPSLSPFLMR
SPIFRMPSWLETGLSEMRLEKDKFSVNLDVKHFSPEELKVKVLGDMVEIH
GKHEERQDEHGFIAREFNRKYRIPADVDPLTITSSLSLDGVLTVSAPRKQ
SDVPERSIPITREEKPAIAGAQRK
"""

DNA_QUERY = {"seq": TEST_DNA, "weights": {"16815": 1, "122563": 2}}  # E. Coli  # Human

PEPTIDE_QUERY = {
    "seq": TEST_PEPTIDE,
    "weights": {"16815": 1, "122563": 2},  # E. Coli  # Human
}

# E. Coli. (MG1655)
TEST_SEARCH_QUERY = "MG1655"
TEST_ORG_ID = 16815
TEST_ORG = {
    "organism": {
        "species": "Escherichia coli str. K-12 substr. MG1655",
        "assembly": "GCF_000269645.1",
        "translation_table": 11,
        "num_codons": 1357500,
        "GC1_perc": 58.85,
        "GC3_perc": 55.82,
        "org_id": 16815,
        "division": "refseq",
        "taxid": 511145,
        "organelle": "genomic",
        "num_CDS": 4469,
        "GC_perc": 51.78,
        "GC2_perc": 40.66,
    },
    "id": "16815",
}
