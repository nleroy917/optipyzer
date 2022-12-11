# Optipyzer

_optipyzer_ is a lightweight python package that interfaces the core opitpyzer server for use inside python programs. It lets you codon optimize any DNA or protein sequences inside python by providing a convenient API to construct and make requests to the optimization server. It returns the results as python objects for downstream use.

## Installation

```console
pip install optipyzer
```

## Quick Start

To get started, simply create an `API` instance, and start making requests:

```python
import optipyzer

api = optipyzer.API()

gblock = "ATGGCCCTTTAA"

result = api.optimize(
        seq=dna_seq,
        seq_type="dna",
        weights={"human": 2, "mouse": 1},
    )

print(result['optimized_sd'])
```

## More Information

For a more detailed tutorial, please visit the [docs](https://optipyzer.readthedocs.org)
