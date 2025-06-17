// ===== TAB SWITCHING =====
function showTab(tabName) {
  const tabs = ['home', 'animeExplore', 'mangaExplore'];

  tabs.forEach(tab => {
    const section = document.getElementById(tab);
    if (section) {
      section.classList.toggle('hidden', tab !== tabName);
    }
  });

  document.querySelectorAll('.bottom-nav button').forEach(btn => {
    btn.classList.remove('active-tab');
  });

  const tabIndex = { home: 0, animeExplore: 1, mangaExplore: 2 };
  document.querySelectorAll('.bottom-nav button')[tabIndex[tabName]]?.classList.add('active-tab');
}

// ===== DASHBOARD SWITCHING =====
function showDashboard(section) {
  const dashboards = ['animeDashboard', 'mangaDashboard'];
  dashboards.forEach(id => document.getElementById(id)?.classList.add('hidden'));
  document.getElementById(section)?.classList.remove('hidden');
}

// ===== SETTINGS PANEL =====
function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  panel.classList.toggle('visible');
  panel.classList.toggle('hidden');
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  alert(`Theme changed to ${isDark ? 'Dark' : 'Light'} (not fully implemented yet)`);
}

// ===== STYLES FOR ACTIVE TAB =====
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

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  showTab('home');
});

// ===== ANILIST API INTEGRATION =====
const clientId = '27691';
const redirectUri = 'https://venomofficial978.github.io/FirstClass/';

function authenticateWithAniList() {
  const url = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`;
  window.location.href = url;
}

function getTokenFromUrl() {
  const hash = window.location.hash;
  if (hash.includes('access_token')) {
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get('access_token');
    localStorage.setItem('anilist_token', token);
    window.location.hash = '';
    return token;
  }
  return localStorage.getItem('anilist_token');
}

async function fetchUserData(token) {
  const query = `
    query {
      Viewer {
        id
        name
        avatar { large }
        statistics {
          anime { count episodesWatched minutesWatched }
          manga { count chaptersRead }
        }
      }
    }
  `;

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ query })
  });

  const { data } = await response.json();
  if (data?.Viewer) {
    document.querySelector('.username span').textContent = data.Viewer.name;
    document.querySelector('#user-avatar').src = data.Viewer.avatar.large;
    document.querySelector('#anime-stats').textContent = `${data.Viewer.statistics.anime.count} Anime Watched`;
    document.querySelector('#manga-stats').textContent = `${data.Viewer.statistics.manga.count} Manga Read`;
  }
}

// ===== MAIN LOGIN FLOW =====
document.addEventListener('DOMContentLoaded', async () => {
  showTab('home');
  const token = getTokenFromUrl();
  if (token) {
    await fetchUserData(token);
  } else {
    // Optional: Auto prompt login if no token found
    // authenticateWithAniList();
  }
});
