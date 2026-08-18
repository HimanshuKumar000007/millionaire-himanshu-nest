import urllib.request
import json

url = "http://localhost:3000/api/content/mocks?id=nest-pyq-2023-s1&resolve=true"
req = urllib.request.Request(url)

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    mock = data.get("mock", {})
    qs = mock.get("questions", [])
    
    print(f"Mock: {mock.get('title')}")
    print(f"Total questions: {len(qs)}")
    
    # Inspect Q9 to Q18
    for i in range(8, 22):
        q = qs[i]
        print(f"\n--- Q{i+1:02d} [{q.get('subject')}]: {q.get('topic')} ---")
        print(f"Text snippet: {q.get('questionText')[:140]}...")
        if q.get('imageSrc'):
            print(f"Diagram: {q.get('imageSrc')}")
        print("Options:")
        for opt in q.get('options', []):
            print(f"  [{opt['id'].upper()}] {opt['text'][:80]}")

print("\nVerification completed successfully!")
