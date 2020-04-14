class CodonOptimizer():

	class bcolors:
	    HEADER = '\033[95m'
	    OKBLUE = '\033[94m'
	    OKGREEN = '\033[92m'
	    WARNING = '\033[93m'
	    FAIL = '\033[91m'
	    ENDC = '\033[0m'
	    BOLD = '\033[1m'
	    UNDERLINE = '\033[4m'

	def __init__(self,db):

		# create db cursor object
		curs = connect_to_db(db)
		self._curs = curs

		self.db = db
		self._seqIsDNA = False
		self._seq_IsProtein = False

		self.seq = None
		self.peptide_seq = None
		self.stop_codon = 0
		self.organism_list = None
		self.weights = None
		self.optimmized_sd = None
		self.min_difference_sumsquares = None
		self.best_expression_sd = None
		self.optimmized_ad = None
		self.min_difference_absvalue = None
		self.best_expression_ad = None

	def set_organisms(self,organism_list,weights):
		self.organism_list = organism_list
		self.weights = weights

	def optimize(self,seq,seq_type):
		self.seq = seq
		# Check for manually give seq_type
		if seq_type.lower() == 'dna':
			self._seqIsDNA = True
		elif seq_type.lower() == 'protein':
			self._seqIsProtein = True
		else:
			# If not given, attempt to detect
			print(f"{bcolors.WARNING}Warning: Unknown seq_type: '{seq_type}' ... Attemping to detect sequence{bcolors.ENDC}")
			type_detected = self.seq_detect(seq)
			print(f"{bcolors.WARNING}Sequence being set to {type_detected}{bcolors.ENDC}")

		# initialize the dictionary to store usage data.
		usage_data = {}
		counts = {}

		# get codon preference tables
		for id in self.organism_list:
			counts[id], usage_data[id] = calc_codon_usage(id, self._curs)

		usage_data = codon_preference_priors(usage_data)

		query_prohibited_codons = find_prohibited_codons(usage_data)

		usage_data = remove_prohibited_codons(usage_data, query_prohibited_codons)

		if self.weights:
			average_table, weights = averaged_table(usage_data, False, self.weights)
		else:
			average_table, weights = averaged_table(usage_data, True, None)

		rca_xyz = get_rca_xyz(counts)

		self.peptide_seq,self.stop_codon = validate_query(self.seq, self._seqIsDNA)

		self.optimmized_sd, self.min_difference_sumsquares, self.best_expression_sd = optimize_multitable_sd(average_table, self.peptide_seq,
	                                                                                      	usage_data, rca_xyz, self.weights)
		self.optimmized_ad, self.min_difference_absvalue, self.best_expression_ad = optimize_multitable_ad(average_table, self.peptide_seq,
                                                                                          usage_data, rca_xyz, self.weights)



	def report(self):
		if self.stop_codon == 0:
			print('No Stop Codons Found')
			print('Protein Sequence: {}\n'.format(self.peptide_seq))
			print("Optimized sequence (square difference): {}".format(self.optimmized_sd))
			print("Expression levels (square difference): {}\n".format(self.best_expression_sd))
			print("Optimized sequence (absolute value of difference): {}".format(self.optimmized_ad))
			print("Expression levels (absolute value of difference): {}".format(self.best_expression_ad))
		else:
			print('Stop Codon found at position {}'.format(self.stop_codon))
			print('Protein Sequence: {}\n'.format(self.peptide_seq))
			print("Optimized sequence (square difference): {}".format(self.optimmized_sd))
			print("Expression levels (square difference): {}\n".format(self.best_expression_sd))
			print("Optimized sequence (absolute value of difference): {}".format(self.optimmized_ad))
			print("Expression levels (absolute value of difference): {}".format(self.best_expression_ad))

	def seq_detect(self,seq):

		if all(c.lower() in "atgc" for c in seq):
			print(f"{bcolors.WARNING}DNA sequence detected{bcolors.ENDC}")
			self._seqIsDNA = True
			self._seqIsProtein = False
			return 'DNA'
		else:
			print(f"{bcolors.WARNING}Protein sequence detected{bcolors.ENDC}")
			self._seqIsDNA = False
			self._seqIsProtein = True
			return 'Protein'
		



