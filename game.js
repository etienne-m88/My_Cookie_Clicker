// Musique et redirection
function playMusicAndRedirect(event) {
  event.preventDefault();
  const audio = document.getElementById('bg-music');
  if (audio) {
    audio.play();
    localStorage.setItem('playMusic', 'yes');
    setTimeout(() => location.href = "game.html", 300);
  } else {
    window.location.href = "game.html";
  }
}

// Système de save et load
function getUserId() {
  return localStorage.getItem('userId');
}

function saveGame() {
  const userId = getUserId();
  if (!userId) {
    console.error("No userId found");
    return;
  }

  fetch('http://localhost:5500/api/save/collect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: userId, score: cookieCount, autoClickers: autoClickerCount })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Saved game !");
    } else {
      console.error("Save error:", data.error);
    }
  });
}

function loadGame() {
  const userId = getUserId();
  if (!userId) 
    return;

  fetch(`http://localhost:5500/api/save/load?userId=${userId}`)
    .then(res => res.json())
    .then(data => {
      cookieCount = data.score || 0;
      autoClickerCount = data.autoClickers || 0;
      updateDisplay();
    });
}

// Gameplay
const cookie = document.getElementById('cookie');
const counter = document.getElementById('counter');
const autoClickerBtn = document.getElementById('autoClickerBtn');
const autoClickerCountDisplay = document.getElementById('autoClickerCount');

let cookieCount = 0;
let autoClickerCount = 0;
let autoClickerPrice = 10;

if (cookie && counter && autoClickerBtn && autoClickerCountDisplay) {
  cookie.addEventListener('click', () => {
    cookieCount++;
    updateDisplay();
  });

  autoClickerBtn.addEventListener('click', () => {
    if (cookieCount >= autoClickerPrice) {
      cookieCount -= autoClickerPrice;
      autoClickerCount++;
      autoClickerPrice = Math.floor(autoClickerPrice * 1.5);
      updateDisplay();
    }
  });

  window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-music');
    if (audio && localStorage.getItem('playMusic') === 'yes') {
      audio.play();
      localStorage.removeItem('playMusic');
    }
    loadGame();

    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', saveGame);
    }
  });

  setInterval(() => {
    cookieCount += autoClickerCount;
    updateDisplay();
  }, 1000);

  function updateDisplay() {
    counter.textContent = `Cookies: ${cookieCount}`;
    autoClickerCountDisplay.textContent = `Auto-Clickers: ${autoClickerCount}`;
  }
}
