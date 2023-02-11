from decimal import Inexact
from sqlalchemy import Column, Float
from .database import Base

from sqlalchemy import Column, Integer, String, Float


class Organism(Base):
    __tablename__ = "organisms"

    org_id = Column(Integer, primary_key=True)
    division = Column(String)
    assembly = Column(String)
    taxid = Column(Integer)
    species = Column(String)
    organelle = Column(String)
    translation_table = Column(Integer)
    num_CDS = Column(Integer)
    num_codons = Column(Integer)
    GC_perc = Column(Float)
    GC1_perc = Column(Float)
    GC2_perc = Column(Float)
    GC3_perc = Column(Float)


# this is a truncated version of the above table
# to improve browser performance
class AutocompleteOrganism(Base):
    __tablename__ = "autocomplete_data"

    org_id = Column(Integer, primary_key=True)
    division = Column(String)
    assembly = Column(String)
    taxid = Column(Integer)
    species = Column(String)
    organelle = Column(String)
    translation_table = Column(Integer)
    num_CDS = Column(Integer)
    num_codons = Column(Integer)
    GC_perc = Column(Float)
    GC1_perc = Column(Float)
    GC2_perc = Column(Float)
    GC3_perc = Column(Float)
    category = Column(String)


class CodonUsage(Base):
    __tablename__ = "codon_usage"

    org_id = Column(Integer, primary_key=True)
    TTT = Column(Integer)
    TTC = Column(Integer)
    TTA = Column(Integer)
    TTG = Column(Integer)
    CTT = Column(Integer)
    CTC = Column(Integer)
    CTA = Column(Integer)
    CTG = Column(Integer)
    ATT = Column(Integer)
    ATC = Column(Integer)
    ATA = Column(Integer)
    ATG = Column(Integer)
    GTT = Column(Integer)
    GTC = Column(Integer)
    GTA = Column(Integer)
    GTG = Column(Integer)
    TAT = Column(Integer)
    TAC = Column(Integer)
    TAA = Column(Integer)
    TAG = Column(Integer)
    CAT = Column(Integer)
    CAC = Column(Integer)
    CAA = Column(Integer)
    CAG = Column(Integer)
    AAT = Column(Integer)
    AAC = Column(Integer)
    AAA = Column(Integer)
    AAG = Column(Integer)
    GAT = Column(Integer)
    GAC = Column(Integer)
    GAA = Column(Integer)
    GAG = Column(Integer)
    TCT = Column(Integer)
    TCC = Column(Integer)
    TCA = Column(Integer)
    TCG = Column(Integer)
    CCT = Column(Integer)
    CCC = Column(Integer)
    CCA = Column(Integer)
    CCG = Column(Integer)
    ACT = Column(Integer)
    ACC = Column(Integer)
    ACA = Column(Integer)
    ACG = Column(Integer)
    GCT = Column(Integer)
    GCC = Column(Integer)
    GCA = Column(Integer)
    GCG = Column(Integer)
    TGT = Column(Integer)
    TGC = Column(Integer)
    TGA = Column(Integer)
    TGG = Column(Integer)
    CGT = Column(Integer)
    CGC = Column(Integer)
    CGA = Column(Integer)
    CGG = Column(Integer)
    AGT = Column(Integer)
    AGC = Column(Integer)
    AGA = Column(Integer)
    AGG = Column(Integer)
    GGT = Column(Integer)
    GGC = Column(Integer)
    GGA = Column(Integer)
    GGG = Column(Integer)
