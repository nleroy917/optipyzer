> [!IMPORTANT]  
> After nearly five years of running the public Optipyzer server at $7/month, I’ve decided to shut it down. While I know it’s been helpful to many, continuing to host it no longer makes sense financially—especially since self-hosting is straightforward. The server may return in the future, but for now, it's offline. If you need help setting up your own instance, feel free to reach out.

<h1 align="center">
    <img height="175" src="web/public/optipyzer.svg" alt="Optipyzer logo" />
    <div align="center">
  <a href="https://doi.org/10.1101/2023.05.22.541759"><img src="http://img.shields.io/badge/DOI-10.1101/2023.05.22.541759-B31B1B.svg" alt="DOI:10.1101/2021.01.08.425840"></a>
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License"></a>
  <img src="https://vercelbadge.vercel.app/api/nleroy917/optipyzer" alt="Vercel">
  <a href="https://badge.fury.io/py/optipyzer"><img src="https://badge.fury.io/py/optipyzer.svg" alt="PyPI version"></a>
</div>
</h1>


A fast and flexible codon optimization tool. Optipyzer is capable of codon-optimizing both DNA and peptide sequences for multiple species at once while giving prefernce to certain species. The optimizer is hosted as a publically available web server with both a [web-interface](https://optipyzer.com) and a [python programming interface](https://pypi.org/project/optipyzer/) for one-off queries or more high-throughput frameworks. You can read more about the algorithm and the tool in our [preprint](https://doi.org/10.1101/2023.05.22.541759).

## Web Application

The web-interface can be found at [optipyzer.com](https://optipyzer.com). The site is intended to be used for simple, one-off queries. It provides a sequence input box and a species selection tool to choose your species and designate weightings. You can search through our database and specify any species you want.

## Python API

For convenience, we have also written a small python package for an easier to use interface in high-throughput workflows. The package is a basic wrapper around our server that exposes convenience functions to interface the optimization server and make calls for you.

## Install

```sh
pip install optipyzer
```

## Quick Start

To get started, simply create an `API` instance, and start making requests:

```python
import optipyzer

api = optipyzer.API()

dna_seq = "ATGGCCCTTTAA"

result = api.optimize(
    seq=dna_seq,
    seq_type="dna",
    weights={"human": 2, "mouse": 1},
)

print(result['optimized_sd'])
```

For more detailed usage instructions and information about the algorithm, refer to the documentation [here](https://optipyzer.readthedocs.org)

## Local Optimization Server

Some users might be interested in optimizing sequences confidentially. That is, using a locally run server instead of making HTTP requests to the public API. This also increases speed. Because of this, a docker container was prepared to run a local instance of the server. The docker container will run the optimzation server off your local machine and you can now use this to optimize sequences instead of making calls to the public server.

_(i.e. The server now runs on localhost:8000)_

## To Run Locally:

```sh
docker build -t optipyzer .
docker run -p 8000:8000 optipyzer
```

## Using the local server

Simply specify you want to run the optimizer locally when initializing an Optipyzer object in your scripts and your local server will then be used:

```python
import optipyzer

api = optipyzer.API(local=True) # <--- specify you are using a local server

dna_seq = "ATGGCCCTTTAA"

result = api.optimize(
    seq=dna_seq,
    seq_type="dna",
    weights={"human": 2, "mouse": 1},
)

print(result['optimized_sd'])
```

## Contributing

Issues, PR's, and contributions are always welcome. Please reach out (or open an issue) if you would like to contribute!
