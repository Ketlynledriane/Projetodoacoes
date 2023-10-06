let corpoTabela = document.getElementById('corpo-tabela');

async function buscarCategoria () {
  let resposta = await fetch('http://localhost:3000/categorias');
  let categorias = await resposta.json();

  for (let categoria of categorias) {
    let tr = document.createElement('tr');
    let tdDescricao = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdDescricao.innerText = categoria.nome;
    tdAcoes.innerHTML = `
      <a href="categoriaformulario.html?id=${categoria.id}">Editar</a>
      <button onclick="excluir(${categoria.id})">Excluir</button>
    `;

    tr.appendChild(tdDescricao);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir (id) {
  await fetch('http://localhost:3000/usuarios/' + id, {
    method: 'DELETE'
  });

  window.location.reload();
}

buscarCategoria();