// 🌗 Theme Toggle (Light/Dark vibes)
let darkMode = true;
function toggleTheme() {
  darkMode = !darkMode;
  document.body.style.backgroundColor = darkMode ? "#000" : "#fff";
  document.body.style.color = darkMode ? "#fff" : "#000";
}

// 🧠 Modal Logic
function openModal() {
  document.getElementById('joinModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('joinModal').style.display = 'none';
}

// 📜 Cult Quotes
const quotes = [
  "“Divine ink flows only through devotion.”",
  "“In the absence of color, shadows reveal truth.”",
  "“The blade of story slices deeper than steel.”",
  "“Manga panels are the scriptures of our time.”",
  "“Only those who see with still eyes understand the art.”"
];

function showQuote() {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quote-box').textContent = random;
}

// 🎵 Background Music Control (Autoplays by default)
const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.3;

// 🧊 Optional: Sakura Petal Animation (Pure flex)
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 25; i++) {
    const petal = document.createElement("div");
    petal.classList.add("sakura");
    document.body.appendChild(petal);

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 5 + Math.random() * 5 + "s";
    petal.style.opacity = Math.random();
    petal.style.fontSize = Math.random() * 10 + 10 + "px";
  }
});
