let cookieCount = 0; 
let autoClickerCount = 0; 
let autoClickerPrice = 10;

// Récupère les éléments du DOM
const cookie = document.getElementById('cookie'); 
const counter = document.getElementById('counter');
const autoClickerBtn = document.getElementById('autoClickerBtn'); 
const autoClickerCountDisplay = document.getElementById('autoClickerCount');

// Ajoute un cookie à chaque clic sur l'image
cookie.addEventListener('click', () => {
  cookieCount++;
  updateDisplay();
});

// Achat d'un auto-clicker si assez de cookies
autoClickerBtn.addEventListener('click', () => {
  if (cookieCount >= autoClickerPrice) {
    cookieCount -= autoClickerPrice;
    autoClickerCount++; 
    autoClickerPrice = Math.floor(autoClickerPrice * 1.2); 
    autoClickerBtn.textContent = `Acheter Auto-Clicker (${autoClickerPrice} cookies)`;
    updateDisplay();
  }
});

// Ajoute automatiquement des cookies chaque seconde selon le nombre d'auto-clickers
setInterval(() => {
  cookieCount += autoClickerCount;
  updateDisplay();
}, 1000);

// Met à jour l'affichage du nombre de cookies et d'auto-clickers
function updateDisplay() {
  counter.textContent = `Cookies: ${cookieCount}`;
  autoClickerCountDisplay.textContent = `Auto-Clickers: ${autoClickerCount}`;
}
