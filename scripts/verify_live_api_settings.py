import urllib.request
import json

url = "http://localhost:3000/api/content/mocks?id=nest-pyq-2023-s1&resolve=true"
req = urllib.request.Request(url)

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    mock = data.get("mock", {})
    qs = mock.get("questions", [])
    
    print(f"Title: {mock.get('title')}")
    print(f"Duration: {mock.get('durationMinutes')} minutes (3 hours)")
    print(f"Total Marks: {mock.get('totalMarks')}")
    print(f"Evaluation Marks: {mock.get('evalMarks')}")
    print(f"Instructions: {mock.get('instructions')}")
    
    q1 = qs[0]
    print(f"\nQ1 Type: {q1.get('questionType')} | Marks: +{q1.get('marks')} | Negative: -{q1.get('negativeMarks')}")
    
    q15 = qs[14]
    print(f"Q15 Type: {q15.get('questionType')} | Marks: +{q15.get('marks')} | Negative: -{q15.get('negativeMarks')}")
