let corpoTabela = document.getElementById('corpo-tabela');

async function buscarItem () {
  let resposta = await fetch('http://localhost:3000/itens');
  let itens = await resposta.json();

  for (let item of itens) {
    let tr = document.createElement('tr');
    let tdCategorias = document.createElement('td');
    let tdCd = document.createElement('td');
    let tdDescricao = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdDescricao.innerText = item.nome;
    tdCategorias.innerText = item.categorias.nome;
    tdCd.innerText = item.cd.nome;
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="itensFormulario.html?id=${itens.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${itens.id})">Excluir</button>
    `;

    tdAcoes.classList = "text-center";
    tr.appendChild(tdDescricao);
    tr.appendChild(tdCategorias)
    tr.appendChild(tdCd)
    tr.appendChild(tdAcoes);


    corpoTabela.appendChild(tr);
  }
}

async function excluir (id) {
  let confirma = confirm("Deseja excluir esse item? Esta ação não pode ser revertida.")
  if(confirma) {
    await fetch('http://localhost:3000/itens/' + id, {
    method: 'DELETE'
  });

  window.location.reload();
  }
  
}

buscarItem();