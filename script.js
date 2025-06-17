// ====== TOKEN SETUP ======
let accessToken = null;

// Extract token from URL hash (after AniList login)
if (window.location.hash.includes('access_token')) {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  accessToken = params.get('access_token');

  if (accessToken) {
    localStorage.setItem('anilist_token', accessToken);
    window.location.hash = ''; // Clean URL
  }
} else {
  accessToken = localStorage.getItem('anilist_token');
}

// Update UI if logged in
if (accessToken) {
  document.querySelector('.username').innerHTML = 'Welcome, <span class="highlight">User</span>';
  document.getElementById('login-button').innerText = '✅ Logged In';
  fetchUserData(accessToken);
}

// ====== LOGIN ======
function authenticateWithAniList() {
  const clientId = 27691;
  const redirectUri = 'https://venomofficial978.github.io/FirstClass/';
  const authUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
  window.location.href = authUrl;
}

// ====== USER DATA FETCH ======
async function fetchUserData(token) {
  const query = `
    query {
      Viewer {
        name
        avatar { large }
        statistics {
          anime { count }
          manga { count }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ query })
    });

    const { data } = await response.json();

    if (data?.Viewer) {
      document.querySelector('.username span').textContent = data.Viewer.name;
      document.querySelector('#user-avatar').src = data.Viewer.avatar.large;
      document.querySelector('#user-name').textContent = data.Viewer.name;
      document.querySelector('#anime-stats').textContent = `${data.Viewer.statistics.anime.count} Anime Watched`;
      document.querySelector('#manga-stats').textContent = `${data.Viewer.statistics.manga.count} Manga Read`;
    }
  } catch (err) {
    console.error('Failed to fetch user data:', err);
  }
}

// ====== DASHBOARD CATEGORY SWITCH ======
function showLibraryTab(type) {
  const dashboard = document.getElementById('dashboard');
  dashboard.classList.remove('hidden');
  dashboard.dataset.type = type;
  document.getElementById('dashboard-content').innerHTML = `<p>Select a category to view your ${type} list.</p>`;
}

function switchCategory(category) {
  const type = document.getElementById('dashboard').dataset.type;
  const token = localStorage.getItem('anilist_token');
  if (!token || !type) return;

  const mediaType = type === 'anime' ? 'ANIME' : 'MANGA';
  const statusMap = {
    watching: 'CURRENT',
    completed: 'COMPLETED',
    on_hold: 'PAUSED',
    dropped: 'DROPPED',
    plan_to_watch: 'PLANNING'
  };

  const status = statusMap[category];

  const query = `
    query ($type: MediaType, $status: MediaListStatus) {
      MediaListCollection(type: $type, status: $status) {
        lists {
          entries {
            media {
              title { romaji }
              coverImage { medium }
            }
          }
        }
      }
    }
  `;

  fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query, variables: { type: mediaType, status } })
  })
    .then(res => res.json())
    .then(res => {
      const entries =
        res.data.MediaListCollection.lists?.flatMap(list => list.entries) || [];
      const container = document.getElementById('dashboard-content');
      if (!entries.length) {
        container.innerHTML = `<p>No ${type} found in ${category} category.</p>`;
        return;
      }
      container.innerHTML = entries
        .map(
          item => `
        <div class="card">
          <img src="${item.media.coverImage.medium}" alt="Cover" style="width:100%;border-radius:8px" />
          <p>${item.media.title.romaji}</p>
        </div>`
        )
        .join('');
    });
}

// ====== UI TABS & NAVIGATION ======
function showTab(tabName) {
  const tabs = ['home', 'explore-anime', 'explore-manga'];
  tabs.forEach(tab => {
    const section = document.getElementById(tab);
    if (section) section.classList.toggle('hidden', tab !== tabName);
  });

  document.querySelectorAll('.bottom-nav button').forEach(btn => btn.classList.remove('active-tab'));
  const tabIndex = { home: 0, 'explore-anime': 1, 'explore-manga': 2 };
  document.querySelectorAll('.bottom-nav button')[tabIndex[tabName]]?.classList.add('active-tab');
}

// ====== SETTINGS PANEL ======
function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  panel.classList.toggle('visible');
  panel.classList.toggle('hidden');
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  alert(`Theme changed to ${isDark ? 'Dark' : 'Light'} (not fully implemented yet)`);
}

// ====== SYNC BUTTON ======
function syncAniList() {
  const token = localStorage.getItem('anilist_token');
  if (token) fetchUserData(token);
}
