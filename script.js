function showTab(tabName) {
  const tabs = ['home', 'anime', 'manga'];

  tabs.forEach(tab => {
    const section = document.getElementById(tab);
    section.classList.toggle('hidden', tab !== tabName);
  });

  // Active state
  document.querySelectorAll('.floating-nav button').forEach(btn => btn.classList.remove('active-tab'));
  document.getElementById('nav-' + tabName)?.classList.add('active-tab');
}

function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  panel.classList.toggle('show');
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  alert(`Theme changed to ${isDark ? 'Dark' : 'Light'} (not fully implemented yet)`);
}

document.addEventListener('DOMContentLoaded', () => {
  showTab('home');
});
