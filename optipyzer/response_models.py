from typing import List
from pydantic import BaseModel

class Organism(BaseModel):
    GC1_perc: int
    GC2_perc: int
    GC3_perc: int
    GC_perc: int
    assembly: str
    division: str
    num_CDS: int
    num_codons: int
    org_id: int
    organelle: str
    species: str
    taxid: int
    translation_table: int


class SearchResult(BaseModel):
    num_results: int
    organisms: List[Organism]
    search_query: str