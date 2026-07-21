import urllib.request, re

try:
    with urllib.request.urlopen('https://quantamcorestudio.github.io/quantam-core-website/') as response:
        html = response.read().decode('utf-8')
    items = re.findall(r'<div class="portfolio-item"[^>]*data-title="(.*?)"[^>]*data-desc="(.*?)"', html, re.IGNORECASE)
    for title, desc in items:
        print(f'Title: {title}')
        print(f'Desc: {desc}')
        print('---')
except Exception as e:
    print(e)
