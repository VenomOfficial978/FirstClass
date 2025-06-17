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

  // Highlight active tab button
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

function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  panel.classList.toggle('hidden');
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  alert(`Theme changed to ${isDark ? 'Dark' : 'Light'} (not fully implemented yet)`);
}

// Activate default tab
document.addEventListener('DOMContentLoaded', () => {
  showTab('home');
});
