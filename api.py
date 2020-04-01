# import custom libraries
from lib.CodonDataPull import *
from lib.codon_optimizer import CodonOptimizer
import sys

# import flask
from flask import Flask
from flask import jsonify
from flask import request
from flask import render_template
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Testing route/main route
@app.route('/test')
def api_base_test():

	return_string = '''\nBARNABAS A BUM FR\n'''

	return return_string


# Route to optimize DNA sequence
@app.route('/optimize/dna', methods=['POST'])
def optimize_dna():
	seq = request.body['seq']
	organism_list = request.body['org_list']
	weights = request.body['weights']

	optipyzer = CodonOptimizer()
	optipyzer.set_organisms(organism_list,weights)
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

	return jsonify(return_package)


# Route to optimize Protein sequence
@app.route('/optimize/protein', methods=['POST'])
def optimize_pro():
	seq = request.body['seq']
	organism_list = request.body['org_list']
	weights = request.body['weights']

	optipyzer = CodonOptimizer()
	optipyzer.set_organisms(organism_list,weights)
	optipyzer.optimize(seq,seq_type='protein')

	return_package = {
		'seq_type': 'Protein',
		'peptide_seq': optipyzer.peptide_seq,
		'stop_codon': optipyzer.stop_codon,
		'optimmized_sd': optipyzer.optimmized_sd,
		'best_expression_sd': optipyzer.best_expression_sd,
		'optimmized_ad': optipyzer.optimmized_ad,
		'best_expression_ad': optipyzer.best_expression_ad
	}

	return jsonify(return_package)




# RUN API
if __name__ == '__main__':
	app.run()