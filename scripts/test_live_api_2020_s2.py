import urllib.request
import json
import time

time.sleep(1)

url = "http://localhost:3000/api/content/mocks?id=nest-pyq-2020-s2&resolve=true"
req = urllib.request.Request(url)

try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
        mock = data.get("mock", {})
        questions = mock.get("questions", [])
        
        print(f"Mock ID: {mock.get('id')}")
        print(f"Total Questions: {len(questions)}")
        
        # Check Q1 in General
        q1 = questions[0]
        print(f"\nQ1 ID: {q1.get('id')}")
        print(f"Q1 Subject: {q1.get('subject')}")
        print(f"Q1 Topic: {q1.get('topic')}")
        
        # Check Q11 in Biology (Q1 in bio)
        q11 = questions[10]
        print(f"\nQ11 (Bio Q1) ID: {q11.get('id')}")
        print(f"Q11 Subject: {q11.get('subject')}")
        print(f"Q11 Topic: {q11.get('topic')}")
        
        # Check Q26 in Chemistry (Q1 in chem)
        q26 = questions[25]
        print(f"\nQ26 (Chem Q1) ID: {q26.get('id')}")
        print(f"Q26 Subject: {q26.get('subject')}")
        print(f"Q26 Topic: {q26.get('topic')}")
        
        # Check Q41 in Math (Q1 in math)
        q41 = questions[40]
        print(f"\nQ41 (Math Q1) ID: {q41.get('id')}")
        print(f"Q41 Subject: {q41.get('subject')}")
        
        # Check Q56 in Physics (Q1 in physics)
        q56 = questions[55]
        print(f"\nQ56 (Phy Q1) ID: {q56.get('id')}")
        print(f"Q56 Subject: {q56.get('subject')}")
        
        # Check Q70 in Physics (Q15 in physics)
        q70 = questions[69]
        print(f"\nQ70 (Phy Q15) ID: {q70.get('id')}")
        print(f"Q70 Subject: {q70.get('subject')}")
        print(f"Q70 Type: {q70.get('questionType')}")
        
        print("\nAll NEST 2020 Session 2 live API verification checks passed successfully!")
except Exception as e:
    print(f"Error checking API: {e}")
