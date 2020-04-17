# Optipyzer SDK
This is the Software Developer Kit for the Optipyzer engine. It privides an API for the engine, as well as a wrapper for the web-API that lets you search organisms and pull codon usage data for an organism. This library is inteneded for use by those who want to customize their codon optimization beyond the capabilities of the site

# Installation
```sh
pip install optipyzer
```

# Usage
```python
import optipyzer

# initalize API
optipyzer = optipyzer.api()

# search for e coli
results = optipyzer.search(name='Escherichia Coli')
org1 = results[0]

# search for campylbacter
results = optipyzer.search(name='Campylobacter')
org2 = results[0]

# pull codon usage for those organisms
codon_usage1 = optipyzer.pull_codons(org1)
codon_usage2 = optipyzer.pull_codons(org2)

# optimize a sequence to those organisms, weight campylobascter twice as much
seq = 'ATGGCTACTGCATGCTTAGCATGCATGACT'
optimized = optipyzer.optimize(seq,org_list=[org1,org2],weights=[1,2])
```
