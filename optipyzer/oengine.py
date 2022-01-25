"""
01/24/2022:
---
I do not touch this file. This is the core engine written
by Caleigh Roleck in 2019. This code here will optimize
a sequence given weights and codon usage. It is pretty
inpenetrable, so I leave it be and build around it.
"""

import random
from statistics import *
from math import *


def find_prohibited_codons(query, preference_threshold=0.2):
    """
    Searches through the query species codon tables to identify codons with
    preferences below a threshold for any query species
    :param query: a three-layer nested dictionary. The outermost layer uses species' ID as the key. The value is
    dictionary, where the keys are the one-letter abbreviations for amino acids. Those values are another dictionary,
    where the keys are the codons that encode for that amino acid. The value of the codon keys is the codon preference
    expressed as a decimal
    :param preference_threshold: any codons with preferences at or below this value will be prohibited from use in
    the multi-species optimized codon table. The default is 0.1
    :return: a dictionary where the key is the one-letter abbreviation for an amino acid, and the value is a list of
    any prohibited codons that encode for that amino acid and have a preference below the preference threshold.
    """
    # initialize the prohibited codons dictionary
    prohibited_codons = {}
    # loop through each species' codon table
    for species in query:
        for residue in query[species]:
            for codon in query[species][residue]:
                # determine if codon preference falls below threshold
                # if yes, adds that codon to the prohibited codons dictionary
                if query[species][residue][codon] <= preference_threshold:
                    if residue not in prohibited_codons:
                        prohibited_codons[residue] = [codon]
                    else:
                        if codon not in prohibited_codons[residue]:
                            prohibited_codons[residue].append(codon)
    return prohibited_codons


def remove_prohibited_codons(query, prohibited_codons, var_thresh=0.1):
    """
    Adjusts the individual speciee' codon tables to set the preference of prohibited codons to 0 and
    normalize the acceptable codons so that each residue's total sum of codon preferences is equal to 1
    :param query: a three-layer nested dictionary. The outermost layer uses species' ID as the key. The value is
    dictionary, where the keys are the one-letter abbreviations for amino acids. Those values are another dictionary,
    where the keys are the codons that encode for that amino acid. The value of the codon keys is the codon preference
    expressed as a decimal
    :param prohibited_codons: a dictionary where the key is the one-letter abbreviation for an amino acid, and
    the value is a list of any prohibited codons that encode for that amino acid and have a preference below the
    preference threshold.
    :param var_thresh: a percentage, expressed as a decimal. For residues for which all codons would be considered
    prohibited, the codon would be allowed in use if it's variance is within this threshold of the average of the
    list of minimum variances
    :return: an updated form a query: a three-layer nested dictionary. The outermost layer uses species' ID as the key.
    The value is dictionary, where the keys are the one-letter abbreviations for amino acids. Those values are another
    dictionary, where the keys are the codons that encode for that amino acid. The value of the codon keys is the codon
    preference expressed as a decimal. Prohibited codon's preference is now set at 0, and acceptable codons are
    normalized
    """
    # a dictionary with the total number of amino acids that encode each amino acid with more than 1 codon
    number_total_codons = {"A": 4, "R": 6, "N": 2, "D": 2, "C": 2, "Q": 2, "E": 2, "G": 4, "H": 2, "I": 3, "L": 6,
                           "K": 2, "F": 2, "P": 4, "S": 6, "T": 4, "Y": 2, "V": 4, "Stop": 3}
    # initializes a list that will store any residue for which all codons would be considered "prohibited"
    inaccessible_residues = []
    # loops through the list of prohibited codons
    for residue in prohibited_codons:
        # determines if the number of prohibited codons is the same as the total number of codons
        if len(prohibited_codons[residue]) == number_total_codons[residue]:
            inaccessible_residues.append(residue)
    # initializes a dictionary that will store which codons should be allowed back in use for the inaccessible residues
    allowed_codons = {}
    for i in range(len(inaccessible_residues)):
        # initializes a dictionary that will store a list of every species' codon preference indexed by that codon
        # for the residue currently iterating upon
        preference_values = {}
        # initializes the dictionary item indexed by the residue, with the value as a list of allowed codons
        allowed_codons[inaccessible_residues[i]]: []
        # loops through each species and adds their preference for each codon to the preference_values list
        for species in query:
            for codon in query[species][inaccessible_residues[i]]:
                if codon not in preference_values:
                    preference_values[codon] = [query[species][inaccessible_residues[i]][codon]]
                else:
                    preference_values[codon].append(query[species][inaccessible_residues[i]][codon])
        # changes the preference_values from a list of all species' codon preferences for that codon to the
        # variance of that codon's preference amongst all species
        for codon in preference_values:
            preference_values[codon] = variance(preference_values[codon])
        # loops through the preference_values list of variances (indexed by codons)
        # initializes a variable for the min variance, which is a list of all minimum variances
        min_var = [1000000]
        for codon in preference_values:
            # if the variance is less than 90% of the current average minimum variance, replaces the whole
            # minimum variance list to be only that single variance value
            # and adjusts the list of allowed_codons for that residue to be just that codon
            if preference_values[codon] < ((1 - var_thresh) * mean(min_var)):
                min_var = [preference_values[codon]]
                allowed_codons[inaccessible_residues[i]] = [codon]
            # if the variance is within 10% of the average minimum variance, adds that variance to the minimum variance
            # list and that codon to the list of allowed codons for that residue
            elif ((1 - var_thresh) * mean(min_var)) <= preference_values[codon] < ((1 + var_thresh) * mean(min_var)):
                min_var.append(preference_values[codon])
                allowed_codons[inaccessible_residues[i]].append(codon)
    # removes the allowed codons from the list of prohibited codons
    for residue in allowed_codons:
        for c in range(len(allowed_codons[residue])):
            prohibited_codons[residue].remove(allowed_codons[residue][c])
    # loops through the query dictionary to look at each individual codon for each residue for each species
    for species in query:
        for residue in query[species]:
            # initializes the sum of the acceptable-codon preference to 0 for each residue for each species
            acceptable_codon_sum = 0
            # determines if the residue has any prohibited codons
            if residue in prohibited_codons:
                # finds the sum of the acceptable codons for residues with prohibited codons
                for codon in query[species][residue]:
                    if codon not in prohibited_codons[residue]:
                        acceptable_codon_sum += query[species][residue][codon]
                # changes the codon preference for each codon for a residue with prohibited codons
                # acceptable codons are normalized by dividing native codon preference by the sum of preferences
                # of acceptable codons
                # prohibited codons' preferences are set to 0
                for codon in query[species][residue]:
                    # print(acceptable_codon_sum, flush=True)
                    if codon not in prohibited_codons[residue] and acceptable_codon_sum != 0:
                        query[species][residue][codon] = query[species][residue][codon] / acceptable_codon_sum
                    else:
                        query[species][residue][codon] = 0
    # call to adjust allowed codons to ensure all residues have allowed codons
    return query


