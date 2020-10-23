// FOREIGN FUNCTION´S LOCATION
// Get...    (/global/script/fetch.js)
// Msg...    (/global/script/mensagens.js)
// Valida... (/global/script/valida.js)
// ...Master (/atendimentos/script/atendimentos-master.js)

class Atendimento {
  constructor(id_paciente, id_profissional, data, horario, duracao,  queixa, trajetodor, intensidadedor, tipodor, evolucao, agravante, atenuante, tratamentoanterior){
    this.id_paciente = id_paciente;
    this.id_profissional = id_profissional;
    this.data = data;
    this.horario = horario;
    this.duracao = duracao;
    this.queixa = queixa;
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
let dataAtendimento;
let horarioAtendimento;
let duracaoAtendimento;
let profissional;
let queixa;
let trajetoDor;
let intensidadeDor;
let tipoDor;
let evolucaoQuadro;
let fatoresAgravantes;
let fatoresAtenuantes;
let tratamentosAnteriores;
let btnGravarAtendimento;

let atendimento = new Atendimento();

async function IncluiAtendimento(){
  let retorno = await GetHtmlMain('view-atendimentos-formulario.html');
  if (retorno.length>0) tagMain.innerHTML = retorno;
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contacte o Suporte TI.');
  let nomePaciente = document.querySelector('.button-link-image p');
  nomePaciente.textContent = arrayPacienteBd[indexPacienteBd].nome;
  idPaciente = arrayPacienteBd[indexPacienteBd].id_paciente;
  profissional = document.querySelector('#profissional');
  dataAtendimento = document.querySelector('#data-atendimento');
  horarioAtendimento = document.querySelector('#horario-atendimento');
  duracaoAtendimento = document.querySelector('#duracao-atendimento');
  queixa = document.querySelector('#queixa');
  trajetoDor = document.querySelector('#trajeto-dor');
  intensidadeDor = document.querySelector('#intensidade-dor');
  tipoDor = document.querySelector('#tipo-dor');
  evolucaoQuadro = document.querySelector('#evolucao-quadro');
  fatoresAgravantes = document.querySelector('#fatores-agravantes');
  fatoresAtenuantes = document.querySelector('#fatores-atenuantes');
  tratamentosAnteriores = document.querySelector('#tratamentos-anteriores');

  btnGravarAtendimento = document.querySelector('#gravar-atendimento');
  btnGravarAtendimento.addEventListener('click', ValidaAtendimento);
}

function ValidaAtendimento(){
atendimento.id_paciente = idPaciente;

atendimento.id_profissional = 1; // MOCK - id virá do login

let alertData='', alertHorario='' , alertDuracao='', alertQueixa='', alertIntensidade='', alertTrajetodor='', alertTipodor='', alertEvolucao='', alertAgravante='', alertAtenuante='';
if (dataAtendimento.value=='' || CalculaDiferencaDiasAtendimento(dataAtendimento.value) < 0) alertData='data';
else atendimento.data = dataAtendimento.value;
if (horarioAtendimento.value=='') alertHorario='horário';
else atendimento.horario = horarioAtendimento.value;
if (duracaoAtendimento.value=='') alertDuracao='duração';
else atendimento.duracao = duracaoAtendimento.value;
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
if (alertData=='' && alertHorario=='' && alertDuracao=='' && alertQueixa=='' && alertIntensidade=='' && alertTrajetodor=='' && alertTipodor=='' && alertEvolucao=='' && alertAgravante=='' && alertAtenuante=='') {
  GravaAtendimento(atendimento);
}  
else MsgCenterButtonOkText('warning','Dados inconsistentes!',`Corrija: ${alertData} - ${alertHorario} - ${alertDuracao} - ${alertQueixa} - ${alertIntensidade} - ${alertTrajetodor} - ${alertTipodor} - ${alertEvolucao} - ${alertAgravante} - ${alertAtenuante}`);
}

async function GravaAtendimento(atendimento){
  let retorno = await PostAtendimento(JSON.stringify(atendimento)); 
  switch (retorno){
    case 0: MsgCenterText('success','Atendimento salvo!', ''); break;
    case 3: MsgCenterButtonOkText('error','Regra de negócio violada', 'Corrija'); break;    
    case 5: MsgCenterButtonOkText('error','Erro no servidor!', 'Contacte o Suporte TI'); break;      
  }
  setTimeout( ()=> { CriaTelaAtendimentoMaster(indexPacienteBd); }, 3500);
};

function IntensidadeDorChecked(intensidade){
  let dorNumber = 99;
  for (i=0; i<=10; i++){
    if ( intensidade.children[i].children[0].checked ) dorNumber = i;
  }
  return dorNumber;
}


