


let tagHtml = document.querySelector('main');
let tagMain = document.querySelector('main');
let idCpf = document.querySelector('#cpf');
let idCns = document.querySelector('#cns');
let idRegistro = document.querySelector('#registro');
let idNome = document.querySelector('#nome');
let retornoBd;

const isEmpty = str => !str.trim().length;

ClearSearch();

function ClearSearch(){
  idCpf.value='';
  idCns.value='';
  idRegistro.value='';
  idNome.value='';
}

idCpf.addEventListener('keyup', async function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    this.value = ValidaCpf(this.value);
    if (isEmpty(this.value)) MsgTop('warning', 'Informe o CPF!');
    else if (this.value.length != 14 && this.value.length != 0) MsgTop('error', 'CPF inválido!');
    else {
      let retorno = await GetCpf(this.value);
      if (retorno.length==1) {
        retornoBd = retorno;
        CriaTelaAtendimento(retorno.length - 1);
      }  
      else MsgCenterText('info','Paciente não localizado!','Confira o CPF informado.');
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
        retornoBd = retorno;
        CriaTelaAtendimento(retorno.length - 1);
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
        retornoBd = retorno;
        CriaTelaAtendimento(retorno.length - 1);
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
      retornoBd = retorno;
      if (retorno.length>1) {
        let modalData='';
        retorno.forEach( (item, index, arr) => { 
          if (arr[index].cpf == null) modalData += (`<a href='javascript:CriaTelaAtendimento(${index})'>${arr[index].nome} <b>CPF resp. ${arr[index].cpfresp}</b></a>  <br>`);  
          else modalData += (`<a href='javascript:CriaTelaAtendimento(${index})'>${arr[index].nome} <b>CPF ${arr[index].cpf}</b></a>  <br>`);  
        });
        let resultModal = await MsgSearch(modalData);
        if (resultModal.dismiss=="close" || resultModal.dismiss=="cancel" || resultModal.dismiss=="backdrop" || resultModal.dismiss=="esc") {
          ClearSearch();
        }
      }
      else if (retorno.length == 1) CriaTelaAtendimento(retorno.length - 1);
      else if (retorno == 2 || retorno == 4) MsgCenterText('info','Paciente não localizado!','Confira o nome informado.');
      else  MsgCenterButtonText('error','Erro no servidor!', 'Contacte o Suporte TI'); 
    }  
 }
});

async function CriaTelaAtendimento(index){
  Swal.close(); 
  let retorno = await GetHtmlMain('view-atendimentos.html');
  if (retorno.length>0) { 
    tagMain.innerHTML = retorno;
    IniciaAtendimento(retornoBd[index]);
  }  
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contacte o Suporte TI.');
}

function IniciaAtendimento(data){
  PreencheCard1(data.cpfresp, data.cpf, data.cns, data.registro);
  PreencheCard2(data.nascimento,data.datalog,data.nome,data.ativo,data.id_paciente);
  PreencheCard3(data.cel,data.whatsapp,data.tel);
}

function PreencheCard1(cpfresp,cpf,cns,registro){
  const headCard = document.querySelector('.card-1');
  const pCard1 = document.createElement('p');
  (cpf) ? pCard1.textContent = `CPF: ${cpf}`: pCard1.textContent = `CPF resp.: ${cpfresp}`
  headCard.appendChild(pCard1);
  const pCard2 = document.createElement('p');
  (cns) ? pCard2.textContent = `CNS: ${cns}` : pCard2.textContent = `CNS:`
  headCard.appendChild(pCard2);
  const pCard3 = document.createElement('p');
  (registro) ? pCard3.textContent = `Registro: ${registro}` : pCard3.textContent = `Registro:`
  headCard.appendChild(pCard3);
}


async function PreencheCard2(nascimento,datalog,nome,ativo,id_paciente){
  let idade = CalculaIdade(nascimento);
  let diasLog = CalculaDiferencaDias(datalog);
  const headCard = document.querySelector('.card-2 h6'); 
  headCard.textContent = `${nome}`; 
  const pCard = document.querySelector('.card-2 p');
  pCard.textContent = `${idade}`;
  if (diasLog) pCard.textContent += ` - atualização do cadastro tem: ${diasLog} dias`;
  if (!ativo) pCard.textContent += ` - paciente não habilitado para novos atendimentos`;   
  if (diasLog>=180) {
    let resultModal = await MsgCenterButtonsText('info','Cadastro desatualizado', `Última alteração faz ${diasLog} dias`);
    if (resultModal.isConfirmed) document.location.href = "/pacientes/html/pacientes.html";
    else if (resultModal.isDenied) { 
      AtualizaDataLog(id_paciente);
      pCard.textContent = `${idade}`;
    }
  }
}

function PreencheCard3(cel,whatsapp,tel){
  const headCard = document.querySelector('.card-3');
  const pCard1 = document.createElement('p');
  pCard1.textContent = `Celular: ${cel}`;
  if (cel) (whatsapp) ? pCard1.textContent += ' usa Whatsapp' : pCard1.textContent += ' SEM Whatsapp'
  headCard.appendChild(pCard1);
  const pCard2 = document.createElement('p');
  pCard2.textContent = `Telefone: ${tel}`
  headCard.appendChild(pCard2);
}

async function AtualizaDataLog(id_paciente,index){
  // Adicionar modal para confirmar execução
  let retorno = await PutAtualizaDataPaciente (id_paciente)
  if (retorno == 0) MsgTop('success', 'Data do cadastro foi atualizada!');
  if (retorno == 2 || retorno == 3 || retorno == 5) MsgTop('error', 'Falha na atualização da data!');
}

function CalculaIdade(nascimento){
  if (!nascimento) return 'não informado idade';
  let age = '';
  let today = new Date();
  let years = today.getFullYear()-nascimento.substring(0,4);
  let months = today.getMonth()+1-nascimento.substring(5,7);
  let days = today.getDate()-nascimento.substring(8,10);
  if (days<0)  months = months-1; 
  if (years<=0) {
    if (months == 1) age = (`${months} mês`) 
    if (months  > 1) age = (`${months} meses`)
    if (months == 0) (days == 1) ? age = (`${days} dia`) : age = (`${days} dias`)
  }  
  else if (months == 0) (years == 1) ? age = (`${years} ano`) : age = (`${years} anos`);
  else if (months == 1) (years == 1) ? age = (`${years} ano e ${months} mês`) : age = (`${years} anos e ${months} mês`);
  else if (months  > 1)  (years == 1) ? age = (`${years} ano e ${months} meses`)  : age = (`${years} anos e ${months} meses`);
  else if (12+months == 1) (years-1 == 1) ? age = (`${years-1} ano e ${12+months} mês`) : age = (`${years-1} anos e ${12+months} mês`)
  else (years-1 == 1) ? age = (`${years-1} ano e ${12+months} meses`) : age = (`${years-1} anos e ${12+months} meses`);
  return age;
}

function CalculaDiferencaDias(datalog){
  let year = datalog.substring(0,4);
  let month = datalog.substring(5,7) - 1;
  let day = datalog.substring(8,10);
  let dateAux = new Date(year, month, day);
  let msDatalog = dateAux.getTime();
  let msHoje = Date.now();
  return (parseInt((msHoje-msDatalog)/86400000));
}

