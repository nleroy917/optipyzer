
import sys
import os
import requests
import json
import time

from organism import Organism
from codon_optimizer import CodonOptimizer
from codon_usage import CodonUsage

class Optipyzer():

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

	def __init__(self, timeout=5, sleep_time=0.5):

		"""
		init Optipyzer API object
		"""

		self.api_base = 'http://127.0.0.1:5000/'
		self.timeout = timeout
		self.sleep_time = sleep_time

	def _make_request(self, path, method='GET', params_={}):

		"""Make a request to the API"""

		uri = self.api_base + path

		# Make the request
		response = None

		try:
			response = self._session.request(method, uri,
											timeout=self.timeout,
											params=params_)
		except Timeout as e:
			print("Timeout raised and caught:\n{e}".format(e=e))

		# Enforce rate limiting
		time.sleep(max(self._SLEEP_MIN, self.sleep_time))
		return response.text if response else None


	def search(self,name):

		path = '/search/species/{}'.format(name)
		response = self._make_request(path)
		organisms = json.loads(response)['organisms']
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

	def optimize(self):

		return seq

	def pull_codons(self,org_id):

		return codon_usage


if __name__ == '__main__':

	pass



