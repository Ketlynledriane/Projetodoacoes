const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let campoDoador = document.getElementById('doador');
let campoCd = document.getElementById('cd');
let campoItem = document.getElementById('item');
let inputQuantidade = document.getElementById('quantidade')
let form = document.getElementById('formulario');

async function buscarDados () {
  let resposta = await fetch('http://localhost:3000/movimentacao/' + id);
  if (resposta.ok) {
    let movimentacao = await resposta.json();
    campoDoador.value = movimentacao.doador?.id || "";
    campoCd.value = movimentacao.cd_item.id_cd;
    campoItem.value = movimentacao.cd_item.id_itens;
    inputQuantidade.value = movimentacao.quantidade;
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.message || e.mensagem || e.error || "Algo deu errado!");
  } else {
    alert('Ops! Algo deu errado!');
  }
}


form.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let doador_id = campoDoador.value || null;
  let cd_id = campoCd.value;
  let item_id = campoItem.value;
  let quantidade = inputQuantidade.value;

  let payload = {
    doador_id,
    cd_id,
    item_id,
    quantidade,
    tipo: "doacao"
  }

  let url = 'http://localhost:3000/movimentacao';
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
    window.location.href = 'receberDoacao.html'
  } else {
    alert('Ops! Algo deu errado!');
  }
});

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

async function buscarDoador () {
    let resposta = await fetch('http://localhost:3000/doador');
    let doadores = await resposta.json();
  
    for (let doador of doadores) {
      let option = document.createElement('option');
  
      option.innerHTML = doador.nome;
      option.value = doador.id;
  
      campoDoador.appendChild(option);
    }
  }

  async function buscarItem () {
    let resposta = await fetch('http://localhost:3000/itens');
    let itens = await resposta.json();
  
    for (let item of itens) {
      let option = document.createElement('option');
  
      option.innerHTML = item.descricao;
      option.value = item.id;
  
      campoItem.appendChild(option);
    }
  }

async function init () {
  console.log("init")
  await buscarCd();
  await buscarDoador();
  await buscarItem();
  if (id) {
    buscarDados();
  } 
}

init();