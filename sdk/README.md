# Optipyzer SDK
This is the Software Developer Kit for the Optipyzer engine. It privides an API for the engine, as well as a wrapper for the web-API that lets you search organisms and pull codon usage data for an organism. This library is inteneded for use by those who want to customize their codon optimization beyond the capabilities of the site

# Installation
```pip install optipyzer```

# Usage
```
import optipyzer

# initalize API
Optipyzer = optipyzer.api()

results = Optipyzer.search('Escherichia Coli')

# get first result
organism = results[0]

# get codon usage data for organism
codon_usage = Optipyzer.pull_codons(organism.id)

# optimize dna sequence for specific organism
seq = 'ATGCTGATCGTAGCTAGCTGACTGTAGCTGACTGAC'
Optipyzer.optimize(seq,organism)
```