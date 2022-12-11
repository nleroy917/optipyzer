VERSION = "0.4.1"
LICENSE = "Apache 2.0"

SLEEP_MIN = 0.2  # Enforce minimum wait time between API calls (seconds)
PUBLIC_SERVER_BASE = "https://optipyzer-api.herokuapp.com"
LOCAL_SERVER_BASE = "http://localhost:8000"

SESSION_HDRS = {
    "application": "Optipyzer",
    "User-Agent": "https://github.com/NLeRoy917/optipyzer.com",
    "Content-Type": "application/json",
}

VALID_AMINO_ACIDS = "ARNDCQEGHILKMFPSTWYV"
VALID_SEQ_TYPES = ["dna", "protein"]

POPULAR_SPECIES = {
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
