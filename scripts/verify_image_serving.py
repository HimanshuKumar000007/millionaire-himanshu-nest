import urllib.request

try:
    url = "http://localhost:3000/images/pyqs/2023_s1/nest_2023_s1_page_2_img_1_2.png"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as resp:
        print(f"Status for local image: {resp.status}, Content-Length: {len(resp.read())} bytes")
        
    url2 = "http://localhost:3000/api/content/mocks?id=nest-pyq-2023-s1&resolve=true"
    with urllib.request.urlopen(url2) as resp2:
        print(f"Status for mock API: {resp2.status}")
except Exception as e:
    print(f"Error: {e}")
