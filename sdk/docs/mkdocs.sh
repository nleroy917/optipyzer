#!/bin/sh

# This script is used to build the documentation for opyipyzer

pandoc \
  --from=markdown \
  --to=rst \
  --output=source/index.rst \
  md/index.md