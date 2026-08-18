import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

# Let's import the full definitions and assemble the final master JSON
import build_2023_s1_full_data as b_data

# Assemble all 68 questions
from generate_2023_s1_full_data import *
