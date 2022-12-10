# Optipyzer

## Introduction

The optipyzer is a lightweight python package that interfaces the core opitpyzer server for use inside python programs. It lets you codon optimize any DNA or protein sequences inside python by providing a convenient API to construct and make requests to the optimization server. It returns the results as python objects for downstream use.

If you are intereted in the optimization algorithm, see the [algorithm section](#the-algorithm) below.

## Installation

```console
pip install optipyzer
```

## Quick Start

To get started, simply crete an `API` instance, and start making requests:

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

## Making Optimization Requests

### Basics

To make an optimization request, you can all the `optimize` function. Both DNA and protein optimization requests flow through here. You must provide a sequence to optimize and a weight dictionary. This specifies how much weight to give to each species when constructing the codon usage tables. For example, a 2:1 weighting of human to mouse, would be given as:

```python
weights = {
  "human": 2,
  "mouse": 1
}
```

This indicates that when predicting expected expression, we expect that that the protein will express _twice as much in a mammalian system than a murine system_. To call the optimization function:

```python
import optipyzer

api = optipyzer.API()

result = api.optimize(
        seq="ATGGCCCTTTAA",
        seq_type="dna",
        weights={"human": 2, "mouse": 1},
    )
```

### Specifying a sequence type

To tell _optipyzer_ what type of sequence you are optimizing (protein or DNA), pass in a `seq_type` parameter.

### Popular species

The package supports a list of "popular species" to make programs easier to write, less error-prone, and easier to read. The package will map a species string (e.g. `"human"`) to the correct species id for you. The following two weight dictionaries are equivalent from optipyzer's perspective:

```python
{
  "human": 2,
  "mouse": 1
}

{
  122563: 2,
  122638: 1
}
```

The following species are supported:

```python
{
  "african_clawed_frog": 122771,
  "yeast": 121713,
  "c_elegans": 122001,
  "e_coli": 16815,
  "drosophila": 122056,
  "human": 122563,
  "mouse": 122638,
  "rat": 122645,
  "thale_cress": 122263,
  "zebrafish": 122731,
}
```

### Advanced Usage

If you are interested in repeatable results or adjusting performance, you may pass in two parameters: `seed` and `iterations`.

The `seed` parameter sets a temporary seed on the server for the duration of your optimization request to seed the codon sampling functions. This allows results to be repeatable.

The optimization algorithm is iterative (see the [algorithm section](#the-algorithm) section below). The `iterations` paramters allows you to specify how many iterations to perform before halting execution. This can be beneficial for speeding up performance at the cost of bestpredicted expression.

## The Algorithm

Optipyzer consists of a three-step algorithm. First, the codon usage data for each organism in the query is pulled from the database. Second, an averaged table is computed using each species’ individual tables and the species weights from the query via a weighted average. Finally, the averaged table is used to construct an optimized query using a stochastic selection process and the relative codon adaptation index (RCA) to ensure a proper expression profile (Fig. 1C). The averaged table is constructed by calculating a weighted average for each codon frequency using the species weights provided in the query:

$$
F_{tot,i} = \sum^N_jw_jF_{i,j}
$$

<br></br>

![**a.)** Heatmap describing the codon usage preferences for the top 24 most common codons and 10 popular species. Each species uses codons in a preferential manner. **b.)** Basic input and output flow of Optipyzer. A query sequence and species weights are required as input, and Optipyzer will output an optimized sequence. **c.)** Detailed flow of the Optipyzer algorithm. Species codon usage data are combined using a weighted average to create a unified usage table. This table is combined with a query sequence and a new sequence is generated. The new sequence is checked using RCA to predict the relative expression in each species. If the relative expression does not align with the input query, the combined table is updated and a new sequence is generated and checked again. Once the sequence exhibits the desired predicted expression profile the algorithm stops. **d.)** The architecture of Optipyzer is structured with a central optimization server. The web client and Python API communicate to the server through HTTP.](../images/fig1.png)

<br></br>

An optimized sequence is generated using the “codon randomization” method of optimization by sampling codons according to the frequencies defined in the averaged table. To confirm that our resulting sequence is optimized to the specified weighting during optimization, we employ the use of a relative codon adaptation index (RCA), which has been shown to correlate to protein abundance data, to confirm that the measure of relative expression for each species is consistent with the original query. The RCA index is calculated with the following formula:

$$
\text{RCA} = \left( \prod_{i=1}^L \text{RCA}_{xyz}(l) \right)^{1/L}
$$

$$
\text{RCA}_{xyz} = \frac{f(x,y,z)}{f_1(x)f_2(y)f_3(z)}
$$

$f(x,y,z)$ is the observed frequency of codon $xyz$ and $f_1(x)$, $f_2(y)$ and $f_3(z)$ the observed frequencies of bases $x$, $y$ and $z$ at, respectively, codon positions 1, 2 and 3 in the reference genome and $L$ is the number of codons in the gene to be optimized.

To determine whether or not the predicted expression matches the desired expression ratio across the input species, the RCA values are normalized so that the lowest RCA value is set to 1. Both the absolute value and the sum of the squares of the difference between the target and predicted expression values are calculated. If the optimized sequence does not exhibit a predicted expression ratio that matches the desired input in the query, the averaged frequency table is updated by slightly adjusting the weights of six codons in favor of species which currently have an expression difference greater than 5% of its target expression value. A new optimized sequence is generated and the sum of squares and absolute difference of predicted and target expression values are calculated and compared to that of the previously generated sequences to determine the best performing sequence. This process is iterated upon 1000 times to ensure that the optimized sequence exhibits the best expression profile possible for all species in the query in regards to codon bias and irrespective of other factors that might contribute to expression differences across species.
