// Musique et redirection
function playMusicAndRedirect(event) {
  event.preventDefault();
  const audio = document.getElementById('bg-music');
  if (audio) {
    audio.play();
    localStorage.setItem('playMusic', 'yes');
    setTimeout(() => {
      window.location.href = "game.html";
    }, 300);
  } else {
    window.location.href = "game.html";
  }
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
