"""
Python script to take all of the data from the main table ORGANISMS and populate the AUTOCOMPLETE_SELECTION table.
On the front end, 30,000 rows of data is too much for the search/autocomplete field - so I wneed to narrow it down more - 
I found that the intra-species codon usage data doesn't vary much...
...that is, various strains of a certain species don't need to be codon-optimized individually. The strain can be trated
as a whole species.

Thus, I need to filter the data from the whole table so it only takes one strain from one species and displays that to
the user on the front end - down the line, I could definitely see this causing some issues, but for now this is my fix.

Algorithm:
	
	names = []

	result = SELECT * FROM ORGANISMS
	for row in result:
		name = get_species_name(result.name)
		if name in names:
			continue
		else:
			names.append(name)
			INSERT row INTO AUTOCOMPLETE_SELECTION

"""

import sqlite3
import sys

def reset_table(curs):

	try: 
		# Drop table
		query = ''' DROP TABLE autocomplete_data '''
		curs.execute(query)

	except:
		# table probably doesnt exsist

		# Create new table
		query = ''' CREATE TABLE autocomplete_data
					(org_id INTEGER PRIMARY KEY, 
	                division,
	                assembly,
	                taxid INTEGER,
	                species,
	                organelle,
	                translation_table INTEGER,
	                num_CDS INTEGER,
	                num_codons INTEGER,
	                GC_perc FLOAT,
	                GC1_perc FLOAT,
	                GC2_perc FLOAT,
	                GC3_perc FLOAT);'''
		curs.execute(query)

	return

def load_data(curs):

	# Get unqique species from database
	query = '''SELECT * FROM ORGANISMS GROUP BY SPECIES'''
	curs.execute(query)
	result = curs.fetchall()

	# Initialize empty name list
	names = []

	N = len(result)
	i = 1
	for row in result:
		
		# Update user
		print('Cleaned {}/{} rows'.format(i,N))
		i += 1

		# isolate species from strain
		name = isolate_species(row[4])

		# check if already seen skip if seen, else insert into table
		if name in names:
			continue
		else:
			names.append(name)
			query = '''INSERT INTO autocomplete_data VALUES			
                    (?,?,?,?,?,?,?,?,?,?,?,?,?)'''
			curs.execute(query, (row[0], row[1], row[2], row[3],
                         			row[4], row[5], row[6],
                         			row[7], row[8], row[9],
                         			row[10], row[11],row[12]))
	return

def isolate_species(species_strain):

	# Split on spaces
	words = species_strain.split(' ')

	# Create new string to represent only species and not the strain
	try:
		species = words[0] + ' ' + words[1]
	except:
		species = words[0]

	return species



def connect_to_db(db_file):

	# Attempt to connect to databse with specified file
    try:
        conn = sqlite3.connect(db_file)
        #print('Connection made')
    except:
        print('Unable to connect to database... Are you sure you have the right file?')
        exit(1)

    return conn, conn.cursor() # Return the cursor object


if __name__ == '__main__':

	db_file = sys.argv[1]

	if not db_file:
		print('Please specify database file')
		exit(1)

	conn, curs = connect_to_db(db_file)
	reset_table(curs)
	load_data(curs)

	conn.commit()

