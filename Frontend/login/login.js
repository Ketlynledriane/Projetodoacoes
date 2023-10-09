document.getElementById("form").addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;

  let payload = {
    email,
    senha
  }

  let url = 'http://localhost:3000/usuarios/login';
  let method = 'POST';

  let resposta = await fetch(url, {
    method: method,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (resposta.ok) {
    window.location.href = '../cd/cd.html' // Autenticado, tela inicial
  } else {
    alert('Usuário ou senha incorretos!');
  }
});