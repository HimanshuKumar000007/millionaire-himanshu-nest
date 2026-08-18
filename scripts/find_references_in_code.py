import os
import sys
import glob
import re

sys.stdout.reconfigure(encoding='utf-8')

code_files = glob.glob("lib/**/*.ts", recursive=True) + glob.glob("components/**/*.tsx", recursive=True) + glob.glob("app/**/*.ts", recursive=True) + glob.glob("app/**/*.tsx", recursive=True)

patterns = ["nest-pyq-2018", "nest-pyq-2019", "nest-pyq-2020", "nest-pyq-2021", "2018", "2019", "2020", "2021"]

for f in code_files:
    try:
        with open(f, "r", encoding="utf-8") as file:
            content = file.read()
            for p in ["nest-pyq-2018", "nest-pyq-2019", "nest-pyq-2020", "nest-pyq-2021"]:
                if p in content:
                    print(f"Matched '{p}' in {f}")
    except Exception as e:
        pass
