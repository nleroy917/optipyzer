# Optipyzer
![Heroku](http://heroku-badge.herokuapp.com/?app=optipyzer&style=flat&svg=1)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Travis-CI](https://travis-ci.org/NLeRoy917/optipyzer.svg?branch=master)

A fast, effective, and flexible codon optimization tool. Built with Python, the algorithm can codon-optimize your g blocks for multiple species at once, giving preference to one or more expression systems at a time. The algorithm utilizes the most recent codon usage data available to dynamically generate an optimal sequence for you in seconds.

# Web Application
![Optipyzer Header](https://github.com/NLeRoy917/optipyzer/blob/master/static/imgs/header_img.png)
The optmziation engine is supported by a web-based UI built with React. The current production build can be found [here](https://optipyzer.herokuapp.com). In addition, information about how the algorithms work and more dev tool information can be found on the site. 

The web application has the same functionality as the python installation. The user can input either a DNA or Protein sequence, select as many species as they wish, and set a weighting between 1 and 10 for those species to optimize their sequence against. The application will return the full data set including metadata associated with the query.

# Python Installation
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

# Run Local Server with Docker
Some users might be interested in optimizing sequences confidentially. That is, using a locally run server and not making HTTP requests to the public API. In addition, this increases speed and supports high-throughput workflows.

Because of this, a docker container was prepared to spin up the server locally. The docker container will run the optimzation server off your local machine and you can now use this to optimize sequences.

***(i.e. The server now runs on localhost:8000)***

## To spin up:
```sh
docker build -t optipyzer .
docker run -p 8000:8000 optipyzer
```

## Using the local server
Simply specify you want to run the optimizer locally when initializing an Optipyzer object in your scripts and your local server will then be used:
```python
import optipyzer

# initalize API
optipyzer = optipyzer.api(local=True) # <---- Specify here you want to use local server

# search for e coli
results = optipyzer.search(name='Escherichia Coli')
org1 = results[0]

# search for campylobacter
results = optipyzer.search(name='Campylobacter')
org2 = results[0]

# pull codon usage for those organisms
codon_usage1 = optipyzer.pull_codons(org1)
codon_usage2 = optipyzer.pull_codons(org2)

# optimize a sequence to those organisms, weight campylobascter twice as much
seq = 'ATGGCTACTGCATGCTTAGCATGCATGACT'
optimized = optipyzer.optimize(seq,org_list=[org1,org2],weights=[1,2])
```
