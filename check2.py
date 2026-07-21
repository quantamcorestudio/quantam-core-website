import re
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()
match = re.search(r'<div class="projects-grid">(.|\n)*', text)
if match:
    print(match.group(0)[:800])
