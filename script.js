// Tab switch logic
function showTab(tabName) {
  const tabs = ['home', 'anime', 'manga'];
  
  tabs.forEach(tab => {
    const section = document.getElementById(tab);
    if (tab === tabName) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });

  // Highlight active nav button
  document.querySelectorAll('.floating-nav button').forEach(btn => {
    btn.classList.remove('active-tab');
  });

  const tabIndex = {
    anime: 0,
    home: 1,
    manga: 2,
  };

  document.querySelectorAll('.floating-nav button')[tabIndex[tabName]]?.classList.add('active-tab');
}

// Toggle settings panel
function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  panel.classList.toggle('hidden');
  panel.classList.toggle('show');
}

// Toggle dark/light theme (placeholder)
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  alert(`Theme changed to ${isDark ? 'Dark' : 'Light'} (placeholder effect)`);
}

// On DOM load, default to home
document.addEventListener('DOMContentLoaded', () => {
  showTab('home');
});

// Inject active button highlight styling
const style = document.createElement('style');
style.innerHTML = `
  .active-tab {
    background: #ff4d8b !important;
    color: white !important;
    border-color: #ff4d8b !important;
    box-shadow: 0 0 12px #ff4d8b88;
  }
`;
document.head.appendChild(style);
