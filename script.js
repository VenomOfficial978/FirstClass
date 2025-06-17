// AniTrack Script.js

const CLIENT_ID = '27691';
const REDIRECT_URI = 'https://venomofficial978.github.io/FirstClass/';
const AUTH_URL = `https://anilist.co/api/v2/oauth/authorize?client_id=${CLIENT_ID}&response_type=token`;

function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  panel.classList.toggle('hidden');
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  alert(`Theme changed to ${isDark ? 'Dark' : 'Light'} (not fully implemented)`);
}

function showTab(tabName) {
  const sections = ['home', 'anime', 'manga', 'anime-explore', 'manga-explore'];
  sections.forEach(id => document.getElementById(id)?.classList.add('hidden'));
  document.getElementById(tabName)?.classList.remove('hidden');
}

function showTopTab(tab) {
  if (tab === 'anime') showTab('anime');
  if (tab === 'manga') showTab('manga');
}

function showBottomTab(tab) {
  if (tab === 'anime-explore') showTab('anime-explore');
  if (tab === 'manga-explore') showTab('manga-explore');
}

// Highlight active nav button (bottom nav only)
document.addEventListener('DOMContentLoaded', () => {
  showTab('home');
  const token = getTokenFromHash();
  if (token) {
    localStorage.setItem('access_token', token);
    window.location.hash = '';
    fetchUserData(token);
  } else {
    const saved = localStorage.getItem('access_token');
    if (saved) fetchUserData(saved);
  }
});

function loginAniList() {
  window.location.href = AUTH_URL;
}

function logoutAniList() {
  localStorage.removeItem('access_token');
  location.reload();
}

function getTokenFromHash() {
  const hash = window.location.hash;
  const match = hash.match(/access_token=([^&]*)/);
  return match ? match[1] : null;
}

async function fetchUserData(token) {
  try {
    const userRes = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        query: `query {
          Viewer {
            id
            name
            avatar { large }
            statistics {
              anime { count minutesWatched }
              manga { count chaptersRead }
            }
          }
        }`
      })
    });

    const json = await userRes.json();
    const user = json.data.Viewer;
    document.getElementById('username').textContent = user.name;
    document.getElementById('login-note').textContent = 'AniList connected.';
    document.querySelector('.login-btn')?.classList.add('hidden');
    // Later: call fetchAnimeList(user.id) & fetchMangaList(user.id)
  } catch (err) {
    alert('Failed to load user');
  }
}
