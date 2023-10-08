const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let campoItem = document.getElementById('item');
let campoCD = document.getElementById('cd');
let form = document.getElementById('formulario');

async function buscarDados () {
  let resposta = await fetch('http://localhost:3000/cd_item/' + id);
  if (resposta.ok) {
    let cd_item = await resposta.json();
    campoItem.value = cd_item.id_itens;
    campoCD.value = cd.id_cd;
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

  let id_item = campoItem.value;
  let id_cd = campoCD.value;

  let payload = {
    id_item,
    id_cd
  }

  let url = 'http://localhost:3000/cd_item';
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
    window.location.href = 'cd_item.html'
  } else {
    alert('Ops! Algo deu errado!');
  }
});

async function buscarItens () {
  let resposta = await fetch('http://localhost:3000/itens');
  let itens = await resposta.json();

  for (let item of itens) {
    let option = document.createElement('option');

    option.innerHTML = item.nome;
    option.value = item.id;

    campoCidades.appendChild(option);
  }
}

async function buscarCD () {
  let resposta = await fetch('http://localhost:3000/cd');
  let cds = await resposta.json();

  for (let cd of cds) {
    let option = document.createElement('option');

    option.innerHTML = cd.nome;
    option.value = cd.id;

    campoCidades.appendChild(option);
  }
}

async function init () {
  console.log("init")
  await buscarItens()
  if(id) {
    buscarDados();
  }
  await buscarCD()
  if (id) {
    buscarDados();
  } 
}

init();