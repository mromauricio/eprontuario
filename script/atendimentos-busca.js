
const isEmpty = str => !str.trim().length;
let searchCpf = document.querySelector('#cpf');
let searchCns = document.querySelector('#cns');
let searchRegistro = document.querySelector('#registro');
let searchNome = document.querySelector('#nome');
let retornoGet;

ClearSearch();

function ClearSearch(){
  searchCpf.value='';
  searchCns.value='';
  searchRegistro.value='';
  searchNome.value='';
}

searchCpf.addEventListener('keyup', async function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    this.value = ValidaCpf(this.value);
    if (isEmpty(this.value)) {
      MsgTop('warning', 'Informe o CPF!');
    }
    else if (this.value.length != 14 && this.value.length != 0) {
        MsgTop('error', 'CPF inválido!');
    }
    else {
      let retorno = await GetCpf(this.value);
      if (retorno.length>0) {
        retornoGet = retorno;
        selecionaPacienteAtendimento(0);
      }  
      else MsgCenterText('info','Paciente não localizado!','Confira o dado informado.');
    }  
 }
});

searchCns.addEventListener('keyup', async function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    this.value = ValidaCns(this.value);
    if (isEmpty(this.value)) {
      MsgTop('warning', 'Informe o CNS!');
    }
    else if (this.value.length != 18 && this.value.length != 0) {
        MsgTop('error', 'CNS inválido!');
    }
    else {
      let retorno = await GetCns(this.value);
      if (retorno.length>0) {
        retornoGet = retorno;
        selecionaPacienteAtendimento(0);
      }
      else MsgCenterText('info','Paciente não localizado!','Confira o dado informado.');
    }  
 }
});


searchRegistro.addEventListener('keyup', async function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    this.value = ValidaRegistro(this.value);
    if (isEmpty(this.value)) {
      MsgTop('warning', 'Informe o Registro!');
    }
    else if (this.value.length != 9 && this.value.length != 0) {
        MsgTop('error', 'Registro inválido!');
    }
    else {
      let retorno = await GetRegistro(this.value);
      if (retorno.length>0){
        retornoGet = retorno;
        selecionaPacienteAtendimento(0);
      }
      else MsgCenterText('info','Paciente não localizado!','Confira o dado informado.');
    }  
 }
});


searchNome.addEventListener('keyup', async function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    if (isEmpty(this.value)) {
      MsgTop('warning', 'Informe o nome!');
    }
    else {
      let data = await GetNome(this.value+'%');   // Search every name that begins with the input text
      retornoGet = data;
      if (data.length>1) {
        let modalData='';
        data.forEach( (item, index, arr) => { 
          if (arr[index].cpf == null) modalData += (`<a href='javascript:selecionaPacienteAtendimento(${index})'>${arr[index].nome} <b>CPF resp. ${arr[index].cpfresp}</b></a>  <br>`);  
          else modalData += (`<a href='javascript:selecionaPacienteAtendimento(${index})'>${arr[index].nome} <b>CPF ${arr[index].cpf}</b></a>  <br>`);  
        });
        let resultModal = await MsgSearch(modalData);
        if (resultModal.dismiss=="close" || resultModal.dismiss=="cancel" || resultModal.dismiss=="backdrop" || resultModal.dismiss=="esc") {
          ClearSearch();
        }
      }
      else if (data.length == 1) {
        selecionaPacienteAtendimento(0);
      }
      else if (data == 2 || data == 4) MsgCenterText('info','Paciente não localizado!','Confira o dado informado.');
      else  MsgCenterButtonText('error','Erro no servidor!', 'Contacte o Suporte TI'); 
    }  
 }
});

function selecionaPacienteAtendimento(index){
  Swal.close(); 
  console.log(retornoGet[index]);
}
