// FOREIGN FUNCTION´S LOCATION
// Get...    (/global/script/fetch.js)
// Msg...    (/global/script/mensagens.js)
// Valida... (/global/script/valida.js)
// ...Master (/atendimentos/script/atendimentos-master.js)

class Atendimento {
  constructor(id_atendimento, id_paciente, id_tratamento, id_formulario, titulotratamento, status, preenchido, data, horario, duracao, id_profissional,  queixa, avaliacao, quadrogeral, trajetodor, intensidadedor, tipodor,  agravante, atenuante, tratamentoanterior, faixaetaria){
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
    this.avaliacao = avaliacao;
    this.quadrogeral = quadrogeral;
    this.trajetodor = trajetodor;
    this.intensidadedor = intensidadedor;
    this.tipodor = tipodor;
    this.agravante = agravante;
    this.atenuante = atenuante;
    this.tratamentoanterior = tratamentoanterior;
    this.faixaetaria = faixaetaria;
  }
}

let idAtendimento;
let idPaciente;
let idProfissional;
let idTratamento;
let dataTratamento;
let tituloTratamento;
let formulario; 
let status;
let dataAtendimento;
let horarioAtendimento;
let duracaoAtendimento;
let profissional;
let queixa;
let relato;
let avaliacao;
let quadroGeral;
let ultimoQuadroGeral;
let trajetoDor;
let intensidadeDor;
let tipoDor;
let fatoresAgravantes;
let fatoresAtenuantes;
let tratamentosAnteriores;
let btnGravarAtendimento;
let btnDescartarAtendimento;
let btnApagarAtendimento;

let tab1a, content1a, tab1b, content1b, tab2, content2, tab3, content3, tab4, content4, tab5, content5, tab6, content6, instrucao;

