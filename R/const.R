POPULAR_SPECIES <- c(
  122771, # African Clawed Frog
  16815,  # E. Coli
  121713, # Bakers Yeast
  122001, # Caenorhabditis elegans
  122056, # Fruit Fly (Drosophila melanogaster)
  122263, # Thale Cress
  122563, # Human
  122638, # Mouse
  122645, # Rat
  122731  # Zebrafish
)
POPULAR_AMINO_ACIDS <- list(
  "L" = c("CTT", "CTC", "CTA", "CTG", "TTA", "TTG"), # Leucine
  "A" = c("GCT", "GCC", "GCA", "GCG"), # Alanine
  "G" = c("GGT", "GGC", "GGA", "GGG"), # Glycine
  "V" = c("GTT", "GTC", "GTA", "GTG"), # Valine
  "S" = c("TCT", "TCC", "TCA", "TCG", "AGT", "AGC")  # Serine
)
ALL_CODONS <- c(
  "CTT", "CTC", "CTA", "CTG", "TTA", "TTG", # Leucine
  "TCT", "TCC", "TCA", "TCG", "AGT", "AGC", # Serine
  "GCT", "GCC", "GCA", "GCG", # Alanine
  "GGT", "GGC", "GGA", "GGG", # Glycine
  "GTT", "GTC", "GTA", "GTG" # Valine
)