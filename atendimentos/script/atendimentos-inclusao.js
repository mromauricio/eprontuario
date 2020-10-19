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

async function CriaTelaAtendimento(){
  let retorno = await GetHtmlMain('view-atendimentos-inclusao.html');
  if (retorno.length>0) tagMain.innerHTML = retorno;
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contacte o Suporte TI.');
  let nomePaciente = document.querySelector('.button-link-image p');
  nomePaciente.textContent = arrayPacienteBd[indexPacienteBd].nome + ' - atendimento nº XXX';
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
// VALIDAR OS CAMPOS ANTES DE ATRIBUIR A CLASSE
atendimento.id_paciente = idPaciente;
atendimento.id_profissional = 1; // MOCK - id virá do login
let alertData, alertHorario, alertDuracao = ''
if (dataAtendimento.value=='') alertData='Preencha a data';
// SE DATA MAIOR QUE HOJE - TAMBÉM CRITICAR 
atendimento.data = dataAtendimento.value;
atendimento.horario = horarioAtendimento.value;
atendimento.duracao = duracaoAtendimento.value;
atendimento.queixa = queixa.value;
atendimento.trajetodor = trajetoDor.value;
atendimento.intensidadedor = IntensidadeDorChecked(intensidadeDor);
atendimento.tipodor = tipoDor.value;
atendimento.evolucao = evolucaoQuadro.value;
atendimento.agravante = fatoresAgravantes.value;
atendimento.atenuante = fatoresAtenuantes.value;
atendimento.tratamentoanterior = tratamentosAnteriores.value;
if (alertData=='') GravaAtendimento(atendimento);
else console.log('ATENDIMENTO NÃO SERÁ GRAVADO');
}

async function GravaAtendimento(atendimento){
  let retorno = await PostAtendimento(JSON.stringify(atendimento)); 
  switch (retorno){
    case 0: MsgCenterText('success','Atendimento salvo!', ''); break;
    case 3: MsgCenterButtonOkText('error','Regra de negócio violada', 'Corrija'); break;    
    case 5: MsgCenterButtonOkText('error','Erro no servidor!', 'Contacte o Suporte TI'); break;      
  }
  setTimeout( ()=> { RetornaTelaAtendimentoMaster(); }, 3500);
};

function IntensidadeDorChecked(intensidade){
  let dorNumber = 99;
  for (i=0; i<=10; i++){
    if ( intensidade.children[i].children[0].checked ) dorNumber = i;
  }
  return dorNumber;
}

function RetornaTelaAtendimentoMaster(){
  CriaTelaAtendimentoMaster(indexPacienteBd);
}

