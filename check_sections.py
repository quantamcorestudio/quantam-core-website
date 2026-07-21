import re
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

sections = re.findall(r'<section.*?id=[\'"](.*?)[\'"].*?>(.*?)</section>', html, re.DOTALL)
for s_id, content in sections:
    stripped = re.sub(r'<[^>]+>', '', content).strip()
    print(f'Section: {s_id}')
    print(f'Content length: {len(stripped)}')
    print(f'Sample: {stripped[:50]}')
    print('---')
