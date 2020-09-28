

async function PostDataPaciente (data){
 let url =  new URL('http://localhost:9001/pacientes');
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
  let url =  new URL('http://localhost:9001/pacientes');
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
      case 406:
        return 3;  
      }
  } catch (error) {console.log(error); return 1;}
}

async function GetDataFromNome(nome){  
  let url =  new URL('http://localhost:9001/pacientes/nome');
  url.href += (`/?nome=${nome}`);
  try {
    let response = await fetch(url);
    let data = await response.json();
    switch (response.status) {  
      case 500:{ cameFromDb = false; idDb = 0;
          console.log('Erro no servidor - contacte Suporte TI');break;}
      case 406:{ cameFromDb = false; idDb = 0;
          console.log('Regra de negócio violada - Nome não informado');break;}
      case 404:{ cameFromDb = false; idDb = 0;
          console.log('Nome buscado não existe no Banco de Dados'); break;}
      case 200:
        data.forEach( (item, index, arr) => { 
          console.log( `ID:${arr[index].id_paciente}  ${arr[index].nome}  CPF:${arr[index].cpf}  CNS:${arr[index].cns}  Registro:${arr[index].registro}` );
        });
        idDb = data[0].id_paciente;  // TEMP issue#1 implementar modal para seleção do registro desejado ou criar novo
        if (data[0].nascimento) {
          data[0].nascimento = `${data[0].nascimento.substring(0,10)}`;
          let dataTemp = data[0].nascimento.split('-');
          data[0].nascimento = `${dataTemp[1]}/${dataTemp[2]}/${dataTemp[0]}`;
        }
        cameFromDb = true;
        ShowDataGetNome(data); // paciente.js
        break;
      }
   } catch (error) {console.log(error);};
}

async function GetCpf(cpf) { 
  let url =  new URL('http://localhost:9001/pacientes/cpf');
  url.href += (`/?cpf=${cpf}`);
  try {
    let response = await fetch(url);
    let data = await response.json();
    switch (response.status) {  
      case 500:
          return 1;
      case 404:{ 
          console.log('CPF buscado não existe no Banco de Dados'); 
          return 0;}
      case 200:
          data.forEach( (item, index, arr) =>{ 
            console.log(`ID:${arr[index].id_paciente}  ${arr[index].nome}  CPF:${arr[index].cpf}  CNS:${arr[index].cns}  Registro:${arr[index].registro}`);
          });
          return data ;
      }
    } catch (error) {console.log(error);};
}

async function GetCns(cns) { 
  let url =  new URL('http://localhost:9001/pacientes/cns');
  url.href += (`/?cns=${cns}`);
  try {
    let response = await fetch(url);
    let data = await response.json();
    switch (response.status) {  
      case 500:
          return 1;
      case 404:{ 
          console.log('CNS buscado não existe no Banco de Dados'); 
          return 0;}
      case 200:
          data.forEach( (item, index, arr) =>{ 
            console.log(`ID:${arr[index].id_paciente}  ${arr[index].nome}  CPF:${arr[index].cpf}  CNS:${arr[index].cns}  Registro:${arr[index].registro}`);
          });
          return data ;
      }
    } catch (error) {console.log(error);};
}


async function GetRegistro(registro) { 
  let url =  new URL('http://localhost:9001/pacientes/registro');
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
          data.forEach( (item, index, arr) =>{ 
            console.log(`ID:${arr[index].id_paciente}  ${arr[index].nome}  CPF:${arr[index].cpf}  CNS:${arr[index].cns}  Registro:${arr[index].registro}`);
          });
          return data ;
      }
    } catch (error) {console.log(error);};
}


  


//////// Fetch example////

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

function GetCpfTEMP() { // TEMP
  let url =  new URL('http://localhost:3000/infopaciente/cpf');
  url.href += (`/?cpf=${inputQuery.value}`);
  fetch(url)
  .then (response => response.json())
  .then (data => console.log(data))
  .catch((error) => { console.error('Error:', error); })
}

