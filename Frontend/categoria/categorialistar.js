let corpoTabela = document.getElementById('corpo-tabela');

async function buscarCategoria () {
  let resposta = await fetch('http://localhost:3000/categorias/');
  let categorias = await resposta.json();

  for (let categoria of categorias) {
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    
    tdNome.innerText = categoria.descricao;
    tdAcoes.innerHTML = `
      <a href="formulario.html?id=${categorias.id}">Editar</a>
      <button onclick="excluir(${categorias.id})">Excluir</button>
    `;

    tr.appendChild(tdNome);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir (id) {
  await fetch('http://localhost:3000/categorias/' + id, {
    method: 'DELETE'
  });

  window.location.reload();
}

buscarCategoria();