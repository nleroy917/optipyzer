from typing import Union
from optipyzer.const import DEFAULT_NUM_ITERATIONS
from optipyzer.oengine import (
    averaged_table,
    remove_prohibited_codons,
    find_prohibited_codons,
    get_rca_xyz,
    validate_query,
    optimize_multitable_ad,
    optimize_multitable_sd,
)
from optipyzer.utils import seq_detect, aa_to_dna
from optipyzer.db.interfaces import calc_codon_usage


def _calc_average_table(usage_data: dict, weights: dict):
    """
    Small wrapper for calculating the average table
    """
    if weights is not None:
        return averaged_table(usage_data, False, weights)
    else:
        return averaged_table(usage_data, True, None)


def codon_optimize(
    seq: str,
    organism_list: list[str],
    weights: dict = None,
    seq_type: str = None,
    iterations: int = DEFAULT_NUM_ITERATIONS,
    seed: Union[str, int] = None,
):
    """Optimize a sequence given an organism list and a map/dictionary of weights"""
    if seq_type is None:
        seq_type = seq_detect(seq)

    # initialize the dictionary to store usage data.
    usage_data = {}
    counts = {}

    # get codon preference tables
    for org_id in organism_list:
        counts[org_id], usage_data[org_id] = calc_codon_usage(org_id)

    query_prohibited_codons = find_prohibited_codons(usage_data)

    usage_data = remove_prohibited_codons(usage_data, query_prohibited_codons)

    average_table, weights = _calc_average_table(usage_data, weights)

    rca_xyz = get_rca_xyz(counts)

    peptide_seq, stop_codon = validate_query(seq, (seq_type == "dna"))

    # squared difference optimization
    (
        optimized_sd,
        min_difference_sumsquares,
        best_expression_sd,
    ) = optimize_multitable_sd(
        average_table,
        peptide_seq,
        usage_data,
        rca_xyz,
        weights,
        iterations=iterations,
        seed=seed,
    )

    # absolute difference optimization
    (
        optimized_ad,
        min_difference_absvalue,
        best_expression_ad,
    ) = optimize_multitable_ad(
        average_table,
        peptide_seq,
        usage_data,
        rca_xyz,
        weights,
        iterations=iterations,
        seed=seed,
    )

    return {
        "query": seq,
        "weights": weights,
        "seq_type": seq_type,
        "peptide_seq": peptide_seq,
        "dna_seq": aa_to_dna(peptide_seq),
        "stop_codon": stop_codon,
        "optimized_sd": optimized_sd,
        "min_difference_sumsquares": min_difference_sumsquares,
        "best_expression_sd": best_expression_sd,
        "optimized_ad": optimized_ad,
        "min_difference_absvalue": min_difference_absvalue,
        "best_expression_ad": best_expression_ad,
    }
