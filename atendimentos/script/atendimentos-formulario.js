// FOREIGN FUNCTION´S LOCATION
// Get...    (/global/script/fetch.js)
// Msg...    (/global/script/mensagens.js)
// Valida... (/global/script/valida.js)
// ...Master (/atendimentos/script/atendimentos-master.js)

class Atendimento {
  constructor(id_atendimento, id_paciente, id_tratamento, id_formulario, titulotratamento, status, preenchido, data, horario, duracao, id_profissional,  queixa, quadrogeral, trajetodor, intensidadedor, tipodor, evolucao, agravante, atenuante, tratamentoanterior){
    this.id_atendimento = id_atendimento;
    this.id_paciente = id_paciente;
    this.id_tratamento = id_tratamento;
    this.id_formulario = id_formulario;
    this.titulotratamento = titulotratamento;
    this.status = status;
    this.preenchido = preenchido;
    this.data = data;
    this.horario = horario;
    this.duracao = duracao;
    this.id_profissional = id_profissional;
    this.queixa = queixa;
    this.quadrogeral = quadrogeral;
    this.trajetodor = trajetodor;
    this.intensidadedor = intensidadedor;
    this.tipodor = tipodor;
    this.evolucao = evolucao;
    this.agravante = agravante;
    this.atenuante = atenuante;
    this.tratamentoanterior = tratamentoanterior;
  }
}

let idAtendimento;
let idPaciente;
let idProfissional;
let idTratamento;
let tituloTratamento;
let status;
let dataAtendimento;
let horarioAtendimento;
let duracaoAtendimento;
let profissional;
let queixa;
let quadroGeral;
let ultimoQuadroGeral;
let trajetoDor;
let intensidadeDor;
let tipoDor;
let evolucaoQuadro;
let fatoresAgravantes;
let fatoresAtenuantes;
let tratamentosAnteriores;
let btnGravarAtendimento;


// TESTE TABS
let tabHome, contentHome;
let tabProfile, contentProfile;
let tabContact, contentContact;