def equal_optimization(query):
    """
    Produces a dictionary of species weights for when the user desires equally-weighted species
    :param query: query: a three-layer nested dictionary. The outermost layer uses species' ID as the key. The values
    are a codon table, but only the species-layer is used in this function
    :return: a tuple of a dictionary with the key being the species ID and the value being the weight of the species,
    which are all equal and a dictionary that sets each species' target expression to 1
    """
    # initialzes target expression levels dictionary
    species_expression = {}
    # calculates the weight value when equally-weighted species are desired
    equal_weight = 1 / len(query)
    # creates a dictionary with the key being the same species ID as in the query dictionary, and the value being
    # the weight for equally-weighted species
    species_weight = {}
    for species in query:
        species_weight[species] = equal_weight
        species_expression[species] = 1
    return species_weight, species_expression


def get_species_weight(species_expression):
    """
    If the target expression levels of each species is not equal, calculates the weight each species' individual codon
    table should have in the multi-level
    :param species_expression: a dictionary with the key as the species ID and the value as the target expression levels
    normalized to "1" for the lowest expression level
    :return: species_weight, a dictionary with the key as the species ID and the value being the weight (as a % each
    species' table should have to generate the first iteration multi-table
    """
    # initializes the total expression level and the species weight dictionary
    total_expression = 0.0
    species_weight = {}
    # finds the sum of target expression levels for each species
    for species in species_expression:
        total_expression += species_expression[species]
    # calculates the percentage each species contributes to the total target expression levels
    for species in species_expression:
        species_weight[species] = species_expression[species] / total_expression
    return species_weight


def codon_preference_priors(query_table, parameter=2.5):
    """
    get dirichlet density for codon preference
        corrected codon preference =
            (product (codon preference)^(parameter(i) - 1)) / sum of corrected codon preferences
        Where all the parameters are equal
    :param query_table: a three-layer nested dictionary. The outermost layer uses species' ID as the key. The value is
    dictionary, where the keys are the one-letter abbreviations for amino acids. Those values are another dictionary,
    where the keys are the codons that encode for that amino acid. The value of the codon keys is the codon preference
    expressed as a decimal
    :param parameter: the initial codon prefernce calculation is raised to the power of the parameter - 1
    :return: an updated query - a three-layer nested dictionary. The outermost layer uses species' ID as the key.
    The value is dictionary, where the keys are the one-letter abbreviations for amino acids. Those values are another
    dictionary, where the keys are the codons that encode for that amino acid. The value of the codon keys is the
    codon preference expressed as a decimal after obtaining the dirichlet prior value
    """
    # loop through query table
    for species in query_table:
        for residue in query_table[species]:
            # initialize sum value
            pref_sum = 0
            # raise each codon preference to the power of parameter-1 and update sum
            for codon in query_table[species][residue]:
                query_table[species][residue][codon] **= (parameter - 1)
                pref_sum += query_table[species][residue][codon]
            # divide the codon preferences by sum
            for codon in query_table[species][residue]:
                query_table[species][residue][codon] /= pref_sum
    return query_table


