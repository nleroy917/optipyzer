from typing import Dict, List
from pydantic import BaseModel

class OptimizationResult(BaseModel):
    query: str
    weights: Dict[str, int]
    seq_type: str
    peptide_seq: str
    dna_seq: str
    stop_codon: int
    optimized_sd: str
    min_difference_sumsquares: float
    best_expression_sd: Dict[str, float]
    optimized_ad: str
    min_difference_absvalue: float
    best_expression_ad: Dict[str, float]
    
    class Config:
        orm_mode = True
        
class Organism(BaseModel):
    org_id: int
    division: str
    assembly: str
    taxid: int
    species: str
    organelle: str
    translation_table: int
    num_CDS: int
    num_codons: int
    GC_perc: float
    GC1_perc: float
    GC2_perc: float
    GC3_perc: float

    class Config:
        orm_mode = True

class SearchResult(BaseModel):
    num_results: int
    organisms: List[Organism]
    search_query: str
