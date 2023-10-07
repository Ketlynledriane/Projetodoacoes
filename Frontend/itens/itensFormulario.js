const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let inputDescricao = document.getElementById('descricao');
let campoCd = document.getElementById('cd');
let campoCategoria = document.getElementById('categoria');
let form = document.getElementById('formulario');

async function buscarDados () {
  let resposta = await fetch('http://localhost:3000/itens/' + id);
  if (resposta.ok) {
    let itens = await resposta.json();
    inputDescricao.value = itens.descricao;
    campoCategoria = itens.id_categoria;
    campoCd = itens.id_cd;

  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert('Ops! Algo deu errado!');
  }
}


form.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let descricao = inputDescricao.value;
  let id_categoria = campoCategoria.value;
  let id_cd = campoCd.value;

  let payload = {
    descricao,
    id_cd,
    id_categoria
  }

  let url = 'http://localhost:3000/itens';
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
    window.location.href = 'itens.html'
  } else {
    alert('Ops! Algo deu errado!');
  }
});

async function buscarCategoria () {
  let resposta = await fetch('http://localhost:3000/categorias');
  let categorias = await resposta.json();

  for (let categoria of categorias) {
    let option = document.createElement('option');

    option.innerHTML = categoria.descricao;
    option.value = categoria.id;

    campoCategoria.appendChild(option);
  }
}

async function buscarCd () {
    let resposta = await fetch('http://localhost:3000/cd');
    let cds = await resposta.json();
  
    for (let cd of cds) {
      let option = document.createElement('option');
  
      option.innerHTML = cd.nome;
      option.value = cd.id;
  
      campoCd.appendChild(option);
    }
  }

  async function init () {
    console.log("init")
    await buscarCd()
    await buscarCategoria()
    if (id) {
      buscarDados();
    } 
  }

  init();