def averaged_table(query, equal_species, species_expression):
    """
    Creates the 0th iteration multi-table, which is just an average of the individual codon preferences of species
    after removing prohibited codons
    :param query: a three-layer nested dictionary. The outermost layer uses species' ID as the key.
    The value is dictionary, where the keys are the one-letter abbreviations for amino acids. Those values are another
    dictionary, where the keys are the codons that encode for that amino acid. The value of the codon keys is the codon
    preference expressed as a decimal. Prohibited codon's preference is now set at 0, and acceptable codons are
    normalized
    :param equal_species: a Boolean variable that is True when the user inputs they want all species to be weighted
    equally and false when the user wants to manually enter custom weights
    :param species_expression: If equal_species is True, this variable is None. If equal_species if False, this variable
    is a dictionary with the key being the species ID and the value being the manually entered target normalized
    expression levels
    :return: a two-layered nested dictionary. The outermost layer uses the one-letter abbreviation of a residue as
    the key, and the value is a dictionary. In this dictionary, the codons that encode that residue are the key, and the
    value is the codon preference after obtaining the species-based weighted-average
    """
    # obtains the species_weight dictionary if the user desires all species to be equally weighted
    # gets the codon weights from the target species expression levels if not all species' target expression levels are
    # equal
    if equal_species:
        species_weight, species_expression = equal_optimization(query)
    else:
        species_weight = get_species_weight(species_expression)
    # initializes the mutli-species optimized codon preference table
    multi_table = {}
    # loops through the query of all species' individual codon preference tables
    # for the first iteration of "species", adds each residue to the multi-table dictionary
    # for the first iteration of each residue, adds each codon to the residue dictionary in the multi-table dictionary
    for species in query:
        for residue in query[species]:
            if residue not in multi_table:
                multi_table[residue] = {}
            for codon in query[species][residue]:
                if codon not in multi_table[residue]:
                    # sets the value of each codon in the multi-table to the product of the species weight and codon
                    # preference during the first occurence of this codon/first species
                    multi_table[residue][codon] = (species_weight[species] * query[species][residue][codon])
                else:
                    # adds the product of the species weight and codon preference to the multi-table's value for that
                    # codon's averaged preference for all subsequent occurrences of this codon
                    multi_table[residue][codon] += (species_weight[species] * query[species][residue][codon])
    return multi_table, species_expression


def get_multitable_randomnumbers(multi_table):
    """
    converts the codon table from codon preference to a dictionary of lists (sorted by residues and then codons) that
    display the bounds of random numbers which would encode for that residue
    :param multi_table: a two-layered nested dictionary. The outermost layer uses the one-letter abbreviation of a
    residue as the key, and the value is a dictionary. In this dictionary, the codons that encode that residue are the
    key, and the value is the codon preference for the multi-species optimized codon table
    :return: a two-layered nested dictionary. The outermost layer uses the one-letter abbreviation of a
    residue as the key, and the value is a dictionary. In this dictionary, the codons that encode that residue are the
    key, and the value is a list of two numbers with a range proportional to codon preference, with each codon's values
    being non-overlapping
    """
    # initialize the multi-table for random number generalization
    random_num_multitable = {}
    # loops through the multi-table, creating a second version in which instead of codon preferences, the value is
    # a list of two numbers
    # the range of the two numbers is equal to the codon preference * 100000000
    # the two numbers correspond to the lower bound (greater than or equal to) and the upper bound (less than) of random
    # numbers that, when generated, would cause that codon to be selected
    for residue in multi_table:
        random_num_multitable[residue] = {}
        # resets the value to a lower bound of 1 each time a new residue is assessed
        value = 1
        for codon in multi_table[residue]:
            random_num_multitable[residue][codon] = [value]
            # sets the upper bound of the random number to the lower bound + the codon preference * 100000
            # that upper bound becomes the lower bound for the next codon that encodes for that amino acid
            value += (multi_table[residue][codon] * 100000000)
            random_num_multitable[residue][codon].append(value)
    return random_num_multitable


