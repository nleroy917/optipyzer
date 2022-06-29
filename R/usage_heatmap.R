library(ggplot2)
library(tidyverse)
source("./utils.R")
source("./const.R")

# read in data and subset to just popular species and common amino acids
cud <- read.csv("codon_usage.csv")
cud.popular <- as.data.frame(subset(
  cud[cud$org_id %in% POPULAR_SPECIES,], # reduce down to only popular species
  select = names(cud) %in% c("org_id", (unlist(POPULAR_AMINO_ACIDS)))
))

# normalize codon usage to species
for (aa in names(POPULAR_AMINO_ACIDS)) {
  codons <- POPULAR_AMINO_ACIDS[[aa]]
  for (codon in codons) {
    cud.popular[[
      paste(codon,"_norm")
    ]] <- apply(cud.popular, 1, FUN=function(r) {
      sumCodons <- sum(r[codons])
      return( r[codon]/sumCodons)
    })
  }
}

# subset only normalized and rename
cud.popular.normalized <- as.data.frame(
  subset(
    cud.popular,
    select = names(cud.popular) %ni% unlist(POPULAR_AMINO_ACIDS)
  )
)
colnames(cud.popular.normalized) <- (
  c("org_id", unlist(POPULAR_AMINO_ACIDS))
)


# convert to long format
cud.popular.normalized.long <- pivot_longer(
  cud.popular.normalized,
  cols=all_of(ALL_CODONS),
  values_to="frequency",
  names_to="codon",
)
cud.popular.normalized.long$org_id <- sapply(
  cud.popular.normalized.long$org_id, function(org_id) {
    return (
      org_id_to_name(org_id)
    )
  }
)
cud.popular.normalized.long$codon_aa <- sapply(
  cud.popular.normalized.long$codon, function(c) {
    return (
      paste0(c," (", codon_to_aa(c),")")
    )
  }
)
cud.popular.normalized.long$codon_aa_ordered <- factor(
  cud.popular.normalized.long$codon_aa,
  levels=unique(cud.popular.normalized.long$codon_aa)
)

p <- ggplot(
  cud.popular.normalized.long, 
  aes(codon_aa_ordered, org_id, fill=frequency)
  ) + 
  geom_tile(color = "black") +
  scale_fill_gradient(low = "white", high = "red") +
  theme(
    axis.text.x = element_text(
      size=10, angle = 90, vjust = 0.5, hjust=1
    ),
    axis.text.y = element_text(
      size=10
    )
  ) +
  xlab("Codon") + ylab("Organism") +
  coord_fixed()
p
