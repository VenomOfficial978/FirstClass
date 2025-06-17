function showTab(tabName) {
  const sections = ['home', 'anime', 'manga'];
  sections.forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
  document.getElementById(tabName).classList.remove('hidden');

  // Optional: highlight active button
  document.querySelectorAll('.bottom-nav button').forEach(btn => btn.classList.remove('active-tab'));
  const btnMap = { anime: 0, home: 1, manga: 2 };
  document.querySelectorAll('.bottom-nav button')[btnMap[tabName]].classList.add('active-tab');
}

function openCategoryTab(tabId) {
  document.getElementById('animeLibrary').classList.add('hidden');
  document.getElementById('mangaLibrary').classList.add('hidden');
  document.getElementById(tabId).classList.remove('hidden');
}

function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  alert(`Theme changed to ${isDark ? 'Dark' : 'Light'}`);
}

document.addEventListener('DOMContentLoaded', () => {
  showTab('home');
});
