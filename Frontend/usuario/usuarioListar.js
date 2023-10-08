let corpoTabela = document.getElementById('corpo-tabela');

async function buscarUsuario () {
  let resposta = await fetch('http://localhost:3000/usuarios');
  let usuarios = await resposta.json();

  for (let usuario of usuarios) {
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdEmail = document.createElement('email');
    let tdAcoes = document.createElement('td');

    tdNome.innerText = usuario.descricao;
    tdEmail.innerText = usuario.email;
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="usuarioFormulario.html?id=${usuario.id}">Editar</a>
      <button class="btn btn-outline-danger btn-sm" onclick="excluir(${usuario.id})">Excluir</button>
    `;

    tdAcoes.classList = "text-center";
    tr.appendChild(tdNome);
    ts.appendChild(tdEmail);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir (id) {
  let confirma = confirm("Deseja excluir esse usuário? Esta ação não pode ser revertida.")
  if(confirma) {
    await fetch('http://localhost:3000/usuarios/' + id, {
    method: 'DELETE'
  });

  window.location.reload();
  }
  
}

buscarCategoria();