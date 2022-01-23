from typing import List
from pydantic import BaseModel

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
