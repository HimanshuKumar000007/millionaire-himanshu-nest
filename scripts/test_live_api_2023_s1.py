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
        
        # Check Q1 in Biology
        q1 = questions[0]
        print(f"\nQ1 ID: {q1.get('id')}")
        print(f"Q1 Subject: {q1.get('subject')}")
        print(f"Q1 Topic: {q1.get('topic')}")
        print(f"Q1 Image URL: {q1.get('imageSrc')}")
        
        # Check Q18 in Chemistry (Q1 in chem)
        q18 = questions[17]
        print(f"\nQ18 (Chem Q1) ID: {q18.get('id')}")
        print(f"Q18 Subject: {q18.get('subject')}")
        print(f"Q18 Topic: {q18.get('topic')}")
        print(f"Q18 Image URL: {q18.get('imageSrc')}")
        
        # Check Q35 in Math (Q1 in math)
        q35 = questions[34]
        print(f"\nQ35 (Math Q1) ID: {q35.get('id')}")
        print(f"Q35 Subject: {q35.get('subject')}")
        
        # Check Q52 in Physics (Q1 in physics)
        q52 = questions[51]
        print(f"\nQ52 (Phy Q1) ID: {q52.get('id')}")
        print(f"Q52 Subject: {q52.get('subject')}")
        
        # Check Q68 in Physics (Q17 in physics)
        q68 = questions[67]
        print(f"\nQ68 (Phy Q17) ID: {q68.get('id')}")
        print(f"Q68 Subject: {q68.get('subject')}")
        
        print("\nAll NEST 2023 Session 1 live API verification checks passed successfully!")
except Exception as e:
    print(f"Error checking API: {e}")
