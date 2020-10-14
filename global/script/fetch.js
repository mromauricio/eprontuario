/*
return  status_code
0       200/201
1       400 Bad Request
2       404 Not Found
3       406 Not Acceptable
4       401 Unauthorized
5       500 Internal Server Error
*/

async function PostPaciente (data){
 let url =  new URL('http://localhost:9001/pacientes');
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: data
    })
    switch (response.status){
      case 201: return 0;
      case 406: return 3;
      case 500: return 5;  
      }
  } catch (error) {console.log(error); return 1;}
}

async function PutPaciente (idSearch, data){
  let url =  new URL('http://localhost:9001/pacientes');
  url.href += (`/id${idSearch}`);
  try {
    let response = await fetch(url, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: data
    })
    switch (response.status){
      case 200: return 0;
      case 404: return 2;
      case 406: return 3;  
      case 500: return 5;  
      }
  } catch (error) {console.log(error); return 1;}
}

async function PutAtualizaDataPaciente (data){
 
  let url =  new URL('http://localhost:9001/pacientes');
  try {
    let response = await fetch(url, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: data
    })
    switch (response.status){
      case 200: return 0;
      case 404: return 2;
      case 406: return 3;  
      case 500: return 5;  
      }
  } catch (error) {console.log(error); return 1;}
}

async function GetNome(nome){  
  let url =  new URL('http://localhost:9001/pacientes/nome');
  url.href += (`/?nome=${nome}`);
  try {
    let response = await fetch(url);
    let data = await response.json();
    switch (response.status) {  
      case 200: return data;
      case 404: return 2;
      case 406: return 3;
      case 500: return 5;
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
      case 200: return data;
      case 404: return 2;
      case 500: return 5;
      }
    } catch (error) {console.log(error);};
}

async function GetCpfResp(cpfresp) { 
  let url =  new URL('http://localhost:9001/pacientes/cpfresp');
  url.href += (`/?cpf=${cpfresp}`);
  try {
    let response = await fetch(url);
    let data = await response.json();
    switch (response.status) {  
      case 200: return data;
      case 404: return 2;
      case 500: return 5;
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
      case 200:  return data;
      case 404:  return 2;
      case 500:  return 5;
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
      case 200: return data;
      case 404: return 2;
      case 500: return 5;
      }
    } catch (error) {console.log(error);};
}

async function GetHtmlMain(html) { 
  try {
    let response = await fetch(`../view/${html}`);
    let data = await response.text();
    switch (response.status) {  
      case 200: return data;
      case 404: return 2;
      }
  } catch (error) {console.log(error); return 5;};
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

