# Optipyzer
![Heroku](http://heroku-badge.herokuapp.com/?app=optipyzer&style=flat&svg=1)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Travis-CI](https://travis-ci.org/NLeRoy917/optipyzer.com.svg?branch=master)

A fast, effective, and flexible codon optimization tool. Built with Python, the algorithm can codon-optimize your g blocks for multiple species at once, giving preference to one or more espression systems at a time. The algorithm utilizes the most recent codon usage data available to dynamically generate an optimal sequence for you in seconds.

# Web Application
The optmziation engine is supported by a web-based UI built with React. The current production build can be found [here](https://optipyzer.herokuapp.com). In addition, information about how the algorithms work and more dev tool information can be found on the site.

# Python Installation
```pip install optipyzer```

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
