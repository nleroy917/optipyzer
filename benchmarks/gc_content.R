library(tidyverse)

gc <- read_csv("results/pairwise_gc_content.csv")
gc_melted <- gc %>% 
  select(idt_gc, optipyzer_gc, id) %>% 
  reshape2::melt(id.vars='id')

# bar plot
gc_melted %>% 
  ggplot(aes(x=id, y=value, fill=variable)) +
  geom_bar(stat='identity', position='dodge') +
  theme_classic() +
  labs(x="Protein", "GC-Content") +
  theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust=1))

# scatter
gc %>% 
  ggplot(aes(x=idt_gc, y=optipyzer_gc)) + 
  geom_point() + 
  theme_classic() +
  labs(x="IDT GC%", y="Optipyzer GC%")

# distributions
gc_melted %>% 
  ggplot(aes(value, fill=variable)) +
  geom_density(alpha=0.6) + 
  theme_classic()