async function ManipulaTratamentoAtendimento(acao, id_paciente, id_tratamento, id_atendimento, id_formulario){
  let retorno = await GetHtmlMain('/atendimentos/view/view-atendimentos-formulario.html');
  if (retorno.length>0) tagMain.innerHTML = retorno;
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contacte o Suporte TI.');
  let nomePaciente = document.querySelector('.button-link-image p');
  nomePaciente.textContent = arrayPacienteBd[indexPacienteBd].nome;
  idPaciente = id_paciente;
  idTratamento = id_tratamento;
  idAtendimento = id_atendimento;
  idProfissional =  1;     // MOCK - id virá do login
  tituloTratamento = document.querySelector('#titulo-tratamento');
  status = document.querySelector('#status');
  let dataTratamento = document.querySelector('#data-tratamento');
  let formulario = document.querySelector('#formulario');
  dataAtendimento = document.querySelector('#data-atendimento');
  horarioAtendimento = document.querySelector('#horario-atendimento');
  duracaoAtendimento = document.querySelector('#duracao-atendimento');
  profissional = document.querySelector('#profissional');
  quadroGeral = document.querySelector('#quadro-geral');
  btnCopiaQuadroGeral = document.querySelector('.copia-quadro-geral');
  queixa = document.querySelector('#queixa');
  trajetoDor = document.querySelector('#trajeto-dor');
  intensidadeDor = document.querySelector('#intensidade-dor');
  tipoDor = document.querySelector('#tipo-dor');
  evolucaoQuadro = document.querySelector('#evolucao-quadro');
  fatoresAgravantes = document.querySelector('#fatores-agravantes');
  fatoresAtenuantes = document.querySelector('#fatores-atenuantes');
  tratamentosAnteriores = document.querySelector('#tratamentos-anteriores');
  btnGravarAtendimento = document.querySelector('#gravar-atendimento');
  btnDescartarAtendimento = document.querySelector('#descartar-atendimento');
  btnDescartarAtendimento.addEventListener('click', () => {  CriaTelaAtendimentoMaster(indexPacienteBd) } );
  if (acao == 1) {
    dataTratamento.value = Hoje();  // /global/scripts/calcula.js
    dataAtendimento.value = Hoje();
    if (id_formulario == 10) formulario.value = 'Fisioterapêutico';
    if (id_formulario == 11) formulario.value = 'Fisioterapêutico infantil';
    if (id_formulario == 20) formulario.value = 'Osteopático';
    if (id_formulario == 21) formulario.value = 'Osteopático infantil';

    btnGravarAtendimento.addEventListener('click', ProcessaInclusaoTratamento);
  }
  if (acao == 2) {
    let idUltimoAtendimento = await GetQuadroGeral(id_tratamento);
    if (idUltimoAtendimento[0].ultimo) {
      btnCopiaQuadroGeral.removeAttribute('style');
      btnCopiaQuadroGeral.nextElementSibling.removeAttribute('style');
      let ultimoAtendimento = await GetAtendimento(idUltimoAtendimento[0].ultimo)
      ultimoQuadroGeral = ultimoAtendimento[0].quadrogeral;
    } 
    retornoPaciente = await GetPaciente(id_paciente);
    dataAtendimento.value = Hoje();
    if (retornoPaciente[0].id_formulario == 10) formulario.value = 'Fisioterapêutico';
    if (retornoPaciente[0].id_formulario == 11) formulario.value = 'Fisioterapêutico infantil';
    if (retornoPaciente[0].id_formulario == 20) formulario.value = 'Osteopático';
    if (retornoPaciente[0].id_formulario == 21) formulario.value = 'Osteopático infantil';
    let retornoTratamento = await GetTratamento(id_tratamento);
    if (retornoTratamento.length > 0){
      tituloTratamento.value = retornoTratamento[0].descricao;
      status.value = retornoTratamento[0].status;
      dataTratamento.value = retornoTratamento[0].datalog.substring(0,10);
      btnGravarAtendimento.addEventListener('click', ProcessaInclusaoAtendimento);
    }
  }
  if (acao == 3) {
    let data = await GetAtendimento(id_atendimento);
    tituloTratamento.value = data[0].titulotratamento;
    status.value = data[0].status;
    dataTratamento.value = data[0].datalog.substring(0,10);
    formulario.value = data[0].formulario;
    dataAtendimento.value = data[0].data.substring(0,10);
    horarioAtendimento.value = data[0].horario;
    duracaoAtendimento.value = data[0].duracao;
    profissional.value = data[0].profissional;
    quadroGeral.value = data[0].quadrogeral;
    queixa.value = data[0].queixa;
    trajetoDor.value = data[0].trajetodor;
    intensidadeDor.children[data[0].intensidadedor].children[0].checked = true;
    tipoDor.value = data[0].tipodor;
    evolucaoQuadro.value = data[0].evolucao;
    fatoresAgravantes.value = data[0].agravante;
    fatoresAtenuantes.value = data[0].atenuante;
    tratamentosAnteriores.value = data[0].tratamentoanterior;
    btnGravarAtendimento.addEventListener('click', ProcessaAlteracaoAtendimento);
  }

  // TESTE TABS
// tabs = document.querySelector('.nav-tabs');
// console.log (tabs.children[0].children[0].className,'  ',tabs.children[0].children[0].hash )
// console.log (tabs.children[1].children[0])
// console.log (tabs.children[2].children[0])
// childElementCount: 3 
// children: HTMLCollection 

tabHome = document.querySelector('#home-tab');
contentHome = document.querySelector('#home');
tabProfile = document.querySelector('#profile-tab');
contentProfile = document.querySelector('#profile');
tabContact = document.querySelector('#contact-tab');
contentContact = document.querySelector('#contact');
tabProfile.addEventListener('click', function () {
  this.setAttribute('class','nav-link active');
  contentProfile.setAttribute('class','tab-pane fade show active');
  tabHome.setAttribute('class','nav-link'); 
  contentHome.setAttribute('class','tab-pane fade');
  tabContact.setAttribute('class','nav-link'); 
  contentContact.setAttribute('class','tab-pane fade');
});
tabHome.addEventListener('click', function () {
  this.setAttribute('class','nav-link active');
  contentHome.setAttribute('class','tab-pane fade show active');
  tabProfile.setAttribute('class','nav-link'); 
  contentProfile.setAttribute('class','tab-pane fade');
  tabContact.setAttribute('class','nav-link'); 
  contentContact.setAttribute('class','tab-pane fade');
});
tabContact.addEventListener('click', function () {
  this.setAttribute('class','nav-link active');
  contentContact.setAttribute('class','tab-pane fade show active');
  tabProfile.setAttribute('class','nav-link'); 
  contentProfile.setAttribute('class','tab-pane fade');
  tabHome.setAttribute('class','nav-link'); 
  contentHome.setAttribute('class','tab-pane fade');
});


//////////////////
}



