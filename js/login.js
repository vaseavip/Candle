// Funcția login
function login() {
  // preluăm valorile din input
  const email = document.getElementById('email-input').value.trim();
  const password = document.getElementById('password-input').value.trim();

  // verificare case-sensitive
  if (email === 'admin' && password === 'admin123') {
    return true;
  } else {
    return false;
  }
}

// Testare prin pagina HTML
document
  .getElementById('login-btn')
  .addEventListener('click', function (event) {
    event.preventDefault(); // prevenim refresh-ul paginii
    const success = login();

    if (success) {
      alert('Login reușit!');
    } else {
      alert('Email sau parolă incorectă.');
    }
  });
