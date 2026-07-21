import bs4
with open('index.html', 'r', encoding='utf-8') as f:
    soup = bs4.BeautifulSoup(f.read(), 'html.parser')
for section in soup.find_all('section'):
    id = section.get('id')
    container = section.find('div', class_='container')
    if container:
        content_divs = [c for c in container.find_all(recursive=False) if c.name == 'div' and 'section-header' not in c.get('class', [])]
        print(f'Section: {id}, Content divs inside container: {len(content_divs)}')
        for div in content_divs:
            print(f'  - Class: {div.get("class")}')
            print(f'  - Tags inside: {len(div.find_all())}')