function CopiaQuadroGeral(){
  quadroGeral.value = ultimoQuadroGeral
}

async function ProcessaAlteracaoAtendimento(){
  let atendimento = ValidaAtendimento (idPaciente, idProfissional, idTratamento, idAtendimento);
  if (atendimento) { 
    if (atendimento.preenchido=='Completo') AlteraAtendimento(atendimento)
    else {
      let resultModal = await MsgCenterYesNo('warning','O formulário não foi preenchido totalmente!', 'O que deseja fazer?','Salvar mesmo assim','Preencher agora');
      if (resultModal.isConfirmed) AlteraAtendimento(atendimento)
    }
  }
}

async function ProcessaInclusaoAtendimento(){
 let atendimento = ValidaAtendimento (idPaciente, idProfissional, idTratamento);
 if (atendimento) { 
  if (atendimento.preenchido=='Completo') GravaAtendimento(atendimento)
  else {
    let resultModal = await MsgCenterYesNo('warning','O formulário não foi preenchido totalmente!', 'O que deseja fazer?','Salvar mesmo assim','Preencher agora');
    if (resultModal.isConfirmed) GravaAtendimento(atendimento)
  }
}
}

async function ProcessaInclusaoTratamento(){
  let atendimento = ValidaAtendimento (idPaciente, idProfissional);
  if (atendimento) { 
    if (atendimento.preenchido=='Completo') GravaTratamento(atendimento)
    else {
      let resultModal = await MsgCenterYesNo('warning','O formulário não foi preenchido totalmente!', 'O que deseja fazer?','Salvar mesmo assim','Preencher agora');
      if (resultModal.isConfirmed) GravaTratamento(atendimento)
    }
  }
}

let atendimento = new Atendimento();