async function ManipulaTratamentoAtendimento(acao, id_paciente, id_tratamento, id_atendimento, id_formulario){
  idPaciente = id_paciente;
  idTratamento = id_tratamento;
  idAtendimento = id_atendimento;
  idProfissional =  1;     // MOCK - id virá do login
  let loadTelaOk = await CriaTelaFormularioTratamentoAtendimento();
  if (loadTelaOk) {
    if (acao == 1) {
      dataTratamento.value = Hoje();  // /global/scripts/calcula.js
      dataAtendimento.value = Hoje();
      if (id_formulario == null) { formulario.value = ''; habilitaTabsFormulario(formulario.value); } 
      if (id_formulario == 10)   { formulario.value = 'Fisioterapêutico'; habilitaTabsFormulario(formulario.value); } 
      if (id_formulario == 11)   { formulario.value = 'Fisioterapêutico infantil'; habilitaTabsFormulario(formulario.value); }  
      if (id_formulario == 20)   { formulario.value = 'Osteopático'; habilitaTabsFormulario(formulario.value); } 
      if (id_formulario == 21)   { formulario.value = 'Osteopático infantil'; habilitaTabsFormulario(formulario.value); } 
      btnGravarAtendimento.addEventListener('click', ProcessaInclusaoTratamento);
      btnApagarAtendimento.setAttribute('style','display: none');
    }
    if (acao == 2) {
      let idUltimoAtendimento = await GetQuadroGeral(id_tratamento);
      if (idUltimoAtendimento[0].ultimo) {
        btnCopiaQuadroGeral.removeAttribute('style');
        btnCopiaQuadroGeral.nextElementSibling.removeAttribute('style');
        let ultimoAtendimento = await GetAtendimento(idUltimoAtendimento[0].ultimo)
        ultimoQuadroGeral = ultimoAtendimento[0].quadrogeral;
      } 
      dataAtendimento.value = Hoje();
      retornoPaciente = await GetPaciente(id_paciente);
      if (retornoPaciente[0].id_formulario == null) { formulario.value = ''; habilitaTabsFormulario(formulario.value); } 
      if (retornoPaciente[0].id_formulario == 10) { formulario.value = 'Fisioterapêutico'; habilitaTabsFormulario(formulario.value); } 
      if (retornoPaciente[0].id_formulario == 11) { formulario.value = 'Fisioterapêutico infantil'; habilitaTabsFormulario(formulario.value); }  
      if (retornoPaciente[0].id_formulario == 20) { formulario.value = 'Osteopático'; habilitaTabsFormulario(formulario.value); } 
      if (retornoPaciente[0].id_formulario == 21) { formulario.value = 'Osteopático infantil'; habilitaTabsFormulario(formulario.value); } 
      let retornoTratamento = await GetTratamento(id_tratamento);
      if (retornoTratamento.length > 0){
        tituloTratamento.value = retornoTratamento[0].descricao;
        status.value = retornoTratamento[0].status;
        dataTratamento.value = retornoTratamento[0].datalog.substring(0,10);
        btnGravarAtendimento.addEventListener('click', ProcessaInclusaoAtendimento);
        btnApagarAtendimento.setAttribute('style','display: none');
      }
    }
    if (acao == 3) {
      let data = await GetAtendimento(id_atendimento);
      tituloTratamento.value = data[0].titulotratamento;
      status.value = data[0].status;
      dataTratamento.value = data[0].datalog.substring(0,10);
      dataAtendimento.value = data[0].data.substring(0,10);
      horarioAtendimento.value = data[0].horario;
      duracaoAtendimento.value = data[0].duracao;
      formulario.value = data[0].formulario;
      if (formulario.value == 'Fisioterapêutico') habilitaTabsFormulario(formulario.value); 
      if (formulario.value == 'Fisioterapêutico infantil') habilitaTabsFormulario(formulario.value); 
      if (formulario.value == 'Osteopático') habilitaTabsFormulario(formulario.value); 
      if (formulario.value == 'Osteopático infantil') habilitaTabsFormulario(formulario.value); 
      profissional.value = data[0].profissional;
      quadroGeral.value = data[0].quadrogeral;
      (formulario.value == 'Fisioterapêutico infantil') ? relato.value = data[0].queixa : queixa.value = data[0].queixa;
      avaliacao.value = data[0].avaliacao;
      trajetoDor.value = data[0].trajetodor;
      if (data[0].intensidadedor == 99) data[0].intensidadedor = 0;
      intensidadeDor.children[data[0].intensidadedor].children[0].checked = true;
      tipoDor.value = data[0].tipodor;
      fatoresAgravantes.value = data[0].agravante;
      fatoresAtenuantes.value = data[0].atenuante;
      tratamentosAnteriores.value = data[0].tratamentoanterior;
      btnGravarAtendimento.addEventListener('click', ProcessaAlteracaoAtendimento);
    }
  }
}