def convert_DNA_to_protein(query):
    """
    translates a DNA query to its peptide sequence
    :param query: fasta-formatted DNA sequence string
    :return: fasta-formatted peptide sequence string
    """
    # dictionary with the key being the codon and amino acid as the value
    conversion_table = {'GCT': 'A', 'GCC': 'A', 'GCA': 'A', 'GCG': 'A',
                        'CGT': 'R', 'CGC': 'R', 'CGA': 'R', 'CGG': 'R', 'AGA': 'R', 'AGG': 'R',
                        'AAT': 'N', 'AAC': 'N',
                        'GAT': 'D', 'GAC': "D",
                        'TGT': 'C', 'TGC': 'C',
                        'CAA': 'Q', 'CAG': 'Q',
                        'GAA': 'E', 'GAG': 'E',
                        'GGT': 'G', 'GGC': 'G', 'GGA': 'G', 'GGG': 'G',
                        'CAT': 'H', 'CAC': 'H',
                        'ATT': 'I', 'ATC': 'I', 'ATA': 'I',
                        'TTA': 'L', 'TTG': 'L', 'CTT': 'L', 'CTC': 'L', 'CTA': 'L', 'CTG': 'L',
                        'AAA': 'K', 'AAG': 'K',
                        'ATG': 'M',
                        'TTT': 'F', 'TTC': 'F',
                        'CCT': 'P', 'CCC': 'P', 'CCA': 'P', 'CCG': 'P',
                        'TCT': 'S', 'TCC': 'S', 'TCA': 'S', 'TCG': 'S', 'AGT': 'S', 'AGC': 'S',
                        'ACT': 'T', 'ACC': 'T', 'ACA': 'T', 'ACG': 'T',
                        'TGG': 'W',
                        'TAT': 'Y', 'TAC': 'Y',
                        'GTT': 'V', 'GTC': 'V', 'GTA': 'V', 'GTG': 'V',
                        'TAA': "!", 'TAG': "!", 'TGA': "!"}
    # ensures proper length of DNA query
    if len(query) % 3 != 0:
        print("Invalid entry. Query length should be divisible by 3.")
        exit()
    # initializes variables for the protein query and the base position
    protein_query = ""
    position = 0
    # iterates through each base in the DNA query
    stop_pos = 0
    for base in query:
        position += 1
        # ensures no invalid characters were entered as a DNA-nucleotide base
        if base not in "ATCG":
            print("Invalid base {} entered at position {}. Please fix and try again.".format(base, position))
            exit()
        else:
            # finds the end of each codon
            if position % 3 == 0:
                # defines the most recent codon
                query_codon = query[position - 3: position]
                # finds the amino acid encoded by that codon by looping through the conversion_table
                for codon in conversion_table:
                    if codon == query_codon:
                        # if a stop codon was included, informs the user of the location and the peptide length
                        # and stops adding to the peptide sequence
                        if conversion_table[codon] == "!":
                            #print("Stop codon found at nucleotide position {}."
                                  #" Protein query {} residues long.".format(position, len(protein_query)))
                            stop_pos = position
                            break
                        # adds the proper amino acid to the protein_query
                        else:
                            protein_query += conversion_table[codon]
    return protein_query,stop_pos


def validate_query(query, DNA):
    """
    checks to make sure a proper fasta-formatted sequence was entered and peptide sequence is utilizes
    :param query: the fasta-formatted DNA or peptide query
    :param DNA: True is a DNA query is entered, False if protein query
    :return: the validated protein query after removing potential faulty characters
    """
    # removes any newline, carriage returns, tabs, or spaces
    query = query.replace("\t", "")
    query = query.replace("\r", "")
    query = query.replace("\n", "")
    query = query.replace(" ", "")
    # ensures upper case letters are used
    query = query.upper()
    stop_pos = 0
    # converts the DNA query to a protein query if DNA query was entered
    if DNA:
        query,stop_pos = convert_DNA_to_protein(query)
    else:
        # if a protein query was entered, ensures no invalid characters were entered
        position = 0
        for residue in query:
            position += 1
            if residue not in "DTSEPGACVMILYFHKRWQN":
                print("Invalid residue {} entered at position {}. Please fix and try again.".format(residue, position))
                exit()
    return query,stop_pos


