from typing import Dict, Optional
from fastapi import Query
from pydantic import BaseModel


class OptimizeQuery(BaseModel):
    seq: str
    weights: Dict[str, int]
    iterations: Optional[int]
    seed: Optional[int]

    class Config:
        schema_extra = {
            "description": "The optimization query that includes the sequence, and the organism weights",
            "example": {
                "seq": "ATGCGTACTAGTCAGTCAGACTGACTG",
                "weights": {"16815": 1, "122563": 2},
            },
        }


species_name = Query(..., description="Name of a species", example="E. coli")