async function CriaTelaFormularioTratamentoAtendimento(){
  let retorno = await GetHtmlMain('/atendimentos/view/view-atendimentos-formulario.html');
  if (retorno.length>0) tagMain.innerHTML = retorno;
  if (retorno == 2) { 
    MsgCenterButtonText('error','HTML não localizado.', 'Contate o Suporte TI.');
    return false;
  }
  let nomePaciente = document.querySelector('.button-link-image p');
  nomePaciente.textContent = arrayPacienteBd[indexPacienteBd].nome;
  tituloTratamento = document.querySelector('#titulo-tratamento');
  status = document.querySelector('#status');
  dataTratamento = document.querySelector('#data-tratamento');
  formulario = document.querySelector('#formulario');
  dataAtendimento = document.querySelector('#data-atendimento');
  horarioAtendimento = document.querySelector('#horario-atendimento');
  duracaoAtendimento = document.querySelector('#duracao-atendimento');
  profissional = document.querySelector('#profissional');

  instrucao = document.querySelector('#instrucao');
  tab1a = document.querySelector('#tab1a');
  tab1b = document.querySelector('#tab1b');
  tab2 = document.querySelector('#tab2');
  tab3a = document.querySelector('#tab3a');
  tab3b = document.querySelector('#tab3b');
  tab4 = document.querySelector('#tab4');
  tab5 = document.querySelector('#tab5');
  tab6 = document.querySelector('#tab6');
  content1a = document.querySelector('#content1a');
  content1b = document.querySelector('#content1b');
  content2 = document.querySelector('#content2');
  content3a = document.querySelector('#content3a');
  content3b = document.querySelector('#content3b');
  content4 = document.querySelector('#content4');
  content5 = document.querySelector('#content5');
  content6 = document.querySelector('#content6');
  //tab1a content
  quadroGeral = document.querySelector('#quadro-geral');
  btnCopiaQuadroGeral = document.querySelector('.copia-quadro-geral');
  queixa = document.querySelector('#queixa');
  trajetoDor = document.querySelector('#trajeto-dor');
  intensidadeDor = document.querySelector('#intensidade-dor');
  tipoDor = document.querySelector('#tipo-dor');
  fatoresAgravantes = document.querySelector('#fatores-agravantes');
  fatoresAtenuantes = document.querySelector('#fatores-atenuantes');
  tratamentosAnteriores = document.querySelector('#tratamentos-anteriores');
  //tab1b content
  relato = document.querySelector('#relato-resp');
  avaliacao = document.querySelector('#avaliacao');
  //tab2
  cardiologicoCheck = document.querySelector('#check-cardiologico');
  cardiologicoText = document.querySelector('#text-cardiologico');
  vascularCheck = document.querySelector('#check-vascular');
  vascularText = document.querySelector('#text-vascular');
  //buttons
  btnGravarAtendimento = document.querySelector('#gravar-atendimento');
  btnDescartarAtendimento = document.querySelector('#descartar-atendimento');
  btnApagarAtendimento = document.querySelector('#apagar-atendimento');
  // Listeners
  formulario.addEventListener('click', ()=>{ habilitaTabsFormulario(formulario.value);});
  tab1a.addEventListener('click', ()=> {tab1a.setAttribute('class','nav-link active'); content1a.setAttribute('class','tab-pane fade show active'); tab1b.setAttribute('class','nav-link'); content1b.setAttribute('class','tab-pane fade'); tab2.setAttribute('class','nav-link'); content2.setAttribute('class','tab-pane fade'); tab3a.setAttribute('class','nav-link'); content3a.setAttribute('class','tab-pane fade'); tab3b.setAttribute('class','nav-link'); content3b.setAttribute('class','tab-pane fade'); tab4.setAttribute('class','nav-link'); content4.setAttribute('class','tab-pane fade'); tab5.setAttribute('class','nav-link'); content5.setAttribute('class','tab-pane fade'); tab6.setAttribute('class','nav-link'); content6.setAttribute('class','tab-pane fade'); });
  tab1b.addEventListener('click', ()=> {tab1b.setAttribute('class','nav-link active'); content1b.setAttribute('class','tab-pane fade show active'); tab1a.setAttribute('class','nav-link'); content1a.setAttribute('class','tab-pane fade'); tab2.setAttribute('class','nav-link'); content2.setAttribute('class','tab-pane fade'); tab3a.setAttribute('class','nav-link'); content3a.setAttribute('class','tab-pane fade'); tab3b.setAttribute('class','nav-link'); content3b.setAttribute('class','tab-pane fade'); tab4.setAttribute('class','nav-link'); content4.setAttribute('class','tab-pane fade'); tab5.setAttribute('class','nav-link'); content5.setAttribute('class','tab-pane fade'); tab6.setAttribute('class','nav-link'); content6.setAttribute('class','tab-pane fade'); });
  tab2.addEventListener('click',  ()=> {tab2.setAttribute('class','nav-link active'); content2.setAttribute('class','tab-pane fade show active'); tab1a.setAttribute('class','nav-link'); content1a.setAttribute('class','tab-pane fade'); tab1b.setAttribute('class','nav-link'); content1b.setAttribute('class','tab-pane fade'); tab3a.setAttribute('class','nav-link'); content3a.setAttribute('class','tab-pane fade'); tab3b.setAttribute('class','nav-link'); content3b.setAttribute('class','tab-pane fade'); tab4.setAttribute('class','nav-link'); content4.setAttribute('class','tab-pane fade'); tab5.setAttribute('class','nav-link'); content5.setAttribute('class','tab-pane fade'); tab6.setAttribute('class','nav-link'); content6.setAttribute('class','tab-pane fade'); });
  tab3a.addEventListener('click',  ()=> {tab3a.setAttribute('class','nav-link active'); content3a.setAttribute('class','tab-pane fade show active'); tab1a.setAttribute('class','nav-link'); content1a.setAttribute('class','tab-pane fade'); tab1b.setAttribute('class','nav-link'); content1b.setAttribute('class','tab-pane fade'); tab2.setAttribute('class','nav-link'); content2.setAttribute('class','tab-pane fade'); tab3b.setAttribute('class','nav-link'); content3b.setAttribute('class','tab-pane fade'); tab4.setAttribute('class','nav-link'); content4.setAttribute('class','tab-pane fade'); tab5.setAttribute('class','nav-link'); content5.setAttribute('class','tab-pane fade'); tab6.setAttribute('class','nav-link'); content6.setAttribute('class','tab-pane fade'); });
  tab3b.addEventListener('click',  ()=> {tab3b.setAttribute('class','nav-link active'); content3b.setAttribute('class','tab-pane fade show active'); tab1a.setAttribute('class','nav-link'); content1a.setAttribute('class','tab-pane fade'); tab1b.setAttribute('class','nav-link'); content1b.setAttribute('class','tab-pane fade'); tab2.setAttribute('class','nav-link'); content2.setAttribute('class','tab-pane fade'); tab3a.setAttribute('class','nav-link'); content3a.setAttribute('class','tab-pane fade'); tab4.setAttribute('class','nav-link'); content4.setAttribute('class','tab-pane fade'); tab5.setAttribute('class','nav-link'); content5.setAttribute('class','tab-pane fade'); tab6.setAttribute('class','nav-link'); content6.setAttribute('class','tab-pane fade'); });
  tab4.addEventListener('click',  ()=> {tab4.setAttribute('class','nav-link active'); content4.setAttribute('class','tab-pane fade show active'); tab1a.setAttribute('class','nav-link'); content1a.setAttribute('class','tab-pane fade'); tab1b.setAttribute('class','nav-link'); content1b.setAttribute('class','tab-pane fade'); tab2.setAttribute('class','nav-link'); content2.setAttribute('class','tab-pane fade'); tab3a.setAttribute('class','nav-link'); content3a.setAttribute('class','tab-pane fade'); tab3b.setAttribute('class','nav-link'); content3b.setAttribute('class','tab-pane fade'); tab5.setAttribute('class','nav-link'); content5.setAttribute('class','tab-pane fade'); tab6.setAttribute('class','nav-link'); content6.setAttribute('class','tab-pane fade'); });
  tab5.addEventListener('click',  ()=> {tab5.setAttribute('class','nav-link active'); content5.setAttribute('class','tab-pane fade show active'); tab1a.setAttribute('class','nav-link'); content1a.setAttribute('class','tab-pane fade'); tab1b.setAttribute('class','nav-link'); content1b.setAttribute('class','tab-pane fade'); tab2.setAttribute('class','nav-link'); content2.setAttribute('class','tab-pane fade'); tab3a.setAttribute('class','nav-link'); content3a.setAttribute('class','tab-pane fade'); tab3b.setAttribute('class','nav-link'); content3b.setAttribute('class','tab-pane fade'); tab4.setAttribute('class','nav-link'); content4.setAttribute('class','tab-pane fade'); tab6.setAttribute('class','nav-link'); content6.setAttribute('class','tab-pane fade'); });
  tab6.addEventListener('click',  ()=> {tab6.setAttribute('class','nav-link active'); content6.setAttribute('class','tab-pane fade show active'); tab1a.setAttribute('class','nav-link'); content1a.setAttribute('class','tab-pane fade'); tab1b.setAttribute('class','nav-link'); content1b.setAttribute('class','tab-pane fade'); tab2.setAttribute('class','nav-link'); content2.setAttribute('class','tab-pane fade'); tab3a.setAttribute('class','nav-link'); content3a.setAttribute('class','tab-pane fade'); tab3b.setAttribute('class','nav-link'); content3b.setAttribute('class','tab-pane fade'); tab4.setAttribute('class','nav-link'); content4.setAttribute('class','tab-pane fade'); tab5.setAttribute('class','nav-link'); content5.setAttribute('class','tab-pane fade'); });
  cardiologicoCheck.addEventListener('click', ()=> { (cardiologicoCheck.checked) ? cardiologicoText.removeAttribute('style') : cardiologicoText.setAttribute('style','display: none') });
  vascularCheck.addEventListener('click', ()=> { (vascularCheck.checked) ? vascularText.removeAttribute('style') : vascularText.setAttribute('style','display: none') });
  btnDescartarAtendimento.addEventListener('click',DescartaAtendimento );
  btnApagarAtendimento.addEventListener('click', ApagaAtendimento );
  return true;
}

