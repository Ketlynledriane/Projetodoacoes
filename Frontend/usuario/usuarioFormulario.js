const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let inputDescricao = document.getElementById('nome');
let inputEmail = document.getElementById('email');
let inputSenha = document.getElementById('senha');
let form = document.getElementById('formulario');

async function buscarDados () {
  let resposta = await fetch('http://localhost:3000/usuarios/' + id);
  if (resposta.ok) {
    let usuario = await resposta.json();
    inputDescricao.value = usuario.descricao;
    inputEmail.value = usuario.email;
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert('Ops! Algo deu errado!');
  }
}

if (id) {
  buscarDados();
}

form.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let descricao = inputDescricao.value;
  let email = inputEmail.value;

  let payload = {
    descricao,
    email,
  }

  let url = 'http://localhost:3000/usuarios';
  let method = 'POST';
  if (id) {
    url += '/' + id;
    method = 'PUT';
  }

  let resposta = await fetch(url, {
    method: method,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (resposta.ok) {
    window.location.href = 'usuario.html'
  } else {
    alert('Ops! Algo deu errado!');
  }
});