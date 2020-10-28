// FOREIGN FUNCTION´S LOCATION
// Get... (/global/script/fetch.js)
// Msg... (/global/script/mensagens.js)
// Valida... (/global/script/valida.js)
// ...Master (/atendimentos/script/atendimentos-master.js)

let tagMain = document.querySelector('main');
let idCpf = document.querySelector('#cpf');
let idCpfResp = document.querySelector('#cpfresp');
let idCns = document.querySelector('#cns');
let idRegistro = document.querySelector('#registro');
let idNome = document.querySelector('#nome');
let arrayPacienteBd;
let indexPacienteBd;


ClearSearch();

function ClearSearch(){
  idCpf.value='';
  idCpfResp.value='';
  idCns.value='';
  idRegistro.value='';
  idNome.value='';
}

window.addEventListener('load', async function(event) {
  const urlParams = new URLSearchParams(window.location.search)
  let id = urlParams.get('atalho')
  if (id){
    let retorno = await GetPaciente(id);
    if (retorno.length==1) {
      arrayPacienteBd = retorno;
      CriaTelaAtendimentoMaster(retorno.length - 1, true);
    }  
  } 
  });


idCpf.addEventListener('keyup', async function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    this.value = ValidaCpf(this.value);
    if (isEmpty(this.value)) MsgTop('warning', 'Informe o CPF!');
    else if (this.value.length != 14 && this.value.length != 0) MsgTop('error', 'CPF inválido!');
    else {
      let retorno = await GetCpf(this.value);
      if (retorno.length==1) {
        arrayPacienteBd = retorno;
        CriaTelaAtendimentoMaster(retorno.length - 1);
      }  
      else MsgCenterText('info','Paciente não localizado!','Confira o CPF informado.');
    }  
 }
});

idCpfResp.addEventListener('keyup', async function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    this.value = ValidaCpf(this.value);
    if (isEmpty(this.value)) MsgTop('warning', 'Informe o CPF!');
    else if (this.value.length != 14 && this.value.length != 0) MsgTop('error', 'CPF inválido!');
    else {
      let retorno = await GetCpfResp(this.value);
      arrayPacienteBd = retorno;
      if (retorno.length > 1) {
        let modalData='';
        retorno.forEach( (item, index, arr) => { 
          if (arr[index].cpf == null) modalData += (`<a href='javascript:CriaTelaAtendimentoMaster(${index})'>${arr[index].nome} <b>CPF resp. ${arr[index].cpfresp}</b></a>  <br>`);  
          else modalData += (`<a href='javascript:CriaTelaAtendimentoMaster(${index})'>${arr[index].nome} <b>CPF ${arr[index].cpf}</b></a>  <br>`);  
        });
        let resultModal = await MsgSearch(modalData);
        if (resultModal.dismiss=="close" || resultModal.dismiss=="cancel" || resultModal.dismiss=="backdrop" || resultModal.dismiss=="esc") {
          ClearSearch();
        }
      }  
      else if (retorno.length == 1) CriaTelaAtendimentoMaster(retorno.length - 1);
      else if (retorno == 2 || retorno == 4) MsgCenterText('info','Paciente não localizado!','Confira o nome informado.');
      else  MsgCenterButtonText('error','Erro no servidor!', 'Contacte o Suporte TI'); 
    }  
 }
});

idCns.addEventListener('keyup', async function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    this.value = ValidaCns(this.value);
    if (isEmpty(this.value)) MsgTop('warning', 'Informe o CNS!');
    else if (this.value.length != 18 && this.value.length != 0) MsgTop('error', 'CNS inválido!');
    else {
      let retorno = await GetCns(this.value);
      if (retorno.length==1) {
        arrayPacienteBd = retorno;
        CriaTelaAtendimentoMaster(retorno.length - 1);
      }
      else MsgCenterText('info','Paciente não localizado!','Confira o CNS informado.');
    }  
 }
});

idRegistro.addEventListener('keyup', async function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    this.value = ValidaRegistro(this.value);
    if (isEmpty(this.value)) MsgTop('warning', 'Informe o Registro!');
    else if (this.value.length != 9 && this.value.length != 0)  MsgTop('error', 'Registro inválido!');
    else {
      let retorno = await GetRegistro(this.value);
      if (retorno.length==1){
        arrayPacienteBd = retorno;
        CriaTelaAtendimentoMaster(retorno.length - 1);
      }
      else MsgCenterText('info','Paciente não localizado!','Confira o Registro informado.');
    }  
 }
});

idNome.addEventListener('keyup', async function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    if (isEmpty(this.value)) MsgTop('warning', 'Informe o nome!');
    else {
      let retorno = await GetNome(this.value+'%');   // Search every name that begins with the input text
      arrayPacienteBd = retorno;
      if (retorno.length>1) {
        let modalData='';
        retorno.forEach( (item, index, arr) => { 
          if (arr[index].cpf == null) modalData += (`<a href='javascript:CriaTelaAtendimentoMaster(${index})'><b>${arr[index].nome} CPF resp. ${arr[index].cpfresp}</b></a>  <br>`);  
          else modalData += (`<a href='javascript:CriaTelaAtendimentoMaster(${index})'><b>${arr[index].nome} CPF ${arr[index].cpf}</b></a>  <br>`);  
        });
        let resultModal = await MsgSearch(modalData);
        if (resultModal.dismiss=="close" || resultModal.dismiss=="cancel" || resultModal.dismiss=="backdrop" || resultModal.dismiss=="esc") {
          ClearSearch();
        }
      }
      else if (retorno.length == 1) CriaTelaAtendimentoMaster(retorno.length - 1);
      else if (retorno == 2 || retorno == 4) MsgCenterText('info','Paciente não localizado!','Confira o nome informado.');
      else  MsgCenterButtonText('error','Erro no servidor!', 'Contacte o Suporte TI'); 
    }  
 }
});


