// FOREIGN FUNCTION´S LOCATION
// Get...    (/global/script/fetch.js)
// Msg...    (/global/script/mensagens.js)
// Valida... (/global/script/valida.js)
// ...Master (/atendimentos/script/atendimentos-master.js)

class Atendimento {
  constructor(id_atendimento, id_paciente, id_tratamento, titulotratamento, status,  data, horario, duracao, id_profissional,  queixa, quadrogeral, trajetodor, intensidadedor, tipodor, evolucao, agravante, atenuante, tratamentoanterior){
    this.id_atendimento = id_atendimento;
    this.id_paciente = id_paciente;
    this.id_tratamento = id_tratamento;
    this.titulotratamento = titulotratamento;
    this.status = status;
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
let trajetoDor;
let intensidadeDor;
let tipoDor;
let evolucaoQuadro;
let fatoresAgravantes;
let fatoresAtenuantes;
let tratamentosAnteriores;
let btnGravarAtendimento;

let atendimento = new Atendimento();

async function ManipulaTratamentoAtendimento(acao, id_paciente, id_tratamento, id_atendimento){
  let retorno = await GetHtmlMain('view-atendimentos-inclusao.html');
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
  dataTratamento = document.querySelector('#data-tratamento');
  dataAtendimento = document.querySelector('#data-atendimento');
  horarioAtendimento = document.querySelector('#horario-atendimento');
  duracaoAtendimento = document.querySelector('#duracao-atendimento');
  profissional = document.querySelector('#profissional');
  quadroGeral = document.querySelector('#quadro-geral');
  queixa = document.querySelector('#queixa');
  trajetoDor = document.querySelector('#trajeto-dor');
  intensidadeDor = document.querySelector('#intensidade-dor');
  tipoDor = document.querySelector('#tipo-dor');
  evolucaoQuadro = document.querySelector('#evolucao-quadro');
  fatoresAgravantes = document.querySelector('#fatores-agravantes');
  fatoresAtenuantes = document.querySelector('#fatores-atenuantes');
  tratamentosAnteriores = document.querySelector('#tratamentos-anteriores');

  btnGravarAtendimento = document.querySelector('#gravar-atendimento');
  if (acao == 1) {
    dataTratamento.value = Hoje();  // /global/scripts/calcula.js
    dataAtendimento.value = Hoje();
    btnGravarAtendimento.addEventListener('click', ProcessaInclusaoTratamento);
  }
  if (acao == 2) {
    dataAtendimento.value = Hoje();
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
    console.log(data[0])
    tituloTratamento.value = data[0].titulotratamento;
    status.value = data[0].status;
    dataTratamento.value = data[0].datalog.substring(0,10);
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
}

function ProcessaAlteracaoAtendimento(){
  let atendimento = ValidaAtendimento (idPaciente, idProfissional, idTratamento, idAtendimento);
  if (atendimento) AlteraAtendimento(atendimento)
}

function ProcessaInclusaoAtendimento(){
 let atendimento = ValidaAtendimento (idPaciente, idProfissional, idTratamento);
 if (atendimento) GravaAtendimento(atendimento);
}

function ProcessaInclusaoTratamento(){
  let atendimento = ValidaAtendimento (idPaciente, idProfissional);
  if (atendimento) GravaTratamento(atendimento)
}

function ValidaAtendimento(id_paciente, id_profissional, id_tratamento, id_atendimento){
  let alertTitulo='', alertData='', alertHorario='' , alertDuracao='', alertQuadroGeral='', alertQueixa='', alertIntensidade='', alertTrajetodor='', alertTipodor='', alertEvolucao='', alertAgravante='', alertAtenuante='';
  atendimento.id_paciente = id_paciente;
  atendimento.id_profissional = id_profissional; 
  atendimento.id_tratamento = id_tratamento;
  atendimento.id_atendimento = id_atendimento;
  if (isEmpty(tituloTratamento.value)) alertTitulo='título tratamento';
  else atendimento.titulotratamento = tituloTratamento.value;
  atendimento.status = status.value;
  if (dataAtendimento.value=='' || CalculaDiferencaDiasAtendimento(dataAtendimento.value) < 0) alertData='data';
  else atendimento.data = dataAtendimento.value;
  if (horarioAtendimento.value=='') alertHorario='horário';
  else atendimento.horario = horarioAtendimento.value;
  if (duracaoAtendimento.value=='') alertDuracao='duração';
  else atendimento.duracao = duracaoAtendimento.value;
  if (isEmpty(quadroGeral.value)) alertQuadroGeral='quadro geral';
  else atendimento.quadrogeral = quadroGeral.value;
  if (isEmpty(queixa.value)) alertQueixa='queixa';
  else atendimento.queixa = queixa.value;
  if (IntensidadeDorChecked(intensidadeDor) == 99) alertIntensidade='intensidade'
  else atendimento.intensidadedor = IntensidadeDorChecked(intensidadeDor);
  if (IntensidadeDorChecked(intensidadeDor) == 0){
    atendimento.trajetodor = trajetoDor.value;
    atendimento.tipodor = tipoDor.value;
    atendimento.agravante = fatoresAgravantes.value;
    atendimento.atenuante = fatoresAtenuantes.value;
  }
  else {
    if (isEmpty(trajetoDor.value)) alertTrajetodor='trajeto dor';
    else atendimento.trajetodor = trajetoDor.value;
    if (isEmpty(tipoDor.value)) alertTipodor='tipo dor';
    else atendimento.tipodor = tipoDor.value;
    if (isEmpty(fatoresAgravantes.value)) alertAgravante='agravantes';
    else atendimento.agravante = fatoresAgravantes.value;
    if (isEmpty(fatoresAtenuantes.value)) alertAtenuante='atenuantes';
    else atendimento.atenuante = fatoresAtenuantes.value;
  }
  if (isEmpty(evolucaoQuadro.value)) alertEvolucao='evolução';
  else atendimento.evolucao = evolucaoQuadro.value;
  atendimento.tratamentoanterior = tratamentosAnteriores.value;
  if (alertTitulo=='' && alertData=='' && alertHorario=='' && alertDuracao=='' && alertQueixa=='' && alertIntensidade=='' && alertTrajetodor=='' && alertTipodor=='' && alertEvolucao=='' && alertAgravante=='' && alertAtenuante=='') {
    return atendimento;
  }  
  else {
    MsgCenterButtonOkText('warning','Dados inconsistentes!',`Corrija: ${alertTitulo} ${alertData} ${alertHorario} ${alertDuracao} ${alertQueixa} ${alertQuadroGeral} ${alertIntensidade}  ${alertTrajetodor}  ${alertTipodor}  ${alertEvolucao}  ${alertAgravante}  ${alertAtenuante}`);
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


