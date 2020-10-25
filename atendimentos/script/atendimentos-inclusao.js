// FOREIGN FUNCTION´S LOCATION
// Get...    (/global/script/fetch.js)
// Msg...    (/global/script/mensagens.js)
// Valida... (/global/script/valida.js)
// ...Master (/atendimentos/script/atendimentos-master.js)

class Atendimento {
  constructor(id_paciente, titulotratamento, status,  data, horario, duracao, id_profissional,  queixa, quadrogeral, trajetodor, intensidadedor, tipodor, evolucao, agravante, atenuante, tratamentoanterior){
    this.id_paciente = id_paciente;
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
let idPaciente;
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

async function IncluiTratamento(id_paciente){
  let retorno = await GetHtmlMain('view-atendimentos-inclusao.html');
  if (retorno.length>0) tagMain.innerHTML = retorno;
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contacte o Suporte TI.');
  let nomePaciente = document.querySelector('.button-link-image p');
  nomePaciente.textContent = arrayPacienteBd[indexPacienteBd].nome;
  idPaciente = id_paciente;
  tituloTratamento = document.querySelector('#titulo-tratamento');
  status = document.querySelector('#status');
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
  btnGravarAtendimento.addEventListener('click', ProcessaInclusaoAtendimento);
}

function ProcessaInclusaoAtendimento(){
  id_paciente = idPaciente;
  id_profissional =  1;     // MOCK - id virá do login
  let atendimento = ValidaAtendimento (id_paciente, id_profissional);
  if (atendimento) GravaTratamento(atendimento)
}

function ValidaAtendimento(id_paciente, id_profissional){
  let alertTitulo='', alertData='', alertHorario='' , alertDuracao='', alertQuadroGeral='', alertQueixa='', alertIntensidade='', alertTrajetodor='', alertTipodor='', alertEvolucao='', alertAgravante='', alertAtenuante='';
  atendimento.id_paciente = id_paciente;
  atendimento.id_profissional = id_profissional; 
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

function IntensidadeDorChecked(intensidade){
  let dorNumber = 99;
  for (i=0; i<=10; i++){
    if ( intensidade.children[i].children[0].checked ) dorNumber = i;
  }
  return dorNumber;
}