function ValidaAtendimento(id_paciente, id_profissional, id_tratamento, id_atendimento){
  let alertTitulo='', alertData='', alertHorario='' , alertDuracao='',  alertQueixa='', alertIntensidade='', alertEvolucao='';
  atendimento.id_paciente = id_paciente;
  atendimento.id_profissional = id_profissional; 
  atendimento.id_tratamento = id_tratamento;
  atendimento.id_atendimento = id_atendimento;
  if (isEmpty(tituloTratamento.value)) alertTitulo='Título tratamento';
  else atendimento.titulotratamento = tituloTratamento.value;
  if (formulario.value == 'Fisioterapêutico') atendimento.id_formulario = 10;
  if (formulario.value == 'Fisioterapêutico infantil') atendimento.id_formulario = 11;
  if (formulario.value == 'Osteopático') atendimento.id_formulario = 20;
  if (formulario.value == 'Osteopático infantil') atendimento.id_formulario = 21;
  atendimento.status = status.value;
  if (dataAtendimento.value=='' || CalculaDiferencaDiasAtendimento(dataAtendimento.value) < 0) alertData='Data';
  else atendimento.data = dataAtendimento.value;
  if (horarioAtendimento.value=='') alertHorario='Horário';
  else atendimento.horario = horarioAtendimento.value;
  if (duracaoAtendimento.value=='') alertDuracao='Duração';
  else atendimento.duracao = duracaoAtendimento.value;
  if (isEmpty(queixa.value)) alertQueixa='Queixa';
  else atendimento.queixa = queixa.value;
  if (IntensidadeDorChecked(intensidadeDor) == 99) alertIntensidade='Intensidade'
  else atendimento.intensidadedor = IntensidadeDorChecked(intensidadeDor);
  if (isEmpty(evolucaoQuadro.value)) alertEvolucao='Evolução';
  else atendimento.evolucao = evolucaoQuadro.value;
  atendimento.quadrogeral = quadroGeral.value;
  atendimento.trajetodor = trajetoDor.value;
  atendimento.tipodor = tipoDor.value;
  atendimento.agravante = fatoresAgravantes.value;
  atendimento.atenuante = fatoresAtenuantes.value;
  atendimento.tratamentoanterior = tratamentosAnteriores.value;
  if (isEmpty(quadroGeral.value) || isEmpty(trajetoDor.value) || isEmpty(tipoDor.value) || isEmpty(fatoresAgravantes.value) || isEmpty(fatoresAtenuantes.value) ){
    atendimento.preenchido = 'Pendente'; 
  } else  atendimento.preenchido = 'Completo';
  if (alertTitulo=='' && alertData=='' && alertHorario=='' && alertDuracao=='' && alertQueixa=='' && alertIntensidade=='' && alertEvolucao=='') {
    return atendimento;
  }  
  else {
    MsgCenterButtonOkText('warning','Dados inconsistentes!',`Corrija: \n${alertTitulo} \n${alertData} \n${alertHorario} \n${alertDuracao} \n${alertQueixa} \n${alertIntensidade}  \n${alertEvolucao}`);
    return false;
  }
}  

async function GravaTratamento(atendimento){
  let retorno = await PostTratamento(JSON.stringify(atendimento)); 
  switch (retorno){
    case 0: MsgCenterText('success','Atendimento salvo!', ''); break;
    case 3: MsgCenterButtonOkText('error','Regra de negócio violada', 'Corrija'); break;    
    case 5: MsgCenterButtonOkText('error','Erro no servidor!', 'Contacte o Suporte TI'); break;      
  }
  setTimeout( ()=> { CriaTelaAtendimentoMaster(indexPacienteBd); }, 2500);
};

async function GravaAtendimento(atendimento){
  let retorno = await PostAtendimento(JSON.stringify(atendimento)); 
  switch (retorno){
    case 0: MsgCenterText('success','Atendimento salvo!', ''); break;
    case 3: MsgCenterButtonOkText('error','Regra de negócio violada', 'Corrija'); break;    
    case 5: MsgCenterButtonOkText('error','Erro no servidor!', 'Contacte o Suporte TI'); break;      
  }
  setTimeout( ()=> { CriaTelaAtendimentoMaster(indexPacienteBd); }, 2500);
};

async function AlteraAtendimento(atendimento){
  let retorno = await PutAtendimento(JSON.stringify(atendimento)); 
  switch (retorno){
    case 0: MsgCenterText('success','Atendimento salvo!', ''); break;
    case 3: MsgCenterButtonOkText('error','Regra de negócio violada', 'Corrija'); break;    
    case 5: MsgCenterButtonOkText('error','Erro no servidor!', 'Contacte o Suporte TI'); break;      
  }
  setTimeout( ()=> { CriaTelaAtendimentoMaster(indexPacienteBd); }, 2500);
};

function IntensidadeDorChecked(intensidade){
  let dorNumber = 99;
  for (i=0; i<=10; i++)  if (intensidade.children[i].children[0].checked) dorNumber = i;
  return dorNumber;
}


