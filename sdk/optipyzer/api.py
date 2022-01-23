from typing import Dict
import requests
import time
from const import LOCAL_SERVER_BASE, PUBLIC_SERVER_BASE, SESSION_HDRS, SLEEP_MIN
from log import _LOGGER
from helpers import verify_dna, verify_protein

# return types
from requests import Response
from models import SearchResult
from const import VALID_SEQ_TYPES
from models import CodonUsage, OptimizationResult


class api():
	"""Python interface for the Optipyzer web API."""

	_session = requests.Session()
	_session.headers = SESSION_HDRS

	def __init__(self, local: bool = False, timeout: int = 1000, sleep_time: float = 0.5):
		"""Initialize an optipyzer interface"""

		# determine environment
		if local: self.api_base = LOCAL_SERVER_BASE
		else: self.api_base = PUBLIC_SERVER_BASE

		# set params
		self.timeout = timeout
		if sleep_time < SLEEP_MIN:
			_LOGGER.warn(
				f"Minimum sleep time of {SLEEP_MIN} sec required \
				({sleep_time} sec was supplied). Setting to {SLEEP_MIN} sec"
			)
			self.sleep_time = SLEEP_MIN
		else:
			self.sleep_time = sleep_time

	def _make_request(self, path: str, method: str = 'GET', params_: dict = {}, body_: dict = {}) -> Response:
		"""Make a request to the API"""
		
		# generate the URI
		uri = self.api_base + path

		try:
			response = self._session.request(
				method,
				uri,
				params=params_,
				json=body_
			)
		except requests.Timeout:
			_LOGGER.warn("Request timeout raised.")

		except requests.RequestException as e:
			_LOGGER.error(f"Exception raised during request to {uri}: {e}")

		# check response status
		if response.status_code != 200:
			_LOGGER.error(f"Request failed with status code: {response.status_code}")
			_LOGGER.error(f"{response.json()}")

		# Enforce rate limiting
		time.sleep(max(SLEEP_MIN, self.sleep_time))

		return response

	def search(self, name: str, limit: int = 50) -> SearchResult:
		"""Search for an organism given it's name"""
		result = self._make_request(
			"/species/search",
			params_={
				"name": name,
				"limit": limit
			}
		)
		search_results = result.json()
		return search_results

	def optimize(self, seq: str, weights: Dict[str, int], seq_type: str = 'dna') -> OptimizationResult:
		"""Optimize a sequence given specific organism weights"""
		# force seq_type lower
		seq_type = seq_type.lower()
		if seq_type not in VALID_SEQ_TYPES:
			raise ValueError(f"Invalid sequence type: {seq_type}")
		
		# validate that the sequences are valid
		if seq_type == 'dna': verify_dna(seq)
		else: verify_protein(seq)

		# make optimization request
		result = self._make_request(
			f"/optimize/{seq_type}",
			method="POST",
			body_={
				'seq': seq,
				'weights': weights
			}
		)
		return result.json()

	def pull_codons(self, org_id: str) -> CodonUsage:
		"""Pull codon usage data for a specific organism"""
		result = self._make_request(
			f"/species/{org_id}/codons",
		)
		return result.json()
		


if __name__ == '__main__':

	# test code goes here
	op = api(local=True)

	# search for e coli
	result = op.search(name='Escherichia Coli')
	orgs = result['organisms']
	print(orgs)

	# optimize a sequence
	seq = "ATGCGTACTAGTCAGTCAGACTGACTG"
	weights = {
	    "16815": 1,
	    "122563": 2
	}
	result = op.optimize(
		seq, weights, seq_type='dna'
	)

	# pull codons for e coli
	codon_usage = op.pull_codons("16815")
	print(codon_usage)









