let corpoTabela = document.getElementById('corpo-tabela');

async function buscarCidade () {
  let resposta = await fetch('http://localhost:3000/cidades');
  let cidades = await resposta.json();

  for (let cidade of cidades) {
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdNome.innerText = cidade.nome;
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="cidadeFormulario.html?id=${cidade.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${cidade.id})">Excluir</button>
    `;

    tdAcoes.classList = "text-center";
    tr.appendChild(tdNome);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir (id) {
  let confirma = confirm("Deseja excluir essa cidades? Esta ação não pode ser revertida.")
  if(confirma) {
    await fetch('http://localhost:3000/cidades/' + id, {
    method: 'DELETE'
  });

  window.location.reload();
  }
  
}

buscarCidade();