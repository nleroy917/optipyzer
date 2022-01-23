import optipyzer

# initalize API
optipyzer = optipyzer.api(local=True)

# search for e coli
results = optipyzer.search(name='Escherichia Coli')
org1 = results[0]

# search for campylbacter
results = optipyzer.search(name='Campylobacter')
org2 = results[0]

# pull codon usage for those organisms
codon_usage1 = optipyzer.pull_codons(org1)
codon_usage2 = optipyzer.pull_codons(org2)

# optimize a sequence to those organisms, weight campylobascter twice as much
seq = 'ATGGCTACTGCATGCTTAGCATGCATGACT'
optimized = optipyzer.optimize(seq,org_list=[org1,org2],weights=[1,2])
print(optimized.optimized_ad)