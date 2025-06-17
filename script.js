// === 🔊 Music Auto-Play Fix ===
window.addEventListener('click', () => {
  const music = document.getElementById("bgMusic");
  if (music && music.paused) {
    music.play().catch(() => {});
  }
}, { once: true });

// === 🎴 Join Modal Logic ===
function openModal() {
  document.getElementById("joinModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("joinModal").style.display = "none";
}

// === 🌗 Theme Toggle ===
function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

// === 🧠 Random Quotes ===
const quotes = [
  "“Ink speaks louder than words.”",
  "“The void between panels hides the truth.”",
  "“A single frame holds a thousand fates.”",
  "“Those who scroll too fast miss the divine.”",
  "“The margins are sacred.”"
];
function showQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote-box").textContent = quote;
}

// === 🖼️ Lightbox Effect ===
function enlarge(img) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0,0,0,0.9)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = 3000;

  const bigImg = document.createElement("img");
  bigImg.src = img.src;
  bigImg.style.maxWidth = "90%";
  bigImg.style.maxHeight = "90%";
  bigImg.style.borderRadius = "1rem";
  bigImg.style.boxShadow = "0 0 30px #fff";

  overlay.appendChild(bigImg);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });
}

// === 🌀 Scroll Reveal FX ===
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

// === 💻 Terminal Easter Egg ===
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "`") {
    const terminal = document.createElement("div");
    terminal.classList.add("terminal");
    terminal.innerHTML = `
      <pre>
Cult of Panels [terminal]

$ whoami
You are Prajval, leader of the cult.

$ fortune
“In the void of panels, you found purpose.”

$ logout
      </pre>
    `;
    document.body.appendChild(terminal);
    terminal.style.display = "block";
    setTimeout(() => {
      terminal.style.display = "none";
      document.body.removeChild(terminal);
    }, 10000);
  }
});
