library(ggplot2)

source("./utils.R")

# read in data
cud <- read.csv("codon_usage.csv")

# const
ONE.BILLION <- 1e9

# basics
n.organisms <- nrow(cud)
codon.counts <- colSums(cud)

# drop "org_id" meaningless column
codon.counts <- codon.counts[2:length(codon.counts)]

# generate data frame
codon.counts.df <- data.frame(codon.counts)
codon.counts.df$codon <- names(codon.counts)
names(codon.counts.df)[names(codon.counts.df) == 'codon.counts'] <- 'count'
codon.counts.df <- codon.counts.df[order(-codon.counts.df$count),]

# map codons to amino acids
codon.counts.df$amino_acid <- sapply(codon.counts.df$codon, codon_to_aa)

# convert to billions
codon.counts.df$count_billion <- codon.counts.df$count/ONE.BILLION

# group by amino acid
amino.acid.counts <- aggregate(codon.counts.df$count_billion, by=list(amino_acid=codon.counts.df$amino_acid), FUN=sum)
names(amino.acid.counts)[names(amino.acid.counts) == 'x'] <- 'count_billion' # rename

# plot codon counts
p <- ggplot(amino.acid.counts, aes(x=reorder(amino_acid, -count_billion), y=count_billion)) +
  geom_bar(stat="identity", fill="black") + 
  theme_classic() + 
  theme(
    axis.text.x = element_text(size=10)
  ) +
  xlab("Residue") + ylab("Count (Billion)")
p
