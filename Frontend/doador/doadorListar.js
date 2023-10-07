let corpoTabela = document.getElementById('corpo-tabela');

async function buscarDoador () {
  let resposta = await fetch('http://localhost:3000/doador');
  let doadores = await resposta.json();

  for (let doador of doadores) {
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdCpf = document.createElement('td');
    let tdCidade = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdNome.innerText = doador.nome;
    tdCpf.innerText = doador.cpf;
    tdCidade.innerText = doador.cidade?.nome;
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="doadorFormulario.html?id=${doador.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${doador.id})">Excluir</button>
    `;

    tdAcoes.classList = "text-center";
    tr.appendChild(tdNome);
    tr.appendChild(tdCpf);
    tr.appendChild(tdCidade);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir (id) {
  let confirma = confirm("Deseja excluir esse doador? Esta ação não pode ser revertida.")
  if(confirma) {
    await fetch('http://localhost:3000/doador/' + id, {
    method: 'DELETE'
  });

  window.location.reload();
  }
  
}

buscarDoador();