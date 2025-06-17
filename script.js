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

  // Optional: Highlight the active nav button
  document.querySelectorAll('.bottom-nav button').forEach(btn => {
    btn.classList.remove('active-tab');
  });

  const tabButton = {
    anime: 0,
    home: 1,
    manga: 2,
  };

  document.querySelectorAll('.bottom-nav button')[tabButton[tabName]]?.classList.add('active-tab');
}

// Optional: Highlight active button style
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

// Default to home tab
document.addEventListener('DOMContentLoaded', () => {
  showTab('home');
});
