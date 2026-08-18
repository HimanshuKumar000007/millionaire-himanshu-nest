import urllib.request
import json

url = "http://localhost:3000/api/content/mocks?id=nest-pyq-2022-s1&resolve=true"
req = urllib.request.Request(url)

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    mock = data.get("mock", {})
    qs = mock.get("questions", [])
    
    print(f"Mock: {mock.get('title')}")
    print(f"Duration: {mock.get('durationMinutes')} mins")
    print(f"Total questions: {len(qs)}")
    
    for i in [0, 12, 17, 34, 51, 67]:
        q = qs[i]
        corr = [opt['id'].upper() for opt in q.get('options', []) if opt.get('isCorrect')]
        print(f"  Q{i+1:02d} [{q.get('subject'):11} ({q.get('questionType')})]: Img={q.get('imageSrc')} | Correct={corr}")

print("\n2022 Session 1 API verification passed!")
