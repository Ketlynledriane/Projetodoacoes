let corpoTabela = document.getElementById('corpo-tabela');

async function buscarCd () {
  let resposta = await fetch('http://localhost:3000/cd');
  let cds = await resposta.json();

  for (let cd of cds) {
    let tr = document.createElement('tr');
    let tdCidade = document.createElement('td');
    let tdDescricao = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdDescricao.innerText = cd.nome;
    tdCidade.innerText = cd.cidade.nome;
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="cdFormulario.html?id=${cd.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${cd.id})">Excluir</button>
    `;

    tdAcoes.classList = "text-center";
    tr.appendChild(tdDescricao);
    tr.appendChild(tdCidade)
    tr.appendChild(tdAcoes);


    corpoTabela.appendChild(tr);
  }
}

async function excluir (id) {
  let confirma = confirm("Deseja excluir esse CD? Esta ação não pode ser revertida.")
  if(confirma) {
    await fetch('http://localhost:3000/cd/' + id, {
    method: 'DELETE'
  });

  window.location.reload();
  }
  
}

buscarCd();