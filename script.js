// Tab switching
document.querySelectorAll('.tab').forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.getAttribute('data-tab');

    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    button.classList.add('active');

    document.querySelectorAll('.content').forEach(content => {
      content.style.display = content.id === targetTab ? 'block' : 'none';
    });
  });
});

// Toggle settings panel
function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}
