// Tab toggle
document.querySelectorAll('.tab').forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;

    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    document.querySelectorAll('.content').forEach(c => c.style.display = 'none');
    document.getElementById(tab).style.display = 'block';
  });
});

// Toggle settings
function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}
