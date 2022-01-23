import logging

# init a logger
_LOGGER = logging.getLogger("optipyzer")
_LOGGER.setLevel(logging.DEBUG)

# generate a console-level logger
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)

# set formatting
formatter = logging.Formatter('%(levelname)s - %(message)s')
ch.setFormatter(formatter)

# add the handler
_LOGGER.addHandler(ch)