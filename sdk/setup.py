import setuptools
from optipyzer.const import VERSION

# create long desc.
with open("README.md", "r") as fh:
    long_description = fh.read()

# get requirements
requirements = []
with open('requirements.txt') as f:
    requirements = f.read().splitlines()

setuptools.setup(
    name='optipyzer',
    version=VERSION,
    description='Codon optimize DNA and Protein sequences for multiple species.',
    long_description=long_description,
    long_description_content_type='text/markdown',
    license="Apache 2.0",
    author='Nathan LeRoy',
    author_email='NLeRoy917@gmail.com',
    url='https://github.com/NLeRoy917/optipyzer',
    keywords='codon optimization dna protein biology bioinformatics',
    packages=setuptools.find_packages(),
    install_requires=requirements,
    classifiers=[
        'Topic :: Software Development :: Libraries',
        'Operating System :: OS Independent',
        'License :: OSI Approved :: Apache Software License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
    ]
)