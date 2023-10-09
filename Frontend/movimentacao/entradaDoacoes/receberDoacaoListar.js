let corpoTabela = document.getElementById('corpo-tabela');

async function buscarMovimentacao () {
  let resposta = await fetch('http://localhost:3000/movimentacao/listar/doacao');
  let movimentacoes = await resposta.json();

  for (let movimentacao of movimentacoes) {
    let tr = document.createElement('tr');
    let tdDoador = document.createElement('td');
    let tdCd = document.createElement('td');
    let tdItem = document.createElement('td');
    let tdQuantidade = document.createElement('td');
    let tdData_hora = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdDoador.innerText = movimentacao.doador?.nome || "Anônimo";
    tdCd.innerText = movimentacao.cd_item.cd.nome;
    tdItem.innerText = movimentacao.cd_item.item.descricao;
    tdQuantidade.innerText = movimentacao.quantidade;
    tdData_hora.innerText = new Date(movimentacao.data_hora).toLocaleString()
    tdAcoes.innerHTML = `
      <a class="btn btn-outline-primary btn-sm" href="receberDoacaoFormulario.html?id=${movimentacao.id}">Editar</a>

    `;
    //<button class="btn btn-outline-danger btn-sm" onclick="excluir(${movimentacao.id})">Inativar</button> 
    

    tdAcoes.classList = "text-center";
    tr.appendChild(tdDoador);
    tr.appendChild(tdCd);
    tr.appendChild(tdItem);
    tr.appendChild(tdQuantidade);
    tr.appendChild(tdData_hora);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

buscarMovimentacao();