async function DescartaAtendimento () {
  let resposta = await MsgCenterYesNo('warning', 'Ao sair as alterações não serão gravadas', 'Deseja sair?', 'Sim', 'Não');
  if (resposta.isConfirmed){ Swal.close(); CriaTelaAtendimentoMaster(indexPacienteBd) } 
  else Swal.close();
}

async function ApagaAtendimento (){
  let resposta = await MsgCenterYesNo('warning', 'Ao prosseguir este atendimento será excluído em definitivo', 'Deseja prosseguir?', 'Sim', 'Não');
  if (resposta.isConfirmed){ 
    Swal.close(); 
    let resultDelete = await DeleteAtendimento(JSON.stringify({"id_atendimento":idAtendimento}));
    switch (resultDelete){
      case 0: MsgCenterText('success','Atendimento apagado!', ''); break;
      case 3: MsgCenterButtonOkText('error','Regra de negócio violada', 'Corrija'); break;    
      case 5: MsgCenterButtonOkText('error','Erro no servidor!', 'Contate o Suporte TI'); break;      
    }
    setTimeout( ()=> { CriaTelaAtendimentoMaster(indexPacienteBd); }, 2500);
  } 
  else Swal.close();
}

function habilitaTabsFormulario(formulario){
  if (formulario == '' ) {
    instrucao.textContent = 'Instrução: preencha todos os dados acima.';
    tab1a.setAttribute('style','display: none');
    tab1a.setAttribute('class','nav-link'); 
    content1a.setAttribute('class','tab-pane fade');
    tab1b.setAttribute('style','display: none');
    tab1b.setAttribute('class','nav-link'); 
    content1b.setAttribute('class','tab-pane fade');
    tab2.setAttribute('style','display: none');
    tab2.setAttribute('class','nav-link'); 
    content2.setAttribute('class','tab-pane fade');
    tab3a.setAttribute('style','display: none');
    tab3a.setAttribute('class','nav-link'); 
    content3a.setAttribute('class','tab-pane fade');
    tab3b.setAttribute('style','display: none');
    tab3b.setAttribute('class','nav-link'); 
    content3b.setAttribute('class','tab-pane fade');
    tab4.setAttribute('style','display: none');
    tab4.setAttribute('class','nav-link'); 
    content4.setAttribute('class','tab-pane fade');
    tab5.setAttribute('style','display: none');
    tab5.setAttribute('class','nav-link'); 
    content5.setAttribute('class','tab-pane fade');
    tab6.setAttribute('style','display: none');
    tab6.setAttribute('class','nav-link'); 
    content6.setAttribute('class','tab-pane fade');
    btnGravarAtendimento.setAttribute('style','display: none');
    btnDescartarAtendimento.setAttribute('style','display: none');
  } else {
    btnGravarAtendimento.removeAttribute('style');
    btnDescartarAtendimento.removeAttribute('style');
  }
  if (formulario == 'Fisioterapêutico' ) {
    instrucao.textContent = 'Instrução: preencha todas as abas e clique no botão Salvar.';
    tab1a.removeAttribute('style');
    tab1a.setAttribute('class','nav-link active');
    content1a.setAttribute('class','tab-pane fade show active');
    tab1b.setAttribute('style','display: none');
    content1b.setAttribute('class','tab-pane fade');
    tab2.setAttribute('style','display: none');
    content2.setAttribute('class','tab-pane fade');
    tab3a.removeAttribute('style');
    content3a.setAttribute('class','tab-pane fade');
    tab3b.setAttribute('style','display: none');
    content3b.setAttribute('class','tab-pane fade');
    tab4.removeAttribute('style');
    content4.setAttribute('class','tab-pane fade');
    tab5.removeAttribute('style');
    content5.setAttribute('class','tab-pane fade');
    tab6.removeAttribute('style');
    content6.setAttribute('class','tab-pane fade');
  }
  if (formulario == 'Fisioterapêutico infantil' ) {
    instrucao.textContent = 'Instrução: preencha todas as abas e clique no botão Salvar.';
    tab1b.removeAttribute('style');
    tab1b.setAttribute('class','nav-link active');
    content1b.setAttribute('class','tab-pane fade show active');
    tab1a.setAttribute('style','display: none');
    content1a.setAttribute('class','tab-pane fade');
    tab2.setAttribute('style','display: none');
    content2.setAttribute('class','tab-pane fade');
    tab3a.setAttribute('style','display: none');
    content3a.setAttribute('class','tab-pane fade');
    tab3b.setAttribute('style','display: none');
    content3b.setAttribute('class','tab-pane fade');
    tab4.removeAttribute('style');
    content4.setAttribute('class','tab-pane fade');
    tab5.removeAttribute('style');
    content5.setAttribute('class','tab-pane fade');
    tab6.removeAttribute('style');
    content6.setAttribute('class','tab-pane fade');
  }
  if (formulario == 'Osteopático' ) {
    instrucao.textContent = 'Instrução: preencha todas as abas e clique no botão Salvar.';
    tab1a.removeAttribute('style');
    tab1a.setAttribute('class','nav-link active');
    content1a.setAttribute('class','tab-pane fade show active');
    tab1b.setAttribute('style','display: none');
    content1b.setAttribute('class','tab-pane fade');
    tab2.removeAttribute('style');
    content2.setAttribute('class','tab-pane fade');
    tab3a.setAttribute('style','display: none');
    content3a.setAttribute('class','tab-pane fade');
    tab3b.removeAttribute('style');
    content3b.setAttribute('class','tab-pane fade');
    tab4.removeAttribute('style');
    content4.setAttribute('class','tab-pane fade');
    tab5.removeAttribute('style');
    content5.setAttribute('class','tab-pane fade');
    tab6.removeAttribute('style');
    content6.setAttribute('class','tab-pane fade');
  }
  if (formulario == 'Osteopático infantil' ) {
    instrucao.textContent = 'FORMULÁRIO EM DESENVOLVIMENTO!';
    tab1a.setAttribute('style','display: none');
    tab1a.setAttribute('class','nav-link'); 
    content1a.setAttribute('class','tab-pane fade');
    tab1b.setAttribute('style','display: none');
    tab1b.setAttribute('class','nav-link'); 
    content1b.setAttribute('class','tab-pane fade');
    tab2.setAttribute('style','display: none');
    tab2.setAttribute('class','nav-link'); 
    content2.setAttribute('class','tab-pane fade');
    tab3a.setAttribute('style','display: none');
    tab3a.setAttribute('class','nav-link'); 
    content3a.setAttribute('class','tab-pane fade');
    tab3a.setAttribute('style','display: none');
    tab3a.setAttribute('class','nav-link'); 
    content3a.setAttribute('class','tab-pane fade');
    tab3b.setAttribute('style','display: none');
    tab3b.setAttribute('class','nav-link'); 
    content3b.setAttribute('class','tab-pane fade');
    tab4.setAttribute('style','display: none');
    tab4.setAttribute('class','nav-link'); 
    content4.setAttribute('class','tab-pane fade');
    tab5.setAttribute('style','display: none');
    tab5.setAttribute('class','nav-link'); 
    content5.setAttribute('class','tab-pane fade');
    tab6.setAttribute('style','display: none');
    tab6.setAttribute('class','nav-link'); 
    content6.setAttribute('class','tab-pane fade');
  }
}
 
