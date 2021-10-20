class Utils():
    codon_lookup = {
        "I": "ATT",
        "L": "CTT",
        "V": "GTT",
        "F": "TTT",
        "M": "ATG",
        "C": "TGT",
        "A": "GCT",
        "G": "GGT",
        "P": "CCT",
        "T": "ACT",
        "S": "TCT",
        "Y": "TAT",
        "W": "TGG",
        "Q": "CAA",
        "N": "AAT",
        "H": "CAT",
        "E": "GAA",
        "D": "GAT",
        "K": "AAA",
        "R": "CGT",
    }
    def __init__(self):
        pass
    
    def aa_to_dna(self,seq_aa):
        """
        Convert an amino acid sequence to a dna sequence
        """
        seq_dna = ""
        for res in seq_aa:
            seq_dna += self.codon_lookup[res.upper()]
        return seq_dna
            