def optimize_sequence(random_num_table, query):
    """
    takes the current iteration of the multi-species optimized codon preference table and uses it with a weighted
    codon-randomization method to convert a fasta-formatted protein sequence to an optimized DNA sequence
    :param random_num_table: a 2-layered nested dictionary. The outermost layer uses the one-letter abbreviation of a
    residue as the key, and the value is a dictionary. In this dictionary, the codons that encode that residue are the
    key, and the value is a list of two numbers with a range proportional to codon preference, with each codon's values
    being non-overlapping
    :param query: a fasta=formatted protein sequence of the gene to be optimized
    :return:
    """
    # initialize the DNA sequence
    optimmized_query = ""
    # loops through the query and generates a random integer between 1 and 100000 for each residue in query
    for residue in query:
        value = random.randint(1, 100000001)
        # compares random number to the random number bounds for that codon
        # adds the appropriate DNA codon (based on the random number) to the optimized query
        for codon in random_num_table[residue]:
            if random_num_table[residue][codon][0] <= value < random_num_table[residue][codon][1]:
                optimmized_query += codon
    # generates a random integer between 1 and 100000 and compares it to the random number bounds for the stop codons
    # adds the selected stop codon to the optimized DNA sequence
    value = random.randint(1, 100000001)
    for codon in random_num_table['Stop']:
        if random_num_table['Stop'][codon][0] <= value < random_num_table['Stop'][codon][1]:
            optimmized_query += codon
    return optimmized_query


def get_rca_xyz(codon_counts, parameter=2.5):
    """
    a function for determining the rca_xyz value of each codon for each species where
        rca_xyz(xyz) = f(xyz)/f1(x)f2(y)f3(z)
        where f(xyz) is the normalized codon frequency, and f1(x) is the normalized frequency of base x at the first
        position in a codon
    :param codon_counts: a three-layer nested dictionary. The outermost layer uses species' ID as the key. The value is
    dictionary, where the keys are the one-letter abbreviations for amino acids. Those values are another dictionary,
    where the keys are the codons that encode for that amino acid. The value of the codon keys is the total counts for
    that codon
    :param parameter: to use Dirichlet priors to improve accuracy of frequency values, both codon frequency and
    base positional frequency will be raised to the power of this parameter -1 and then renormalized to sum to 1
    :return: a two-layer nested dictionary. The outermost layer uses species' ID as the key, and the value is a
    dictionary in which the key is a codon, and the value is the rca_xyz value for that codon for that species
    """
    # initailizes a dictionary that will hold the sum of all codons counted for each species
    count_sum = {}
    # initializes the dictionary that will store codon frequency for each species
    frequency = {}
    # initializes the rca_xyz dictionary, which will later be returned
    rca_xyz = {}
    # initializes a tbree-layered nested dictionary internal to the function that will hold information on the
    # frequency of each base at each codon position
    base_position = {}
    # loops through the codon_counts dictionary to create a dictionary of the total number of codons counted per species
    for species in codon_counts:
        count_sum[species] = 0
        for residue in codon_counts[species]:
            for codon in codon_counts[species][residue]:
                count_sum[species] += codon_counts[species][residue][codon]
    # loops through the codon_count dictionary to obtain information on normalized codon frequency and begin
    # construction of the base_position dictionary
    for species in codon_counts:
        # initializes the variable that will get the sum of the codon frequencies after raising them to the prior
        # parameter
        adjusted_frequency_sum = 0
        # initializes the two-layered nested dictionary as the value for rca_xyz[species]
        rca_xyz[species] = {}
        frequency[species] = {}
        # initializes the base_position dictionary for each species
        # each base has its own dictionary for each species, and that dictionary has a key and value for counts at
        # each position of the codon, which are all initialized to 0 counts
        base_position[species] = {"A": {1: 0, 2: 0, 3: 0}, "T": {1: 0, 2: 0, 3: 0}, "C": {1: 0, 2: 0, 3: 0},
                                  "G": {1: 0, 2: 0, 3: 0}}
        # loops through the codon_counts dictionary
        for residue in codon_counts[species]:
            for codon in codon_counts[species][residue]:
                # initializes the base position to "1" at the start of each codon
                i = 1
                # calculates the codon
                frequency[species][codon] = (codon_counts[species][residue][codon] / count_sum[species]) ** (
                            parameter - 1)
                # adds to the total sum of all codon frequences
                adjusted_frequency_sum += frequency[species][codon]
                # loops through the codon string to determine which base occurs at which position
                # updates the base_position dictionary to add the codon counts to all 3 of the appropriate bases
                # and positions
                for base in codon:
                    base_position[species][base][i] += codon_counts[species][residue][codon]
                    i += 1
        # divides the adjusted frequency values by the sum of all the freqnecy values
        for codon in frequency[species]:
            frequency[species][codon] /= adjusted_frequency_sum
    # converts the base_position dictionary from counts to frequency
    for species in base_position:
        # a dictionary that uses codon position as an index for the sum of the preferences of codons at that position
        base_sum = {1: 0, 2: 0, 3: 0}
        for base in base_position[species]:
            for i in base_position[species][base]:
                base_position[species][base][i] /= count_sum[species]
                # raises to prior parameter
                base_position[species][base][i] **= (parameter - 1)
                # adds to total of base_position frequencies
                base_sum[i] += base_position[species][base][i]
        # loops through the base position dictionary to divide base position frequency by sum of frequencies at
        # that position
        for base in base_position[species]:
            for i in base_position[species][base]:
                base_position[species][base][i] /= base_sum[i]
    # loops through the rca_xyz dictionary
    for species in frequency:
        for codon in frequency[species]:
            # initializes the pos_frequency (f1(x)f2(y)f3(z)) to 1 at the start of each codon
            pos_frequency = 1
            # initializes the base position to 1 at the start of each codon
            i = 1
            # loops through the codon string to multiply the current pos_frequency by the frequency of the base at
            # each position of the codon
            for base in codon:
                pos_frequency *= base_position[species][base][i]
                i += 1
            # calculates the codon rca_xyz value per species by dividing the numerator by pos_frequency
            rca_xyz[species][codon] = (frequency[species][codon] / pos_frequency)
    return rca_xyz


