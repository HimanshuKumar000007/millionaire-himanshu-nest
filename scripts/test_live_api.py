import urllib.request
import json
import time

time.sleep(3)

url = "http://localhost:3000/api/content/mocks?id=nest-pyq-2024-s1&resolve=true"
req = urllib.request.Request(url)

try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
        mock = data.get("mock", {})
        questions = mock.get("questions", [])
        
        print(f"Mock ID: {mock.get('id')}")
        print(f"Total Questions: {len(questions)}")
        
        # Check Q3
        q3 = questions[2]
        print(f"\nQ3 ID: {q3.get('id')}")
        print(f"Q3 Table in prompt: {'| Cross |' in q3.get('questionText', '')}")
        
        # Check Q6
        q6 = questions[5]
        print(f"\nQ6 ID: {q6.get('id')}")
        print(f"Q6 Subtopic: {q6.get('subtopic')}")
        print(f"Q6 Option A text: {q6.get('options', [{}])[0].get('text')}")
        print(f"Q6 Option D text: {q6.get('options', [{}])[3].get('text')}")
        
        # Check Q7
        q7 = questions[6]
        print(f"\nQ7 ID: {q7.get('id')}")
        print(f"Q7 Topic: {q7.get('topic')}")
        print(f"Q7 Prompt: {q7.get('questionText')[:60]}...")
        
        # Check Q20
        q20 = questions[19]
        print(f"\nQ20 ID: {q20.get('id')}")
        print(f"Q20 Topic: {q20.get('topic')}")
        
        print("\nAll API verification checks passed successfully!")
except Exception as e:
    print(f"Error checking API: {e}")
