

async function PostDataPaciente (data){
  let url =  new URL('http://localhost:3000/infopaciente');
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: data
    })
    switch (response.status){
      case 201: 
        return 0;
      case 500:
        return 1;
      case 406:
        return 2;
      }
  } catch (error) {console.log(error); return 1;}
}

async function PutDataPaciente (idSearch, data){
  let url =  new URL('http://localhost:3000/infopaciente');
  url.href += (`/id${idSearch}`);
  try {
    let response = await fetch(url, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: data
    })
    switch (response.status){
      case 200: 
        return 0;
      case 500:
        return 2;
      case 400:
        return 1;
      }
  } catch (error) {console.log(error); return 1;}
}

function PutCpfServer(){  // TEMP
  let url =  new URL('http://localhost:3000/infopaciente/cpf');
  url.href += (`/idtemp${inputCpfPutAtual.value}`);
  CpfJson = {'cpf':inputCpfPutNovo.value};
  CpfJson = JSON.stringify(CpfJson);
  fetch(url, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: CpfJson
  })
  .then(response => response.status)
  .then(data => (data==200)?console.log('PUT realizado!'):console.error(`PUT NÃO realizado - CPF  não consta no BD!`) )
  .catch((error) => { console.error('Error:', error); })
}

async function GetDataFromNome(nome){  
  let url =  new URL('http://localhost:3000/infopaciente/nome');
  url.href += (`/?nome=${nome}`);
  try {
    let response = await fetch(url);
    let data = await response.json();
    switch (response.status) {  
      case 500:{ cameFromDb = false;
          console.log('Erro no servidor - contacte Suporte TI');break;}
      case 406:{ cameFromDb = false; 
          console.log('Regra de negócio violada - Nome não informado');break;}
      case 404:{ cameFromDb = false;
          console.log('Nome buscado não existe no Banco de Dados'); break;}
      case 200:
        for (i=0; i<data.length; i++){ 
          console.log(`${data[i]._id} ${data[i].nome}: \n${data[i].menor}, ${data[i].responsavel}, ${data[i].cpfresp}, ${data[i].cpf},
          ${data[i].cns}, ${data[i].registro}, ${data[i].nacionalidade}, ${data[i].nascimento}, ${data[i].genero}, ${data[i].tel},
          ${data[i].cel}, ${data[i].whatsapp}, ${data[i].email}, ${data[i].endereco}, ${data[i].cep}, ${data[i].bairro}, ${data[i].uf},
          ${data[i].cidade}, ${data[i].historico}, ${data[i].medicamento}, ${data[i].cirurgia}, ${data[i].trauma}`);
        }
        idDb = data[0]._id;
        cameFromDb = true;
        ShowDataGetNome(data);
        break;
      }
   } catch (error) {console.log(error);};
  }

async function GetRegistro(registro) { // TEMP
    let url =  new URL('http://localhost:3000/infopaciente/registro');
    url.href += (`/?registro=${registro}`);
    try {
      let response = await fetch(url);
      let data = await response.json();
      switch (response.status) {  
        case 500:
            return 1;
        case 404:{ 
            console.log('Registro buscado não existe no Banco de Dados'); 
            return 0;}
        case 200:
            for (i=0; i<data.length; i++){ 
              console.log(`${data[i]._id} ${data[i].nome}: \n${data[i].cpf}`);
            }
            return data ;
        }
     } catch (error) {console.log(error);};
  }


//////// TEMP ////

function GetCpf() { // TEMP
  let url =  new URL('http://localhost:3000/infopaciente/cpf');
  url.href += (`/?cpf=${inputQuery.value}`);
  fetch(url)
  .then (response => response.json())
  .then (data => console.log(data))
  .catch((error) => { console.error('Error:', error); })
}

function PutCpfServer(){  // TEMP
  let url =  new URL('http://localhost:3000/infopaciente');
  url.href += (`/id${inputCpfPutAtual.value}`);
  CpfJson = {'cpf':inputCpfPutNovo.value};
  CpfJson = JSON.stringify(CpfJson);
  fetch(url, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: CpfJson
  })
  .then(response => response.status)
  .then(data => (data==200)?console.log('PUT realizado!'):console.error(`PUT NÃO realizado - CPF  não consta no BD!`) )
  .catch((error) => { console.error('Error:', error); })
}


//////////  No use, just examples witj jQuery
function ExampleGETjQuery(){
  let url = new URL('http://localhost:3000');
  $.get(url, function(data, status){
    console.log("Data: " + data + "\nStatus: " + status);
  });
}

function ExamplePostjQuery(jsonContent){
  let url = new URL('http://localhost:3000/paciente');
  $.post(url, jsonContent, function(data, status){
    console.log("Data: " + data + "\nStatus: " + status);
  });
}