def calculate_predicted_expression(rca_xyz, optimized_dna):
    """
    calculates the rca (a metric for comparison of predicted gene expression) for each species based on the formula
    rca = ((product over the total # of codons: rca(of codon))^(1/# codons) and uses it to predict protein expression,
    as rca is correlated to the log of protein expression
    :param rca_xyz: a two-layer nested dictionary. The outermost layer uses species' ID as the key, and the value is a
    dictionary in which the key is a codon, and the value is the rca value for that codon for that species
    :param optimized_dna: the DNA sequence after optimizing a query with the current multi-species codon table
    :return: a dictionary with the predicted proportional expression levels based on the RCA value, normalized so that
     the minimum predicted protein level is "1" and the species ID as the key
    """
    # initializes a variable that stores the codon
    codon = ""
    # initializes the rca dictionary
    rca = {}
    for species in rca_xyz:
        # initializes the rca value for each species
        rca[species] = 1
        # loops through the optimizes DNA sequence to find a codon
        for base in optimized_dna:
            codon += base
            if len(codon) == 3:
                # multiplies the rca score by the a value of the codon + 1
                rca[species] *= rca_xyz[species][codon]
                # resets the stored codon
                codon = ""
        # raises the rca value to the power of 1/# of codons
        rca[species] **= (1 / (len(optimized_dna) / 3))
        # subtracts 1 from the rca value to get the final rca value
    # initiates the minimum expression value
    min_exp = 1000000000000000000
    # raises 10 to the power of the RCA, as the RCA is proportional to the log of expression
    for species in rca:
        rca[species] = 10 ** (rca[species])
        # determines the minimum predicted expression value
        if rca[species] < min_exp:
            min_exp = rca[species]
    # adjusts the predicted protein levels so that they are normalized, with "1" being the value of the lowest predicted
    # expression level
    for species in rca:
        rca[species] /= min_exp
    return rca


def get_redundantaa_rn(query):
    """
    Calculates the frequency of occurrences of each amino acid with more than one possible codon and returns in in the
    form of random numbers that will proportionally call for that amino acid
    :param query: the fasta-formatted peptide sequence query
    :return: a table of random numbers that will call for each amino acid in proportion to the amount of times it is
    used, excluding amino acids with only one codon
    """
    # initializes a dictionary of the counts of redundant residues in the query
    aa_frequency = {"A": 0, "R": 0, "N": 0, "D": 0, "C": 0, "Q": 0, "E": 0, "G": 0, "H": 0, "I": 0, "L": 0,
                    "K": 0, "F": 0, "P": 0, "S": 0, "T": 0, "Y": 0, "V": 0, "Stop": 1}
    # initializes a dictionary of the total number of redundant residues
    raa_sum = 1
    # calculates frequency of redundant codons out of all redundant codons
    for residue in query:
        if residue in aa_frequency:
            aa_frequency[residue] += 1
            raa_sum += 1
    for residue in aa_frequency:
        aa_frequency[residue] /= raa_sum
    # initializes a dictionary to store the random numbers that would call that amino acid
    aa_rn = {}
    value = 1
    # calculates the random number range that will call for a certain residue to be altered
    for residue in aa_frequency:
        aa_rn[residue] = [value]
        # sets the upper bound of the random number to the lower bound + the codon preference * 100000
        # that upper bound becomes the lower bound for the next codon that encodes for that amino acid
        value += (aa_frequency[residue] * 100000000)
        aa_rn[residue].append(value)
    return aa_rn


