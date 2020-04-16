
import sys
import os
import requests
import json
import time

from organism import Organism
from codon_optimizer import CodonOptimizer
from codon_usage import CodonUsage
from optimization import Optimization

class api():

	"""
	Python interface for the Optipyzer web API
	"""

	_session = requests.Session()
	_session.headers = {
		'application': 'Optipyzer',
		'User-Agent': 'https://github.com/NLeRoy917/optipyzer.com',
		'Content-Type': 'application/json'
    }
	_SLEEP_MIN = 0.2  # Enforce minimum wait time between API calls (seconds)

	def __init__(self, timeout=10, sleep_time=0.5):

		"""
		init Optipyzer API object
		"""
		#self.api_base = 'http://127.0.0.1:5000/'
		self.api_base = 'https://optipyzer-api.herokuapp.com/'
		self.timeout = timeout
		self.sleep_time = sleep_time

	def _make_request(self, path, method='GET', params_={}, body_={}):

		"""Make a request to the API"""

		uri = self.api_base + path

		# Make the request
		response = None

		try:
			response = self._session.request(method, uri,
											timeout=self.timeout,
											params=params_,
											data=json.dumps(body_))
		except requests.Timeout as e:
			print("Timeout raised and caught:\n{e}".format(e=e))

		except requests.RequestException as e:
			print("Error raised and caught:\n{e}".format(e=e))

		# Enforce rate limiting
		time.sleep(max(self._SLEEP_MIN, self.sleep_time))
		return response if response else None


	def search(self,name):

		path = '/search/species/{}'.format(name)
		response = self._make_request(path)
		try:
			organisms = response.json()['organisms']

		except TypeError as e:
			print('Empty response returned...')
			return []

		org_list = []

		for org in organisms:

			# create new empty organism
			new_org = Organism()

			# populate with data
			try:
				new_org.org_id = org['org_id']
				new_org.division = org['division']
				new_org.assembly = org['assembly']
				new_org.taxid = org['taxid']
				new_org.species = org['species']
				new_org.organelle = org['organelle']
				new_org.translation_table = org['translation_table']
				new_org.num_CDS = org['num_CDS']
				new_org.num_codons = org['num_codons']
				new_org.GC_perc = org['GC_perc']
				new_org.GC1_perc = org['GC1_perc']
				new_org.GC2_perc = org['GC2_perc']
				new_org.GC3_perc = org['GC3_perc']

				# append to list
				org_list.append(new_org)

			except:
				org_list.append(Organism())


		return org_list

	def optimize(self,seq,org_list,weights,seq_type='dna'):

		if len(org_list) != len(weights):
			raise ValueError('Lengths of org_list and weights must be the same!')

		if seq_type != 'dna' and seq_type != 'protein':
			raise ValueError('Invalid sequence type "{}"! seq_type must be "dna" or "protein"'.format(seq_type))

		if (len(seq) % 3) != 0:
			raise ValueError('Sequence length must be divisible by 3!')

		orgs = []
		for org in org_list:
			orgs.append(org.org_id)

		weights_clean = {}
		for i in range(len(orgs)):
			weights_clean[orgs[i]] = weights[i]

		path = '/optimize/{}'.format(seq_type)
		body = {
			'seq': seq.lower(),
			'org_list': orgs,
			'weights': weights_clean

		}
		response = self._make_request(path,method='POST',body_ =body)


		try:

			data = response.json()

			optimization = Optimization()
			optimization.seq_type = data['seq_type']
			optimization.peptide_seq = data['peptide_seq']
			optimization.stop_codon = data['stop_codon']
			optimization.optimmized_sd = data['optimmized_sd']
			optimization.best_expression_sd = data['best_expression_sd']
			optimization.optimmized_ad = data['optimmized_ad']
			optimization.best_expression_ad = data['best_expression_ad']

		except TypeError as e:
			print('Empty response returned...')
			return Optimization()

		return optimization

	def pull_codons(self,organism):

		path = '/fetch/species/{}/codons'.format(organism.org_id)
		response = self._make_request(path)
		data = response.json()
		codon_usage = CodonUsage()
		codon_usage.counts = data['counts']
		codon_usage.codon_usage = data['codon_usage']

		return codon_usage


if __name__ == '__main__':

	optipyzer = api()








