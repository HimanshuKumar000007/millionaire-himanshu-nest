import urllib.request
import json

url = "http://localhost:3000/api/content/mocks"
req = urllib.request.Request(url)

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    mocks = data.get("mocks", [])
    print(f"Total available mocks in API: {len(mocks)}")
    for m in mocks:
        print(f"  [{m.get('exam')}] {m.get('id'):20} | {m.get('title')}")