def adjust_table(rca_expression_dif, species_expression, et, aa_rn, query_table, multi_table):
    """
    Adjusts the table in favor of or against species that have a predicted expression different than their target
    expression
    :param query_table: a three-layer nested dictionary. The outermost layer uses species' ID as the key.
    The value is dictionary, where the keys are the one-letter abbreviations for amino acids. Those values are another
    dictionary, where the keys are the codons that encode for that amino acid. The value of the codon keys is the codon
    preference. This is after taking the Dirichlet priors and removing prohibited codons
    :param rca_expression_dif: a dictionary of the target expression of a species minus the predicted expression,
    indexed by the species ID
    :param species_expression: a dictionary of the target expression of a species indexed by the species ID
    :param et: a percentage (expressed as a decimal) and any species which has a difference in expression greater than
    this percent / 1 less than the number of species of the target expression is adjusted
    :param aa_rn: a table of random numbers that will call for each amino acid in proportion to the amount of times it is
    used, excluding amino acids with only one codon
    :param multi_table: a two-layered nested dictionary. The outermost layer uses the one-letter abbreviation of a
    residue as the key, and the value is a dictionary. In this dictionary, the codons that encode that residue are the
    key, and the value is the codon preference after obtaining the species-based weighted-average. These values will
    be adjusted as the table is iterated upon
    :return: an updated version of the multi_table -  two-layered nested dictionary. The outermost layer uses the
    one-letter abbreviation of a residue as the key, and the value is a dictionary. In this dictionary, the codons that
    encode that residue are the key, and the value is the codon preference after adjusting for species over- or under-
    performing.
    """
    for species in rca_expression_dif:
        # when current table is performing worse than the current best table, adjusts the multi_table
        # codon preferences in favor of species which currently has an expression difference greater than
        # an expression threshold - percent of target expression
        if abs(rca_expression_dif[species]) > et * species_expression[species]:
            aa_adjusted = 0
            cf = (rca_expression_dif[species] / 10)
            # randomly selects 6 redundant residues to adjust the preference towards based on their abundance
            # in the query
            while aa_adjusted < 10:
                aa_adjusted += 1
                v = random.randint(1, 100000001)
                for residue in aa_rn:
                    new_sum = 0
                    if aa_rn[residue][0] <= v < aa_rn[residue][1]:
                        # readjusts the multi_table by adding or subtracting (depending on if under or
                        # overexpressing) calculates 10% of the expression difference between the target and
                        # predicted uses that as a weight to reaverage the current multi_table with that
                        # species personal table
                        for codon in multi_table[residue]:
                            multi_table[residue][codon] = multi_table[residue][codon] + \
                                                          (query_table[species][residue][codon] * cf)
                            new_sum += multi_table[residue][codon]
                        for codon in multi_table[residue]:
                            multi_table[residue][codon] /= new_sum
    return multi_table


def optimize_multitable_sd(multi_table, query, query_table, rca_xyz, species_expression, et=0.05, iterations=1000):
    """
    iterates upon the multi_table while optimizing the query to select the best-optimized DNA sequence using a sum of
    squares of differences based method
    :param multi_table: a two-layered nested dictionary. The outermost layer uses the one-letter abbreviation of a
    residue as the key, and the value is a dictionary. In this dictionary, the codons that encode that residue are the
    key, and the value is the codon preference after obtaining the species-based weighted-average. These values will
    be adjusted as the table is iterated upon
    :param query: the fasta-formatted protein query to be optimized
    :param query_table: a three-layer nested dictionary. The outermost layer uses species' ID as the key.
    The value is dictionary, where the keys are the one-letter abbreviations for amino acids. Those values are another
    dictionary, where the keys are the codons that encode for that amino acid. The value of the codon keys is the codon
    preference. This is after taking the Dirichlet priors and removing prohibited codons
    :param rca_xyz: a two-layer nested dictionary. The outermost layer uses species' ID as the key, and the value is a
    dictionary in which the key is a codon, and the value is the rca value for that codon for that species
    :param species_expression: a dictionary in which the index is the species ID and the value is the relative
    expression level of that species
    :param et: a percentage (expressed as a decimal) and any species which has a difference in expression greater than
    this percent / 1 less than the number of species of the target expression is adjusted
    :param iterations: number of times to iterate upon that sequence, default set to 1
    :return: a tuple of the best-optimized sequence and the value of the sum of the squares of the difference between
    target and predicted expression
    """
    # initializes the number of iterations
    it = 0
    # calls to get the random number table for the 0th iteration multitable (average table)
    rn = get_multitable_randomnumbers(multi_table)
    aa_rn = get_redundantaa_rn(query)
    while it < iterations:
        it += 1
        # initializes the value of the sum of the squares of the differences between target and predicted expression
        # levels
        square_diff = 0
        # calls to optimmize the query sequence
        optimized_seq = optimize_sequence(rn, query)
        # calculates the rca measure of relative expression for each species
        rca = calculate_predicted_expression(rca_xyz, optimized_seq)
        # initializes a dictionary to store the difference in species expression
        rca_expression_dif = {}
        # for each species, adds the difference of expression to the dictionary of expression differences
        for species in rca:
            rca_expression_dif[species] = species_expression[species] - rca[species]
            # adds the sum of the square of the difference to the sum_square_diff
            square_diff += (rca_expression_dif[species] ** 2)
            # initializes the minimum of the sum of square of differences and the best optimized sequence during the
            # first iteration
            if it == 1:
                min_square_dif = square_diff
                best_optimized = optimized_seq
                best_expression = rca[species]
        # compares to see if current table is preforming worse than previous
        if square_diff > min_square_dif:
            multi_table = adjust_table(rca_expression_dif, species_expression, et, aa_rn, query_table, multi_table)
            # gets a new random number table for the new table
            rn = get_multitable_randomnumbers(multi_table)
        # if species has the minimum square difference, updates the parameters for the best optimized and minimum
        # square difference
        else:
            min_square_dif = square_diff
            best_optimized = optimized_seq
            best_expression = rca.copy()
    return best_optimized, min_square_dif, best_expression


