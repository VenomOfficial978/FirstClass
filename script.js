// Handle tab switching
function showTab(tabName) {
  const tabs = ['home', 'animeExplore', 'mangaExplore'];

  tabs.forEach(tab => {
    const section = document.getElementById(tab);
    if (section) {
      if (tab === tabName) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    }
  });

  document.querySelectorAll('.bottom-nav button').forEach(btn => {
    btn.classList.remove('active-tab');
  });

  const tabButton = {
    animeExplore: 1,
    home: 0,
    mangaExplore: 2,
  };

  document.querySelectorAll('.bottom-nav button')[tabButton[tabName]]?.classList.add('active-tab');
}

// Handle dashboard switching
function showDashboard(section) {
  const sections = ['animeDashboard', 'mangaDashboard'];

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  const target = document.getElementById(section);
  if (target) target.classList.remove('hidden');
}

function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  panel.classList.toggle('visible');
  panel.classList.toggle('hidden');
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  alert(`Theme changed to ${isDark ? 'Dark' : 'Light'} (not fully implemented yet)`);
}

// Add styles for active tab
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

document.addEventListener('DOMContentLoaded', () => {
  showTab('home');
});
