// Handle tab switching
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

  // Highlight active button
  document.querySelectorAll('.bottom-nav button').forEach(btn => {
    btn.classList.remove('active-tab');
  });

  const tabButton = {
    anime: 1,
    home: 0,
    manga: 2,
  };

  document.querySelectorAll('.bottom-nav button')[tabButton[tabName]]?.classList.add('active-tab');
}

// Toggle settings popup
function toggleSettings() {
  const overlay = document.getElementById('settings-overlay');
  overlay.classList.toggle('show');
}

// Optional: Dark theme toggle placeholder
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  alert(`Theme changed to ${isDark ? 'Dark' : 'Light'} (not fully implemented)`);
}

// Default tab
document.addEventListener('DOMContentLoaded', () => {
  showTab('home');
});
