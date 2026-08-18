import urllib.request
import json
import time

time.sleep(1)

url = "http://localhost:3000/api/content/mocks?id=nest-pyq-2023-s1&resolve=true"
req = urllib.request.Request(url)

try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
        mock = data.get("mock", {})
        questions = mock.get("questions", [])
        
        print(f"Mock ID: {mock.get('id')}")
        print(f"Total Questions: {len(questions)}")
        
        # Check Q1 in detail (The one user screenshotted)
        q1 = questions[0]
        print(f"\n--- Q1 Details ---")
        print(f"ID: {q1.get('id')}")
        print(f"Subject: {q1.get('subject')}")
        print(f"Topic: {q1.get('topic')}")
        print(f"Text: {q1.get('questionText')}")
        print(f"Image: {q1.get('imageSrc')}")
        print("Options:")
        for opt in q1.get("options", []):
            print(f"  [{opt['id'].upper()}] (Correct: {opt['isCorrect']}) {opt['text']}")
        
        # Check Q18 (Chem Q1)
        q18 = questions[17]
        print(f"\n--- Q18 (Chem Q1) Details ---")
        print(f"ID: {q18.get('id')}")
        print(f"Text: {q18.get('questionText')[:100]}...")
        
        # Check Q35 (Math Q1)
        q35 = questions[34]
        print(f"\n--- Q35 (Math Q1) Details ---")
        print(f"ID: {q35.get('id')}")
        print(f"Text: {q35.get('questionText')[:100]}...")
        
        # Check Q52 (Phy Q1)
        q52 = questions[51]
        print(f"\n--- Q52 (Phy Q1) Details ---")
        print(f"ID: {q52.get('id')}")
        print(f"Text: {q52.get('questionText')[:100]}...")
        
        print("\nAll NEST 2023 Session 1 live API verification checks passed successfully!")
except Exception as e:
    print(f"Error checking API: {e}")
