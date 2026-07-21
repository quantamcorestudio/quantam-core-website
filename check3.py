import bs4
with open('index.html', 'r', encoding='utf-8') as f:
    soup = bs4.BeautifulSoup(f.read(), 'html.parser')
projects = soup.find('section', id='projects')
print(projects.prettify()[:1000])
