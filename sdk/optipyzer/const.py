VERSION = "0.1.0"
LICENSE = "Apache 2.0"

SLEEP_MIN = 0.2  # Enforce minimum wait time between API calls (seconds)
PUBLIC_SERVER_BASE = "https://optipyzer-api.herokuapp.com"
LOCAL_SERVER_BASE = "http://localhost:8000"

SESSION_HDRS = {
	'application': 'Optipyzer',
	'User-Agent': 'https://github.com/NLeRoy917/optipyzer.com',
	'Content-Type': 'application/json'
}

VALID_AMINO_ACIDS = "ARNDCQEGHILKMFPSTWYV"
VALID_SEQ_TYPES = [
    'dna',
    'protein'
]