import os

mocks = [
    "content/nest/mocks/nest/nest-full-mock-001.json",
    "content/nest/mocks/nest/nest-full-mock-002.json",
    "content/nest/mocks/nest/nest-full-mock-003.json",
    "content/nest/mocks/nest/nest-full-mock-004.json",
]

for m in mocks:
    if os.path.exists(m):
        os.remove(m)
        print(f"Removed {m}")
    else:
        print(f"File not found: {m}")
