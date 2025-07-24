document.querySelector('#signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await fetch('http://localhost:5500/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const text = await response.text();

    let data = {};
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Error");
    }

    if (response.ok && data.success) {
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', username);

      window.location.href = 'game.html';
    } else {
      alert(data.error || "Error during registration.");
    }
  } catch (error) {
    alert("Network error or server unreachable");
  }
});
