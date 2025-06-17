// === GLOBAL STATE ===
let accessToken = null;
let currentDashboardType = 'anime';

// === ON LOAD: Check token from URL ===
window.onload = () => {
  const url = window.location.href;
  if (url.includes('#access_token')) {
    const tokenMatch = url.match(/access_token=([^&]*)/);
    if (tokenMatch) {
      accessToken = tokenMatch[1];
      localStorage.setItem('anilist_token', accessToken);
      history.replaceState(null, null, window.location.pathname); // Clean URL
      loadUserProfile();
      showLibraryTab('anime');
    }
  } else {
    accessToken = localStorage.getItem('anilist_token');
    if (accessToken) {
      loadUserProfile();
    }
  }
};

// === AniList OAuth Login ===
function authenticateWithAniList() {
  const clientId = 27691;
  const redirectUri = 'https://venomofficial978.github.io/FirstClass/';
  const authUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;
  window.location.href = authUrl;
}

// === Show Dashboard Tabs (Top Buttons) ===
function showLibraryTab(type) {
  currentDashboardType = type;
  document.getElementById('dashboard').classList.remove('hidden');
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  switchCategory('watching');
}

// === Switch Dashboard Category ===
function switchCategory(status) {
  if (!accessToken) return alert('Please login with AniList first.');
  const userSection = document.getElementById('dashboard-content');
  userSection.innerHTML = `<p>Loading ${status} ${currentDashboardType}...</p>`;

  fetch(`https://graphql.anilist.co`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `
        query ($type: MediaType, $status: MediaListStatus) {
          Viewer {
            mediaListCollection(type: $type, status: $status) {
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
        }
      `,
      variables: {
        type: currentDashboardType.toUpperCase(),
        status: status.toUpperCase(),
      }
    })
  })
  .then(res => res.json())
  .then(data => {
    const entries = data?.data?.Viewer?.mediaListCollection?.lists?.flatMap(l => l.entries) || [];
    if (entries.length === 0) {
      userSection.innerHTML = `<p>No ${currentDashboardType} in ${status}.</p>`;
      return;
    }

    userSection.innerHTML = entries.map(e => `
      <div class="card">
        <img src="${e.media.coverImage.medium}" alt="${e.media.title.romaji}" />
        <p>${e.media.title.romaji}</p>
      </div>
    `).join('');
  })
  .catch(err => {
    console.error(err);
    userSection.innerHTML = `<p>Error loading data.</p>`;
  });
}

// === Bottom Navigation Tabs ===
function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById(tabId).classList.remove('hidden');
}

// === Toggle Settings Panel ===
function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  panel.classList.toggle('visible');
  panel.classList.toggle('hidden');
}

// === Theme Toggle (Placeholder) ===
function toggleTheme() {
  alert('Theme switching coming soon!');
}

// === Load User Info after Login ===
function loadUserProfile() {
  fetch(`https://graphql.anilist.co`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          Viewer {
            name
            avatar { medium }
          }
        }
      `
    })
  })
  .then(res => res.json())
  .then(data => {
    const user = data?.data?.Viewer;
    if (user) {
      document.querySelector('.username .highlight').innerText = user.name;
      document.getElementById('user-name').innerText = user.name;
      document.getElementById('user-avatar').src = user.avatar.medium;
    }
  })
  .catch(err => console.error('Failed to fetch user info:', err));
}

// === Sync Button Placeholder ===
function syncAniList() {
  if (!accessToken) return alert('Login required to sync.');
  alert('Syncing library with AniList... (placeholder)');
}
