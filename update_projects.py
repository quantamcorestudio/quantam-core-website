import bs4
import urllib.request
import re

try:
    with urllib.request.urlopen('https://quantamcorestudio.github.io/quantam-core-website/') as response:
        html = response.read().decode('utf-8')
    items = re.findall(r'<div class="portfolio-item"[^>]*data-title="(.*?)"[^>]*data-desc="(.*?)"[^>]*data-logo="(.*?)"', html, re.IGNORECASE)
except Exception as e:
    print("Error fetching:", e)
    items = []

with open('index.html', 'r', encoding='utf-8') as f:
    soup = bs4.BeautifulSoup(f.read(), 'html.parser')

projects_grid = soup.find('div', class_='projects-grid')
if projects_grid:
    projects_grid.clear()
    for title, desc, logo in items:
        # Build the HTML for each project
        card = bs4.BeautifulSoup(f'''
          <div class="glass-card project-card reveal active">
            <div class="project-thumb-box">
              <img src="https://quantamcorestudio.github.io/quantam-core-website/{logo}" alt="{title}" class="project-thumb-img">
              <span class="project-category-badge">Quantum Core Game</span>
            </div>
            <div class="project-body">
              <h3 class="project-title">{title}</h3>
              <p class="project-desc">{desc}</p>
              <a href="https://quantamcorestudio.github.io/quantam-core-website/" target="_blank" rel="noopener" class="project-link-btn">
                Learn More <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        ''', 'html.parser')
        projects_grid.append(card)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Projects updated.")
