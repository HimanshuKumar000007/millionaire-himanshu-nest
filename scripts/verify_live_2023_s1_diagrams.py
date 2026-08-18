import urllib.request
import json

url = "http://localhost:3000/api/content/mocks?id=nest-pyq-2023-s1&resolve=true"
req = urllib.request.Request(url)

with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode('utf-8'))
    mock = data.get("mock", {})
    questions = mock.get("questions", [])
    
    print(f"Paper: {mock.get('title')}")
    print(f"Total Questions: {len(questions)}")
    
    diagram_count = 0
    option_diagram_count = 0
    
    for i, q in enumerate(questions):
        has_diagram = q.get("isImageBased") and q.get("imageSrc")
        if has_diagram:
            diagram_count += 1
            print(f"  Q{i+1:02d} [{q.get('subject'):11}]: {q.get('topic')[:30]} -> {q.get('imageSrc')[:65]}...")
        
        for opt in q.get("options", []):
            if "![" in opt.get("text", ""):
                option_diagram_count += 1
                
    print(f"\nSummary:")
    print(f"  - Questions with primary diagrams: {diagram_count}")
    print(f"  - Options with chemical/structure diagrams: {option_diagram_count}")
