const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let inputDescricao = document.getElementById('nome');
let form = document.getElementById('formulario');

async function buscarDados () {
  let resposta = await fetch('http://localhost:3000/categorias/' + id);
  if (resposta.ok) {
    let categoria = await resposta.json();
    inputDescricao.value = categoria.descricao;
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert('Ops! Algo deu errado!');
  }
}

// Está editando
if (id) {
  buscarDados();
}

form.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let descricao = inputDescricao.value;

  let payload = {
    descricao,
  }

  let url = 'http://localhost:3000/categorias';
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
    window.location.href = 'categoria.html'
  } else {
    alert('Ops! Algo deu errado!');
  }
});