const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let inputDescricao = document.getElementById('descricao');
let campoCd = document.getElementById('cd');
let campoCategoria = document.getElementById('categoria');
let form = document.getElementById('formulario');

let bodyTableEstqoue = document.getElementById("bodyTableEstoque");

async function buscarDados () {
  let resposta = await fetch('http://localhost:3000/itens/' + id);
  if (resposta.ok) {
    let itens = await resposta.json();
    inputDescricao.value = itens.descricao;
    campoCategoria.value = itens.categoria.id;

    // Seleciona os CDs no campo select multiplo
    itens.cd_itens?.map(cd_item => {
      document.getElementById(`ativo_${cd_item.id_cd}`).value = "1";
      document.getElementById(`estoque_${cd_item.id_cd}`).value = cd_item.estoque;
    });
    // for (let i = 0; i < campoCd.options.length; i++) {
    //     campoCd.options[i].selected = values.indexOf(campoCd.options[i].value) >= 0;
    //     if (campoCd.options[i].selected) {
    //         campoCd.options[i].disabled = true;
    //     }
    // }

  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert('Ops! Algo deu errado!');
  }
}


form.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let campos = Array.from(new FormData(event.target));
  let payload = {};
  payload["cds"] = {};
  console.log(campos);
  campos.map(([name, value]) => {
    if (name.indexOf("estoque") >= 0) {
      let cdData = name.split("_");
      payload["cds"][cdData[1]] = {
        ...payload["cds"][cdData[1]],
        estoque: value
      }
    } else if (name.indexOf("ativo") >= 0) {
      let cdData = name.split("_");
      payload["cds"][cdData[1]] = {
        ...payload["cds"][cdData[1]],
        ativo: value
      }
    } else {
      payload[name] = value;
    }
  });



  // let descricao = inputDescricao.value;
  // let id_categoria = campoCategoria.value;

  // let cds = Array.from(campoCd.selectedOptions).map(({ value }) => value)

  // let payload2 = {
  //   descricao,
  //   cds,
  //   id_categoria
  // }

  let url = 'http://localhost:3000/itens';
  let method = 'POST';
  if (id) {
    url += '/' + id;
    method = 'PUT';
  }

  let resposta = await fetch(url, {
    method: method,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (resposta.ok) {
    window.location.href = 'itens.html'
  } else {
    alert('Ops! Algo deu errado!');
  }
});

async function buscarCategoria () {
  let resposta = await fetch('http://localhost:3000/categorias');
  let categorias = await resposta.json();

  for (let categoria of categorias) {
    let option = document.createElement('option');

    option.innerHTML = categoria.descricao;
    option.value = categoria.id;

    campoCategoria.appendChild(option);
  }
}

async function buscarCd () {
    let resposta = await fetch('http://localhost:3000/cd');
    let cds = await resposta.json();
  
    for (let cd of cds) {
      let tr = document.createElement('tr');

      tr.innerHTML = `
        <tr>
          <td>${cd.nome}</td>
          <td>
            <select id="ativo_${cd.id}" name="ativo_${cd.id}" class="cd_ativo form-control">
              <option value="0">Não</option>  
              <option value="1">Sim</option>
            </select>
          </td>
          <td>
            <input id="estoque_${cd.id}" name="estoque_${cd.id}" type="number" class="cd_estoque form-control" />
          </td>
        </tr>
      `;

      bodyTableEstqoue.appendChild(tr);



      // let option = document.createElement('option');
  
      // option.innerHTML = cd.nome;
      // option.value = cd.id;
  
      // campoCd.appendChild(option);
    }
  }

  async function init () {
    console.log("init")
    await buscarCd()
    await buscarCategoria()
    if (id) {
      buscarDados();
    } 
  }

  init();