let corpoTabela = document.getElementById('corpo-tabela');

async function buscarCd_item () {
  let resposta = await fetch('http://localhost:3000/cd_item');
  let cd_itens = await resposta.json();

  for (let cd_item of cd_itens) {
    let tr = document.createElement('tr');
    let tdItem = document.createElement('td');
    let tdCD = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdItem.innerText = cd_item.id_item.nome;
    tdCD.innerText = cd_item.id_cd.nome;
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="cd_itemFormulario.html?id=${cd_item.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${cd_item.id})">Excluir</button>
    `;

    tdAcoes.classList = "text-center";
    tr.appendChild(tdItem);
    tr.appendChild(tdCD)
    tr.appendChild(tdAcoes);


    corpoTabela.appendChild(tr);
  }
}

async function excluir (id) {
  let confirma = confirm("Deseja excluir esse cadastro? Esta ação não pode ser revertida.")
  if(confirma) {
    await fetch('http://localhost:3000/cd_item/' + id, {
    method: 'DELETE'
  });

  window.location.reload();
  }
  
}

buscarCd_item();