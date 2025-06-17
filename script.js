// script.js

document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-btn');
  const pages = document.querySelectorAll('.page');
  const settingsBtn = document.getElementById('settings-btn');
  const settingsPanel = document.getElementById('settings-panel');
  const themeSelect = document.getElementById('theme-select');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      pages.forEach(page => page.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');
    });
  });

  settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('hidden');
  });

  themeSelect.addEventListener('change', () => {
    document.body.className = themeSelect.value;
  });
});
