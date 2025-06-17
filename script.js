document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-btn');
  const pages = document.querySelectorAll('.page');
  const settingsBtn = document.getElementById('settings-btn');
  const settingsPanel = document.getElementById('settings-panel');
  const themeSelect = document.getElementById('theme-select');

  function showPage(targetId) {
    pages.forEach(page => page.classList.remove('active'));
    const target = document.getElementById(targetId);
    if (target) target.classList.add('active');
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      showPage(targetId);
    });
  });

  settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('show');
  });

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.className = savedTheme;
    themeSelect.value = savedTheme;
  }

  themeSelect.addEventListener('change', () => {
    const theme = themeSelect.value;
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  });
});
