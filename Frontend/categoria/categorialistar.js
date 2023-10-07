let corpoTabela = document.getElementById('corpo-tabela');

async function buscarCategoria () {
  let resposta = await fetch('http://localhost:3000/categorias');
  let categorias = await resposta.json();

  for (let categoria of categorias) {
    let tr = document.createElement('tr');
    let tdDescricao = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdDescricao.innerText = categoria.descricao;
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="categoriaformulario.html?id=${categoria.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${categoria.id})">Excluir</button>
    `;

    tdAcoes.classList = "text-center";
    tr.appendChild(tdDescricao);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir (id) {
  let confirma = confirm("Deseja excluir essa categoria? Esta ação não pode ser revertida.")
  if(confirma) {
    await fetch('http://localhost:3000/categorias/' + id, {
    method: 'DELETE'
  });

  window.location.reload();
  }
  
}

buscarCategoria();