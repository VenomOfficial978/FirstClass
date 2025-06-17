// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const toggleSettingsBtn = document.getElementById('toggleSettings');
  const settingsPanel = document.getElementById('settingsPanel');

  toggleSettingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('open');
  });

  // You can expand this to handle saving preferences, toggling themes, etc.
  // Example placeholder logs:
  const themeRadios = document.querySelectorAll('input[name="theme"]');
  themeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      console.log(`Theme selected: ${e.target.value}`);
      // add your theme switcher logic here
    });
  });

  const mangaQuality = document.getElementById('mangaQuality');
  mangaQuality.addEventListener('change', (e) => {
    console.log(`Manga Quality set to: ${e.target.value}`);
    // logic for updating manga render settings
  });

  const animeAutoplay = document.getElementById('animeAutoplay');
  animeAutoplay.addEventListener('change', (e) => {
    console.log(`Autoplay is now: ${e.target.checked ? 'Enabled' : 'Disabled'}`);
    // logic for toggling autoplay
  });
});