function CopiaQuadroGeral(){
  quadroGeral.value = ultimoQuadroGeral
}

async function ProcessaInclusaoTratamento(){
  let atendimento = ValidaAtendimento (idPaciente, idProfissional);
  if (atendimento) { 
    let retornoPaciente = await GetPaciente(idPaciente);
    atendimento.faixaetaria = CalculaFaixaEtaria(retornoPaciente[0].nascimento.substring(0,10));
    if (atendimento.preenchido=='Completo') GravaTratamento(atendimento)
    else {
      let resultModal = await MsgCenterYesNo('warning','O formulário não foi preenchido totalmente!', 'O que deseja fazer?','Salvar mesmo assim','Preencher agora');
      if (resultModal.isConfirmed) GravaTratamento(atendimento)
    }
  }
}

async function ProcessaInclusaoAtendimento(){
 let atendimento = ValidaAtendimento (idPaciente, idProfissional, idTratamento);
 if (atendimento) {  
  let retornoPaciente = await GetPaciente(idPaciente);
  atendimento.faixaetaria = CalculaFaixaEtaria(retornoPaciente[0].nascimento.substring(0,10)); 
  if (atendimento.preenchido=='Completo') GravaAtendimento(atendimento)
  else {
    let resultModal = await MsgCenterYesNo('warning','O formulário não foi preenchido totalmente!', 'O que deseja fazer?','Salvar mesmo assim','Preencher agora');
    if (resultModal.isConfirmed) GravaAtendimento(atendimento)
  }
}
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

let atendimento = new Atendimento();

function ValidaAtendimento(id_paciente, id_profissional, id_tratamento, id_atendimento){
  let alertTitulo='', alertData='', alertHorario='' , alertDuracao='';
  atendimento.id_paciente = id_paciente;
  atendimento.id_profissional = id_profissional; 
  atendimento.id_tratamento = id_tratamento;
  atendimento.id_atendimento = id_atendimento;
  if (isEmpty(tituloTratamento.value)) alertTitulo='Título';
  else atendimento.titulotratamento = tituloTratamento.value;
  atendimento.status = status.value;
  if (dataAtendimento.value=='' || CalculaDiferencaDiasAtendimento(dataAtendimento.value) < 0) alertData='Data';
  else atendimento.data = dataAtendimento.value;
  if (horarioAtendimento.value=='') alertHorario='Horário';
  else atendimento.horario = horarioAtendimento.value;
  if (duracaoAtendimento.value=='') alertDuracao='Duração';
  else atendimento.duracao = duracaoAtendimento.value;
  if (formulario.value == 'Fisioterapêutico') atendimento.id_formulario = 10;
  if (formulario.value == 'Fisioterapêutico infantil') atendimento.id_formulario = 11;
  if (formulario.value == 'Osteopático') atendimento.id_formulario = 20;
  if (formulario.value == 'Osteopático infantil') atendimento.id_formulario = 21;

  // TODO DAQUI PRA BAIXO DEPENDERÁ DO TIPO DE FORMULARIO
  
  // F, FI e O
  (formulario.value == 'Fisioterapêutico infantil') ? atendimento.queixa = relato.value : atendimento.queixa = queixa.value;
  
  atendimento.avaliacao = avaliacao.value; // FI

  // F e O
  atendimento.intensidadedor = IntensidadeDorChecked(intensidadeDor);
  atendimento.quadrogeral = quadroGeral.value;
  atendimento.trajetodor = trajetoDor.value;
  atendimento.tipodor = tipoDor.value;
  atendimento.agravante = fatoresAgravantes.value;
  atendimento.atenuante = fatoresAtenuantes.value;
  atendimento.tratamentoanterior = tratamentosAnteriores.value;
  if (formulario.value == 'Fisioterapêutico' || formulario.value == 'Osteopático' ) {
    if (isEmpty(quadroGeral.value) || isEmpty(trajetoDor.value) || isEmpty(tipoDor.value) || isEmpty(fatoresAgravantes.value) || isEmpty(fatoresAtenuantes.value) ){
      atendimento.preenchido = 'Pendente'; 
    } else  atendimento.preenchido = 'Completo';
  }
  else if (formulario.value == 'Fisioterapêutico infantil' && isEmpty(avaliacao.value)) atendimento.preenchido = 'Pendente';
  else atendimento.preenchido = 'Completo'; // TODO REVISAR 

  //  F, FI, O e OI
  if (alertTitulo=='' && alertData=='' && alertHorario=='' && alertDuracao=='') {
    return atendimento;
  }  
  else {
    let msg = `${alertTitulo} ${alertData} ${alertHorario} ${alertDuracao}`
    MsgCenterButtonOkText('warning','Dados inconsistentes!',`Corrija: ${msg.trim()} `);
    return false;
  }
}  

async function GravaTratamento(atendimento){
  let retorno = await PostTratamento(JSON.stringify(atendimento)); 
  switch (retorno){
    case 0: MsgCenterText('success','Atendimento salvo!', ''); break;
    case 3: MsgCenterButtonOkText('error','Regra de negócio violada', 'Corrija'); break;    
    case 5: MsgCenterButtonOkText('error','Erro no servidor!', 'Contate o Suporte TI'); break;      
  }
  setTimeout( ()=> { CriaTelaAtendimentoMaster(indexPacienteBd); }, 2500);
};

async function GravaAtendimento(atendimento){
  let retorno = await PostAtendimento(JSON.stringify(atendimento)); 
  switch (retorno){
    case 0: MsgCenterText('success','Atendimento salvo!', ''); break;
    case 3: MsgCenterButtonOkText('error','Regra de negócio violada', 'Corrija'); break;    
    case 5: MsgCenterButtonOkText('error','Erro no servidor!', 'Contate o Suporte TI'); break;      
  }
  setTimeout( ()=> { CriaTelaAtendimentoMaster(indexPacienteBd); }, 2500);
};

async function AlteraAtendimento(atendimento){
  let retorno = await PutAtendimento(JSON.stringify(atendimento)); 
  switch (retorno){
    case 0: MsgCenterText('success','Atendimento salvo!', ''); break;
    case 3: MsgCenterButtonOkText('error','Regra de negócio violada', 'Corrija'); break;    
    case 5: MsgCenterButtonOkText('error','Erro no servidor!', 'Contate o Suporte TI'); break;      
  }
  setTimeout( ()=> { CriaTelaAtendimentoMaster(indexPacienteBd); }, 2500);
};

function IntensidadeDorChecked(intensidade){
  let dorNumber = 99;
  for (i=0; i<=10; i++)  if (intensidade.children[i].children[0].checked) dorNumber = i;
  return dorNumber;
}


