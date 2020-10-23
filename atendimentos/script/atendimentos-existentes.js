// FOREIGN FUNCTION´S LOCATION
// Get...    (/global/script/fetch.js)
// Msg...    (/global/script/mensagens.js)
// Valida... (/global/script/valida.js)
// ...Master (/atendimentos/script/atendimentos-master.js)

async function VaiParaAtendimento (id_paciente, id_atendimento){
  let retorno = await GetAtendimento(id_paciente, id_atendimento);
  if (retorno.length>0) ExibeAtendimento(retorno[0]);
}
let id_atendimento, id_paciente, id_profissional;
async function ExibeAtendimento(data){
  id_atendimento = data.id_atendimento;
  id_paciente = data.id_paciente;
  id_profissional = data.id_profissional;
  let retorno = await GetHtmlMain('view-atendimentos-formulario.html');
  if (retorno.length>0) tagMain.innerHTML = retorno;
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contacte o Suporte TI.');
  let nomePaciente = document.querySelector('.button-link-image p');
  nomePaciente.textContent = data.paciente;
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

  profissional.value = data.profissional;
  dataAtendimento.value = data.data.substring(0,10);
  horarioAtendimento.value = data.horario;
  duracaoAtendimento.value = data.duracao;
  queixa.value = data.queixa;
  trajetoDor.value = data.trajetodor;
  intensidadeDor.children[data.intensidadedor].children[0].checked = true;
  tipoDor.value = data.tipodor;
  evolucaoQuadro.value = data.evolucao;
  fatoresAgravantes.value = data.agravante;
  fatoresAtenuantes.value = data.atenuante;
  tratamentosAnteriores.value = data.tratamentoanterior;

  btnGravarAtendimento = document.querySelector('#gravar-atendimento');
  btnGravarAtendimento.addEventListener('click', ValidaAlteracaoAtendimento);
}

function ValidaAlteracaoAtendimento(){
  atendimento.id_atendimento = id_atendimento;
  atendimento.id_paciente = id_paciente;
  atendimento.id_profissional = id_profissional;
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
    AlteraAtendimento(atendimento);
  }  
  else MsgCenterButtonOkText('warning','Dados inconsistentes!',`Corrija: ${alertData} - ${alertHorario} - ${alertDuracao} - ${alertQueixa} - ${alertIntensidade} - ${alertTrajetodor} - ${alertTipodor} - ${alertEvolucao} - ${alertAgravante} - ${alertAtenuante}`);
  }

  async function AlteraAtendimento(atendimento){
    let retorno = await PutAtendimento(JSON.stringify(atendimento)); 
    switch (retorno){
      case 0: MsgCenterText('success','Atendimento salvo!', ''); break;
      case 3: MsgCenterButtonOkText('error','Regra de negócio violada', 'Corrija'); break;    
      case 5: MsgCenterButtonOkText('error','Erro no servidor!', 'Contacte o Suporte TI'); break;      
    }
    setTimeout( ()=> { RetornaTelaAtendimentosMaster(); }, 3500);
  };

  async function RetornaTelaAtendimentosMaster() {
    let retorno = await GetHtmlMain('view-atendimentos-master.html');
    if (retorno.length>0) { 
    tagMain.innerHTML = retorno;
    let retornoPaciente = await GetPaciente(id_paciente);
    ExibePacienteAtendimento(retornoPaciente[0]);
    ExibeAtendimentosAnteriores(retornoPaciente[0].id_paciente)
    }  
  }