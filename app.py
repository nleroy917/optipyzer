# import custom libraries
from lib.CodonDataPull import *
from lib.codon_optimizer import CodonOptimizer
import sys

# import sqlite
import sqlite3

# import flask
from flask import Flask
from flask import jsonify
from flask import request
from flask import render_template
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

DB_NAME = 'codon_usage_data.db'

# Testing route/main route
@app.route('/')
def api_base():

	return_string = '''<h1>Optipyzer API</h1>'''

	return return_string

# Testing route/main route
@app.route('/test')
def api_base_test():

	return_string = '''\nBARNABAS A BUM FR\n'''

	return return_string


# Route to optimize DNA sequence
@app.route('/optimize/dna', methods=['POST'])
def optimize_dna():
	data = request.get_json()
	seq = data['seq']
	organism_list = [int(x) for x in data['org_list']]
	weights_cleaned = {}
	for org in data['weights']:
		weights_cleaned[int(org)] = float(data['weights'][org])
	try:
		optipyzer = CodonOptimizer(DB_NAME)
		optipyzer.set_organisms(organism_list,weights_cleaned)
		optipyzer.optimize(seq,seq_type='dna')

		return_package = {
			'seq_type': 'DNA',
			'peptide_seq': optipyzer.peptide_seq,
			'stop_codon': optipyzer.stop_codon,
			'optimmized_sd': optipyzer.optimmized_sd,
			'best_expression_sd': optipyzer.best_expression_sd,
			'optimmized_ad': optipyzer.optimmized_ad,
			'best_expression_ad': optipyzer.best_expression_ad
		}
	except:
		return_package={
			'error': {
			'message': "The optimization could not be complete. Verify your sequence!",
			'code': 404
			}
		}
		return jsonify(return_package), 404

	return jsonify(return_package), 200


# Route to optimize Protein sequence
@app.route('/optimize/protein', methods=['POST'])
def optimize_pro():
	data = request.get_json()
	seq = data['seq']
	organism_list = [int(x) for x in data['org_list']]
	weights_cleaned = {}
	for org in data['weights']:
		weights_cleaned[int(org)] = float(data['weights'][org])

	try:
		optipyzer = CodonOptimizer(DB_NAME)
		optipyzer.set_organisms(organism_list,weights_cleaned)
		optipyzer.optimize(seq,seq_type='protein')

		return_package = {
			'seq_type': 'DNA',
			'peptide_seq': optipyzer.peptide_seq,
			'stop_codon': optipyzer.stop_codon,
			'optimmized_sd': optipyzer.optimmized_sd,
			'best_expression_sd': optipyzer.best_expression_sd,
			'optimmized_ad': optipyzer.optimmized_ad,
			'best_expression_ad': optipyzer.best_expression_ad
		}
	except:
		return_package={
			'error': {
			'message': "The optimization could not be complete. Verify your sequence!",
			'code': 404
			}
		}
		return jsonify(return_package), 404

	return jsonify(return_package), 200


# Route to get all species from database for UI
@app.route('/fetch/species', methods=['GET'])
def fetch_species():

	speciesList = fetch_species_for_UI(DB_NAME)

	return jsonify(speciesList)

# Route to get species from id
@app.route('/fetch/species/<org_id>', methods=['GET'])
def id_to_species(org_id):

	species = species_from_id(DB_NAME,org_id)
	return_package = {
	  'name': species[4],
	  'id': species[0],
	  'seq_type': species[5]
	}

	return jsonify(return_package)

# Get codon usage data for species
@app.route('/fetch/species/<org_id>/codons', methods=['GET'])
def get_codon_usage_data(org_id):

	curs = connect_to_db(DB_NAME)
	try:
		counts, codon_usage = calc_codon_usage(org_id,curs)
		return_package = {
			'counts': counts,
			'codon_usage': codon_usage
		}
	except:
		'error': {
			'message': "Codon Usage table unavailable for species - perhaps not enough data is available.",
			'code': 404
			}


	return jsonify(return_package)

# Route to get species from id
@app.route('/search/species/<name>', methods=['GET'])
def search_for_name(name):

	status_code = 200
	curs = connect_to_db(DB_NAME)
	query = '''SELECT org_id, species, taxid, GC_perc
           FROM organisms
           WHERE species LIKE ?'''

	curs.execute(query,['%'+name+'%'])
	results = curs.fetchall()

	return_package = {'search_query': name, 
				  'organisms': [],
				  'num_results':len(results),
				  }

	for org in results:
  		return_package['organisms'].append({
  		'id': org[0],
  		'species_name': org[1],
  		'taxid': org[2],
  		'GC_perc': org[3]
  		})

	if len(results) == 0:
		status_code = 404
		return_package = {
			'error': {
				'message': "No organism name of {} was found".format(name),
				'code': 404
			}
		}


	return jsonify(return_package), status_code

# RUN API
if __name__ == '__main__':
	app.run()