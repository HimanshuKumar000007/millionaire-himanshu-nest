import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

mocks_to_delete = [
    "content/nest/mocks/nest/nest-pyq-2018.json",
    "content/nest/mocks/nest/nest-pyq-2019-s1.json",
    "content/nest/mocks/nest/nest-pyq-2020-s1.json",
    "content/nest/mocks/nest/nest-pyq-2020-s2.json",
]

for m in mocks_to_delete:
    if os.path.exists(m):
        os.remove(m)
        print(f"Removed {m}")
    else:
        print(f"File not found: {m}")

print("Deleted all 2018-2021 mock files from content/nest/mocks/nest/!")
