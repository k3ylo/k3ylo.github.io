document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('setup-container');
  if (!container || typeof setupData === 'undefined') return;

  const formattedDate = setupData.lastUpdated ? setupData.lastUpdated.split('-').reverse().join('.') : 'unknown';

  let sectionsHtml = '';
  setupData.sections.forEach(section => {
    let itemsHtml = '';
    section.items.forEach(item => {
      itemsHtml += `<li>${item}</li>`;
    });
    sectionsHtml += `
      <div class="setup-section">
        <h3 class="setup-section-title">${section.name}</h3>
        <ul class="setup-list">${itemsHtml}</ul>
      </div>
    `;
  });

  const setupHtml = `
    <div class="site-setup">
      <h2 class="setup-title">${setupData.title}</h2>
      <div class="setup-grid">${sectionsHtml}</div>
      <div class="setup-updated">⚙️ last updated: ${formattedDate}</div>
    </div>
  `;
  container.innerHTML = setupHtml;
});
