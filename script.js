// Show bottom tab (Home / Anime / Manga)
function showTab(tabName) {
  const sections = ['home', 'anime', 'manga'];
  sections.forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });

  // Also hide top tabs when bottom ones are shown
  document.getElementById('anime-categories').classList.add('hidden');
  document.getElementById('manga-categories').classList.add('hidden');

  document.getElementById(tabName).classList.remove('hidden');

  // Highlight active bottom nav
  document.querySelectorAll('.bottom-nav button').forEach(btn => btn.classList.remove('active-tab'));
  const index = { anime: 1, home: 0, manga: 2 };
  document.querySelectorAll('.bottom-nav button')[index[tabName]]?.classList.add('active-tab');
}

// Show Anime Categories section (from top tab)
function showAnimeCategories() {
  hideAllMainSections();
  document.getElementById('anime-categories').classList.remove('hidden');
}

// Show Manga Categories section (from top tab)
function showMangaCategories() {
  hideAllMainSections();
  document.getElementById('manga-categories').classList.remove('hidden');
}

// Hide all content sections
function hideAllMainSections() {
  ['home', 'anime', 'manga', 'anime-categories', 'manga-categories'].forEach(id => {
    document.getElementById(id)?.classList.add('hidden');
  });
}

// Toggle Settings
function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  panel.classList.toggle('hidden');
}

// Theme Toggle Placeholder
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  alert(`Theme changed to ${isDark ? 'Dark' : 'Light'} (not fully implemented yet)`);
}

// Style active tab
const style = document.createElement('style');
style.innerHTML = `
  .active-tab {
    background: #4fd1c5 !important;
    color: #000 !important;
    border-color: #4fd1c5 !important;
    box-shadow: 0 0 10px #4fd1c599;
  }
`;
document.head.appendChild(style);

// Show Home by default
document.addEventListener('DOMContentLoaded', () => {
  showTab('home');
});
