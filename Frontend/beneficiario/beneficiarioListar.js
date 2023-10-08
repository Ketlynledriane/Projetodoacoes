let corpoTabela = document.getElementById('corpo-tabela');

async function buscarBeneficiario () {
  let resposta = await fetch('http://localhost:3000/beneficiario');
  let beneficiarios = await resposta.json();

  for (let beneficiario of beneficiarios) {
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdCpf = document.createElement('td');
    let tdCidade = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdNome.innerText = beneficiario.nome,
    tdCpf.innerText = beneficiario.cpf,
    tdCidade.innerText = beneficiario.cidade?.nome,
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="beneficiarioFormulario.html?id=${beneficiario.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${beneficiario.id})">Excluir</button>
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
  let confirma = confirm("Deseja excluir esse beneficiário? Esta ação não pode ser revertida.")
  if(confirma) {
    await fetch('http://localhost:3000/beneficiario/' + id, {
    method: 'DELETE'
  });

  window.location.reload();
  }
}

buscarBeneficiario();