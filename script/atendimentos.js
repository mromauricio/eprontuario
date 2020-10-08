let main = document.querySelector('main');
let searchCpf = document.querySelector('#cpf');
let searchCns = document.querySelector('#cns');
let searchRegistro = document.querySelector('#registro');
let searchNome = document.querySelector('#nome');
let retornoGet;

const isEmpty = str => !str.trim().length;

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
      if (retorno.length==1) {
        retornoGet = retorno;
        selecionaPacienteAtendimento(retorno.length - 1);
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
      if (retorno.length==1) {
        retornoGet = retorno;
        selecionaPacienteAtendimento(retorno.length - 1);
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
      if (retorno.length==1){
        retornoGet = retorno;
        selecionaPacienteAtendimento(retorno.length - 1);
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
      let retorno = await GetNome(this.value+'%');   // Search every name that begins with the input text
      retornoGet = retorno;
      if (retorno.length>1) {
        let modalData='';
        retorno.forEach( (item, index, arr) => { 
          if (arr[index].cpf == null) modalData += (`<a href='javascript:selecionaPacienteAtendimento(${index})'>${arr[index].nome} <b>CPF resp. ${arr[index].cpfresp}</b></a>  <br>`);  
          else modalData += (`<a href='javascript:selecionaPacienteAtendimento(${index})'>${arr[index].nome} <b>CPF ${arr[index].cpf}</b></a>  <br>`);  
        });
        let resultModal = await MsgSearch(modalData);
        if (resultModal.dismiss=="close" || resultModal.dismiss=="cancel" || resultModal.dismiss=="backdrop" || resultModal.dismiss=="esc") {
          ClearSearch();
        }
      }
      else if (retorno.length == 1) {
        selecionaPacienteAtendimento(retorno.length - 1);
      }
      else if (retorno == 2 || retorno == 4) MsgCenterText('info','Paciente não localizado!','Confira o dado informado.');
      else  MsgCenterButtonText('error','Erro no servidor!', 'Contacte o Suporte TI'); 
    }  
 }
});

async function renderSearch(){
  let retorno = await GetHtml('busca');
  if (retorno.length>0) {
    main.innerHTML = retorno;
    return true;
  }
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contacte o Suporte TI.');
  if (retorno == 5) MsgCenterButtonText('error','Erro no servidor!', 'Contacte o Suporte TI.'); 
  return false;
}

async function selecionaPacienteAtendimento(index){
  Swal.close(); 
  let retorno = await GetHtml('atendimentos');
  if (retorno.length>0) { 
    main.innerHTML = retorno;
    executaAtendimento(retornoGet[index]);
  }  
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contacte o Suporte TI.');
  if (retorno == 5) MsgCenterButtonText('error','Erro no servidor!', 'Contacte o Suporte TI.'); 
}

function executaAtendimento(data){
  const btnVoltar = document.querySelector('#voltar');
  const mainDiv = document.querySelector('.paciente-atendimento');
  const paragrafo = document.createElement('p'); 
  paragrafo.setAttribute('class','paciente-atendimento');
  paragrafo.textContent = `${data.nome}  -  CPF: ${data.cpf}`;
  mainDiv.appendChild(paragrafo);

  btnVoltar.addEventListener('click', () => {
    renderSearch();
   });
}