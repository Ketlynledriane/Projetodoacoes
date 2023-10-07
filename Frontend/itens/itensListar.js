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

    tdDescricao.innerText = item.descricao;
    tdCategorias.innerText = item.categoria.descricao;
    tdCd.innerText = item.cd_itens?.map(cd_item => cd_item.cd.nome)?.join(", ");
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="itensFormulario.html?id=${item.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${item.id})">Excluir</button>
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