def optimize_multitable_ad(multi_table, query, query_table, rca_xyz, species_expression, et=0, iterations=1000):
    """
    iterates upon the multi_table while optimizing the query to select the best-optimized DNA sequence using an
    absolute-difference based method
    :param multi_table: a two-layered nested dictionary. The outermost layer uses the one-letter abbreviation of a
    residue as the key, and the value is a dictionary. In this dictionary, the codons that encode that residue are the
    key, and the value is the codon preference after obtaining the species-based weighted-average. These values will
    be adjusted as the table is iterated upon
    :param query: the fasta-formatted protein query to be optimized
    :param query_table: a three-layer nested dictionary. The outermost layer uses species' ID as the key.
    The value is dictionary, where the keys are the one-letter abbreviations for amino acids. Those values are another
    dictionary, where the keys are the codons that encode for that amino acid. The value of the codon keys is the codon
    preference. This is after taking the Dirichlet priors and removing prohibited codons
    :param rca_xyz: a two-layer nested dictionary. The outermost layer uses species' ID as the key, and the value is a
    dictionary in which the key is a codon, and the value is the rca value for that codon for that species
    :param species_expression: a dictionary in which the index is the species ID and the value is the relative
    expression level of that species
    :param et: a percentage (expressed as a decimal) and any species which has a difference in expression greater than
    this percent / 1 less than the number of species of the target expression is adjusted
    :param iterations: number of times to iterate upon that sequence, default set to 1
    :return: a tuple of the best-optimized sequence and the value of the sum of the absolute values of the difference between
    target and predicted expression
    """
    # initializes the number of iterations
    it = 0
    # calls to get the random number table for the 0th iteration multitable (average table)
    rn = get_multitable_randomnumbers(multi_table)
    aa_rn = get_redundantaa_rn(query)
    while it < iterations:
        it += 1
        # initializes the value of the sum of the absolute values of the differences between target and predicted expression
        # levels
        abs_diff = 0
        # calls to optimmize the query sequence
        optimized_seq = optimize_sequence(rn, query)
        # calculates the rca measure of relative expression for each species
        rca = calculate_predicted_expression(rca_xyz, optimized_seq)
        # initializes a dictionary to store the difference in species expression
        rca_expression_dif = {}
        # for each species, adds the difference of expression to the dictionary of expression differences
        for species in rca:
            rca_expression_dif[species] = species_expression[species] - rca[species]
            # adds the sum of the absolute of the difference to the sum_abs_diff
            abs_diff += abs(rca_expression_dif[species])
            # initializes the minimum of the sum of absolute values of differences and the best optimized sequence
            # during the first iteration
            if it == 1:
                min_abs_dif = abs_diff
                best_optimized = optimized_seq
                best_expression = rca[species]
        # compares to see if current table is preforming worse than previous
        if abs_diff > min_abs_dif:
            multi_table = adjust_table(rca_expression_dif, species_expression, et, aa_rn, query_table, multi_table)
            # gets a new random number table for the new table
            rn = get_multitable_randomnumbers(multi_table)
        # if species has the minimum absolute value of difference, updates the parameters for the best optimized and
        # minimum absolute value difference
        else:
            min_abs_dif = abs_diff
            best_optimized = optimized_seq
            best_expression = rca.copy()
    return best_optimized, min_abs_dif, best_expression