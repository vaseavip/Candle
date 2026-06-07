function login() {
  const email = document.getElementById('email-input').value.trim();
  const password = document.getElementById('password-input').value.trim();

  if (email === 'admin' && password === 'admin123') {
    const expiresAt = Date.now() + 60000; // 1 minut

    localStorage.setItem('logged', 'true');
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('tokenExpiresAt', expiresAt);

    return true;
  }

  localStorage.setItem('logged', 'false');
  return false;
}

document.getElementById('login-btn').addEventListener('click', (event) => {
  event.preventDefault();

  const success = login();

  if (success) {
    alert('Login reușit!');
    window.location.href = './cart.html';
  } else {
    alert('Email sau parolă incorectă.');
  }
});

// mesaj după expirarea sesiunii
const logoutReason = localStorage.getItem('logoutReason');

if (logoutReason === 'expired') {
  const message = document.getElementById('session-message');

  if (message) {
    message.textContent = 'Session expired. Please log in again.';
  }

  localStorage.removeItem('logoutReason');
}
