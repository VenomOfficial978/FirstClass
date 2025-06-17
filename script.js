// Tab Switching Logic
function showTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // Show selected tab
  document.getElementById(`${tabName}-tab`).classList.add('active');

  // Highlight tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.tab-button').forEach(btn => {
    if (btn.innerText.toLowerCase().includes(tabName)) {
      btn.classList.add('active');
    }
  });

  // Highlight bottom nav icons
  document.querySelectorAll('.nav-icon').forEach(icon => {
    icon.classList.remove('active');
  });
  document.querySelectorAll('.nav-icon').forEach(icon => {
    if (icon.innerText.toLowerCase().includes(tabName)) {
      icon.classList.add('active');
    }
  });
}

// Settings Panel Toggle
function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  panel.classList.toggle('open');
}

// Theme Toggle (dark/light)
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains('light')) {
    body.classList.remove('light');
    body.style.background = '#0d0d0d';
    body.style.color = '#f0f0f0';
  } else {
    body.classList.add('light');
    body.style.background = '#f5f5f5';
    body.style.color = '#111';
  }
}

// AniList Login Placeholder
function loginAniList() {
  alert("AniList login placeholder.\nTo implement: Use OAuth and fetch user data.");
  // Later: Redirect to AniList OAuth, get token, fetch data
}

// Optional: Default Tab on Load
document.addEventListener("DOMContentLoaded", () => {
  showTab('home');
});
