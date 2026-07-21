import urllib.request
import re

try:
    with urllib.request.urlopen('https://quantamcorestudio.github.io/quantam-core-website/') as response:
        html = response.read().decode('utf-8')
    items = re.findall(r'<div class="portfolio-item"[^>]*data-title="(.*?)"[^>]*data-desc="(.*?)"[^>]*data-logo="(.*?)"', html, re.IGNORECASE)
except Exception as e:
    print('Error fetching:', e)
    items = []

with open('index.html', 'r', encoding='utf-8') as f:
    idx_html = f.read()

new_projects = '\n'
for title, desc, logo in items:
    new_projects += f'''          <div class="glass-card project-card reveal active">
            <div class="project-thumb-box">
              <img src="https://quantamcorestudio.github.io/quantam-core-website/{logo.replace(' ', '%20')}" alt="{title}" class="project-thumb-img">
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
'''

new_idx = re.sub(r'<div class="projects-grid">.*?</div>', f'<div class="projects-grid">{new_projects}        </div>', idx_html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_idx)
print('Replaced projects grid successfully.')
