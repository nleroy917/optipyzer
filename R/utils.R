library(hash)

.codonMap = hash()

# populate
.codonMap[["ATA"]] <- "I"
.codonMap[["ATC"]] <- "I"
.codonMap[["ATT"]] <- "I"
.codonMap[["ATG"]] <- "M"
.codonMap[["ACA"]] <- "T"
.codonMap[["ACC"]] <- "T"
.codonMap[["ACG"]] <- "T"
.codonMap[["ACT"]] <- "T"
.codonMap[["AAC"]] <- "N"
.codonMap[["AAT"]] <- "N"
.codonMap[["AAA"]] <- "K"
.codonMap[["AAG"]] <- "K"
.codonMap[["AGC"]] <- "S"
.codonMap[["AGT"]] <- "S"
.codonMap[["AGA"]] <- "R"
.codonMap[["AGG"]] <- "R"
.codonMap[["CTA"]] <- "L"
.codonMap[["CTC"]] <- "L"
.codonMap[["CTG"]] <- "L"
.codonMap[["CTT"]] <- "L"
.codonMap[["TTA"]] <- "L"
.codonMap[["TTG"]] <- "L"
.codonMap[["CCA"]] <- "P"
.codonMap[["CCC"]] <- "P"
.codonMap[["CCG"]] <- "P"
.codonMap[["CCT"]] <- "P"
.codonMap[["CAC"]] <- "H"
.codonMap[["CAT"]] <- "H"
.codonMap[["CAA"]] <- "Q"
.codonMap[["CAG"]] <- "Q"
.codonMap[["CGA"]] <- "R"
.codonMap[["CGC"]] <- "R"
.codonMap[["CGG"]] <- "R"
.codonMap[["CGT"]] <- "R"
.codonMap[["GTA"]] <- "V"
.codonMap[["GTC"]] <- "V"
.codonMap[["GTG"]] <- "V"
.codonMap[["GTT"]] <- "V"
.codonMap[["GCA"]] <- "A"
.codonMap[["GCC"]] <- "A"
.codonMap[["GCG"]] <- "A"
.codonMap[["GCT"]] <- "A"
.codonMap[["GAC"]] <- "D"
.codonMap[["GAT"]] <- "D"
.codonMap[["GAA"]] <- "E"
.codonMap[["GAG"]] <- "E"
.codonMap[["GGA"]] <- "G"
.codonMap[["GGC"]] <- "G"
.codonMap[["GGG"]] <- "G"
.codonMap[["GGT"]] <- "G"
.codonMap[["TCA"]] <- "S"
.codonMap[["TCC"]] <- "S"
.codonMap[["TCG"]] <- "S"
.codonMap[["TCT"]] <- "S"
.codonMap[["TTC"]] <- "F"
.codonMap[["TTT"]] <- "F"
.codonMap[["TAC"]] <- "Y"
.codonMap[["TAT"]] <- "Y"
.codonMap[["TAA"]] <- "STOP"
.codonMap[["TAG"]] <- "STOP"
.codonMap[["TGC"]] <- "C"
.codonMap[["TGT"]] <- "C"
.codonMap[["TGA"]] <- "STOP"
.codonMap[["TGG"]] <- "W"

# convert a codon to an amino acid
codon_to_aa <- function(codon) {
  return (.codonMap[[codon]])
}


# map org_id to species name
.speciesMap <- hash()
.speciesMap[["122771"]] <- "African Clawed Frog"
.speciesMap[["16815"]]  <- "E. Coli"
.speciesMap[["121713"]] <- "Bakers Yeast"
.speciesMap[["122001"]] <- "C. Elegans"
.speciesMap[["122056"]] <- "Fruit Fly"
.speciesMap[["122263"]] <- "Thale Cress"
.speciesMap[["122563"]] <- "Human"
.speciesMap[["122638"]] <- "Mouse"
.speciesMap[["122645"]] <- "Rat"
.speciesMap[["122731"]] <- "Zebrafish"

# convert an organism ID to the name
org_id_to_name <- function(org_id) {
  return (
    .speciesMap[[as.character(org_id)]]
  )
}