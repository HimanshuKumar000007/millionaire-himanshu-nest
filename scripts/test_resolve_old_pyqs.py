import urllib.request
import json

papers = ["nest-pyq-2018", "nest-pyq-2019-s1", "nest-pyq-2020-s1", "nest-pyq-2020-s2"]

for p in papers:
    url = f"http://localhost:3000/api/content/mocks?id={p}&resolve=true"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        mock = data.get("mock", {})
        qs = mock.get("questions", [])
        print(f"Verified {p}: {mock.get('title')} -> {len(qs)} questions, duration {mock.get('durationMinutes')} mins, eval {mock.get('evalMarks')}M")
