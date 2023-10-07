const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let inputNome = document.getElementById('nome');
let form = document.getElementById('formulario');

async function buscarDados () {
  let resposta = await fetch('http://localhost:3000/cidades/' + id);
  if (resposta.ok) {
    let cidade = await resposta.json();
    inputNome.value = cidade.nome;
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

  let nome = inputNome.value;

  let payload = {
    nome,
  }

  let url = 'http://localhost:3000/cidades';
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
    window.location.href = 'cidade.html'
  } else {
    alert('Ops! Algo deu errado!');
  }
});