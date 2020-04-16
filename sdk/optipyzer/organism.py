class Organism():

	"""
	An Organism Object from the database
	"""

	def __init__(self):
		self.org_id = None
		self.division = None
		self.assembly = None
		self.tax_id = None
		self.species = None
		self.organelle = None
		self.translation_table = None
		self.num_CDS = None
		self.num_codons = None
		self.GC_perc = None
		self.GC1_perc = None
		self.GC2_perc = None
		self.GC3_perc = None

	def info(self):
		print(self.species)
		print('-'*50)
		print('ID                		{}'.format(self.org_id))
		print('Division          		{}'.format(self.division))
		print('Assembly          		{}'.format(self.assembly))
		print('Tax ID            		{}'.format(self.taxid))
		print('Organelle         		{}'.format(self.organelle))
		print('Translation Table 		{}'.format(self.translation_table))
		print('# of CDS          		{}'.format(self.num_CDS))
		print('# of Codons       		{}'.format(self.num_codons))
		print('GC %              		{}'.format(self.GC_perc))
		print('GC1 %             		{}'.format(self.GC1_perc))
		print('GC2 %             		{}'.format(self.GC2_perc))
		print('GC3 %             		{}'.format(self.GC3_perc))


	
