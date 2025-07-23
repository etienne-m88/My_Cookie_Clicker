document.querySelector('#login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await fetch('http://localhost:5500/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const text = await response.text();

    let data = {};
    try {
      data = JSON.parse(text);
    } catch (err) {}

    if (response.ok && data.success) {
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', username);

      window.location.href = 'game.html';
    } else {
      alert(data.error || "Connection failed.");
    }
  } catch (error) {
    alert("Network error");
  }
});
