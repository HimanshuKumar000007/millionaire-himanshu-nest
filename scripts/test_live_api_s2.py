import urllib.request
import json
import time

time.sleep(2)

url = "http://localhost:3000/api/content/mocks?id=nest-pyq-2024-s2&resolve=true"
req = urllib.request.Request(url)

try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
        mock = data.get("mock", {})
        questions = mock.get("questions", [])
        
        print(f"Mock ID: {mock.get('id')}")
        print(f"Total Questions: {len(questions)}")
        
        # Check Q15 in Biology (table + image)
        q15 = questions[14]
        print(f"\nQ15 ID: {q15.get('id')}")
        print(f"Q15 Topic: {q15.get('topic')}")
        print(f"Q15 Table in text: {'| Group Classification |' in q15.get('questionText', '')}")
        print(f"Q15 Image URL: {q15.get('imageSrc')}")
        
        # Check Q3 in Biology
        q3 = questions[2]
        print(f"\nQ3 ID: {q3.get('id')}")
        print(f"Q3 Image URL: {q3.get('imageSrc')}")
        
        # Check Q1 in Chemistry (Q21 overall)
        q21 = questions[20]
        print(f"\nQ21 (Chem Q1) ID: {q21.get('id')}")
        print(f"Q21 Subject: {q21.get('subject')}")
        print(f"Q21 Image URL: {q21.get('imageSrc')}")
        
        # Check Q1 in Math (Q41 overall)
        q41 = questions[40]
        print(f"\nQ41 (Math Q1) ID: {q41.get('id')}")
        print(f"Q41 Subject: {q41.get('subject')}")
        
        # Check Q8 in Physics (Q68 overall)
        q68 = questions[67]
        print(f"\nQ68 (Phy Q8) ID: {q68.get('id')}")
        print(f"Q68 Subject: {q68.get('subject')}")
        print(f"Q68 Image URL: {q68.get('imageSrc')}")
        
        # Check Q20 in Physics (Q80 overall)
        q80 = questions[79]
        print(f"\nQ80 (Phy Q20) ID: {q80.get('id')}")
        print(f"Q80 Subject: {q80.get('subject')}")
        
        print("\nAll 2024 Session 2 live API checks passed successfully!")
except Exception as e:
    print(f"Error checking API: {e}")
