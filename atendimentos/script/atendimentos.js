
let tagMain = document.querySelector('main');
let idCpf = document.querySelector('#cpf');
let idCpfResp = document.querySelector('#cpfresp');
let idCns = document.querySelector('#cns');
let idRegistro = document.querySelector('#registro');
let idNome = document.querySelector('#nome');
let dataBd;
let indexDataBd;

const isEmpty = str => !str.trim().length;

ClearSearch();

function ClearSearch(){
  idCpf.value='';
  idCpfResp.value='';
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
        dataBd = retorno;
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
      dataBd = retorno;
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
        dataBd = retorno;
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
        dataBd = retorno;
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
      dataBd = retorno;
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

async function CriaTelaAtendimentoMaster(index){
  indexDataBd = index;
  Swal.close(); 
  let retorno = await GetHtmlMain('view-atendimentos-master.html');
  if (retorno.length>0) { 
    tagMain.innerHTML = retorno;
    ExibePacienteAtendimento(dataBd[index]);
  }  
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contacte o Suporte TI.');
}

function ExibePacienteAtendimento(data){
  PreencheCard1(data.cpfresp, data.responsavel, data.cpf, data.cns, data.registro);
  PreencheCard2(data.nascimento,data.datalog,data.nome,data.ativo,data.id_paciente);
  PreencheCard3(data.cel,data.whatsapp,data.tel,data.email);
  PreencheCard4(data.historico);
  PreencheCard5(data.cirurgia);
  PreencheCard6(data.trauma);
  PreencheCard7(data.medicamento);
}

function PreencheCard1(cpfresp,responsavel,cpf,cns,registro){
  const headCard = document.querySelector('.card-1');
  const p1Card = document.createElement('p');
  (cpf) ? p1Card.textContent = `CPF.....: `: p1Card.textContent = `CPF resp: `
  headCard.appendChild(p1Card);
  s1Card = document.createElement('span');
  (cpf) ? s1Card.textContent = cpf : s1Card.textContent = `${cpfresp} ${responsavel}`
  p1Card.appendChild(s1Card)
  const p2Card = document.createElement('p');
  p2Card.textContent = `CNS.....: `
  headCard.appendChild(p2Card);
  s2Card = document.createElement('span');
  if (cns) s2Card.textContent = cns;
  p2Card.appendChild(s2Card)
  const p3Card = document.createElement('p');
  p3Card.textContent = `Registro: `;
  headCard.appendChild(p3Card);
  s3Card = document.createElement('span');
  if (registro) s3Card.textContent = registro;
  p3Card.appendChild(s3Card)
}

async function PreencheCard2(nascimento,datalog,nome,ativo,id_paciente){
  const headCard = document.querySelector('.card-2 h6'); 
  headCard.textContent = nome; 
  const pCard = document.querySelector('.card-2 p');
  if (!ativo) {
    sCard = document.createElement('span');
    sCard.textContent = `Paciente não habilitado para novos atendimentos`;  
    pCard.appendChild(sCard);
    const btnAlert = document.querySelector('.spinner');
    btnAlert.setAttribute('class',"spinner-grow spinner-grow-sm");
    setTimeout( ()=> { btnAlert.removeAttribute('class'); }, 5000);
    
    
  }
  else {  
    let idade = CalculaIdade(nascimento);          // global/script/calcula.js
    let diasLog = CalculaDiferencaDias(datalog);  // global/script/calcula.js
    pCard.textContent = idade;
    if (diasLog) pCard.textContent += ` - atualização do cadastro tem: ${diasLog} dias`;
    if (diasLog>=180) {
      let resultModal = await MsgCenterButtonsText('info','Cadastro desatualizado', `Última alteração faz ${diasLog} dias`);
      if (resultModal.isConfirmed) document.location.href = "/pacientes/html/pacientes.html";
      else if (resultModal.isDenied) { 
        (AtualizaDataLog(id_paciente)) ? MsgTop('success', 'Data do cadastro foi atualizada!') : MsgTop('error', 'Falha na atualização da data!');  // global/script/calcula.js
        pCard.textContent = idade;
      }
    }
  }
}

function PreencheCard3(cel,whatsapp,tel,email){
  const headCard = document.querySelector('.card-3');
  const p1Card = document.createElement('p');
  p1Card.textContent = `Celular : `;
  headCard.appendChild(p1Card);
  s1Card = document.createElement('span');
  s1Card.textContent = cel;
  if (cel) (whatsapp) ? s1Card.textContent += ' usa Whatsapp' : s1Card.textContent += ' SEM Whatsapp'
  p1Card.appendChild(s1Card)
  const p2Card = document.createElement('p');
  p2Card.textContent = `Telefone: `
  headCard.appendChild(p2Card);
  s2Card = document.createElement('span');
  s2Card.textContent = tel;
  p2Card.appendChild(s2Card)
  const p3Card = document.createElement('p');
  p3Card.textContent = `E-mail..: `
  headCard.appendChild(p3Card);
  s3Card = document.createElement('span');
  s3Card.textContent = email;
  p3Card.appendChild(s3Card)
}

function PreencheCard4(historico){
  const headCard = document.querySelector('.card-4');
  const pCard = document.createElement('p');
  headCard.appendChild(pCard);
  sCard = document.createElement('span');
  sCard.textContent = historico;
  pCard.appendChild(sCard)
}

function PreencheCard5(cirurgia){
  const headCard = document.querySelector('.card-5');
  const pCard = document.createElement('p');
  headCard.appendChild(pCard);
  sCard = document.createElement('span');
  sCard.textContent = cirurgia;
  pCard.appendChild(sCard)
}

function PreencheCard6(trauma){
  const headCard = document.querySelector('.card-6');
  const pCard = document.createElement('p');
  headCard.appendChild(pCard);
  sCard = document.createElement('span');
  sCard.textContent = trauma;
  pCard.appendChild(sCard)
}

function PreencheCard7(medicamento){
  const headCard = document.querySelector('.card-7');
  const pCard = document.createElement('p');
  headCard.appendChild(pCard);
  sCard = document.createElement('span');
  sCard.textContent = medicamento;
  pCard.appendChild(sCard)
}


async function CriaTelaAtendimento(){
  let retorno = await GetHtmlMain('view-atendimentos-inclusao.html');
  if (retorno.length>0) tagMain.innerHTML = retorno;
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contacte o Suporte TI.');
}


function RetornaTelaAtendimentoMaster(){
  CriaTelaAtendimentoMaster(indexDataBd);
}