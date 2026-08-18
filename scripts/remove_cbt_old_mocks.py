import os

mocks_to_remove = [
    "content/nest/mocks/nest/nest-pyq-2018.json",
    "content/nest/mocks/nest/nest-pyq-2019-s1.json",
    "content/nest/mocks/nest/nest-pyq-2020-s1.json",
    "content/nest/mocks/nest/nest-pyq-2020-s2.json",
]

for m in mocks_to_remove:
    if os.path.exists(m):
        os.remove(m)
        print(f"Removed {m} from CBT mock list")
