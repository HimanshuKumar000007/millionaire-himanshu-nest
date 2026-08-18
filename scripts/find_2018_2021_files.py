import os
import sys
import glob

sys.stdout.reconfigure(encoding='utf-8')

years = ["2018", "2019", "2020", "2021"]

mock_files = []
for y in years:
    mock_files.extend(glob.glob(f"content/nest/mocks/**/*{y}*.json", recursive=True))
    mock_files.extend(glob.glob(f"content/nest/**/pyqs/*{y}*.json", recursive=True))
    mock_files.extend(glob.glob(f"content/nest/jsons/{y}*/**", recursive=True))

print(f"Found {len(set(mock_files))} mock/PYQ files related to 2018-2021:")
for f in sorted(set(mock_files)):
    print(f"  {f}")
