// FOREIGN FUNCTION´S LOCATION
// Get...    (/global/script/fetch.js)
// Msg...    (/global/script/mensagens.js)
// Valida... (/global/script/valida.js)
// ...Master (/atendimentos/script/atendimentos-master.js)

async function SelecionaTratamento(id_tratamento, id_paciente){
  let paciente = await GetPaciente(id_paciente);
  let tratamento = await GetTratamento(id_tratamento);
  let atendimentos = await GetAtendimentosTratamento(id_tratamento);
  ExibeTratamento(atendimentos, paciente, tratamento);
}

let arrayAtendimentosOriginal, arrayAtendimentosFiltrado, preenchidoTable, formularioTable;

async function ExibeTratamento(atendimentos, paciente, tratamento){
  let retorno = await GetHtmlMain('/atendimentos/view/view-atendimentos-existentes.html');
  if (retorno.length>0) tagMain.innerHTML = retorno;
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contate o Suporte TI.');
  let nomePaciente = document.querySelector('.button-link-image p');
  let titulo = document.querySelector('#titulo-tratamento');
  let status = document.querySelector('#status');
  let btnIncluirAtendimento = document.querySelector('.incluir-atendimento');
  let dataAberturaTratamento = document.querySelector('#data-tratamento');
  titulo.setAttribute('disabled'," ");
  titulo.setAttribute('style','background-color: #333; color: rgba(245, 245, 245, 0.801); border-color: #777');
  status.setAttribute('disabled'," ");
  status.setAttribute('style','background-color: #333; color: rgba(245, 245, 245, 0.801); border-color: #777');
  let acao = 2;
  if (paciente[0].ativo) btnIncluirAtendimento.innerHTML = `<a href='javascript:ManipulaTratamentoAtendimento(${acao},${paciente[0].id_paciente},${tratamento[0].id_tratamento})'><img src='/global/images/iconfinder_document_file_paper_page-10_2850898.png' >Incluir atendimento</a>`;
  else {
    btnIncluirAtendimento.innerHTML = `<a href='#'  title='Paciente não está habilitado para inclusão de atendimentos. Isto pode ser modificado no cadastro.'><img src='/global/images/iconfinder_document_file_paper_page-10_2850898.png'>Incluir atendimento</a>`;
    btnIncluirAtendimento.setAttribute('class','desabilitar-incluir-tratamento');
  }
  if (atendimentos == 2) {
    nomePaciente.textContent = paciente[0].nome;
    titulo.value = tratamento[0].descricao;
    status.value = tratamento[0].status;
    dataAberturaTratamento.value = tratamento[0].datalog.substring(0,10);
    const theadClean = document.querySelector('thead');
    theadClean.setAttribute('class','clean');
    const caption = document.querySelector('caption');
    caption.innerText = 'Nenhum atendimento foi registrado'
  }else {
    nomePaciente.textContent = atendimentos[0].paciente;
    titulo.value = atendimentos[0].titulotratamento;
    status.value = atendimentos[0].status;
    dataAberturaTratamento.value = atendimentos[0].datalog.substring(0,10);
    preenchidoTable = 'Todos';
    formularioTable = 'Todos';
    MontaTabelaAtendimentos(atendimentos);
    arrayAtendimentosOriginal = atendimentos;
    arrayAtendimentosFiltrado = atendimentos;
  }
}

function MontaTabelaAtendimentos(data){
  let thPreenchido = document.querySelector('#preenchido-table');
  thPreenchido.innerHTML = `<a  href='javascript:FiltraPreenchido(arrayAtendimentosOriginal)' title="Clique até aparecer o status desejado"><img src="/global/images/iconfinder_arrow_20_393260.png"> ${preenchidoTable}</a>`;
  let thFormulario = document.querySelector('#formulario-table');
  thFormulario.innerHTML = `<a  href='javascript:FiltraFormulario(arrayAtendimentosOriginal)' title="Clique até aparecer tipo de atendimento desejado"><img src="/global/images/iconfinder_arrow_20_393260.png"> ${formularioTable}</a>`;
  const bodyAtendimentos = document.querySelector('tbody');
  data.forEach( (item, index, arr) => { 
    const tr = document.createElement('tr');
    bodyAtendimentos.appendChild(tr);
    const rowCol1 = document.createElement('td');
    let acao = 3;
    rowCol1.innerHTML = `<a href='javascript:ManipulaTratamentoAtendimento(${acao}, ${arr[index].id_paciente}, ${arr[index].id_tratamento}, ${arr[index].id_atendimento})' title="Clique para ver e editar o atendimento"  ><img src='/global/images/iconfinder_document_file_paper_page-14_2850894.png' ></a>`
    rowCol1.setAttribute('style','text-align: center');
    tr.appendChild(rowCol1);
    const rowCol2 = document.createElement('td');
    if (arr[index].data.length>8){
        let dataTemp = arr[index].data.substring(0,10).split('-');
        arr[index].data = `${dataTemp[2]}.${dataTemp[1]}.${dataTemp[0].substring(2,4)}`;
    }    
    rowCol2.innerText = `${arr[index].data}`;
    rowCol2.setAttribute('style','padding-left: 15px;');
    tr.appendChild(rowCol2);
    const rowCol3 = document.createElement('td');
    rowCol3.innerText = `${arr[index].preenchido}`;
    rowCol3.setAttribute('style','padding-left: 25px;'); 
    tr.appendChild(rowCol3);
    const rowCol4 = document.createElement('td');
    rowCol4.innerText = `${arr[index].queixa}`;
    tr.appendChild(rowCol4);
    const rowCol5 = document.createElement('td');
    rowCol5.innerText = `${arr[index].formulario}`;
    rowCol5.setAttribute('style','padding-left: 28px;')
    tr.appendChild(rowCol5);
    const rowCol6 = document.createElement('td');
    rowCol6.innerText = `${arr[index].profissional}`;
    tr.appendChild(rowCol6);
  });
}

function OrdenaDataAtendimentos(){
  const tableOldBody = document.querySelector('tbody');
  tableOldBody.remove()
  const tableNewBody = document.createElement('tbody');
  const table = document.querySelector('table');
  table.appendChild(tableNewBody);
  MontaTabelaAtendimentos(arrayAtendimentosFiltrado.reverse())
}

function FiltraPreenchido(arrayRecebido){
  const tableOldBody = document.querySelector('tbody');
  tableOldBody.remove()
  const tableNewBody = document.createElement('tbody');
  const table = document.querySelector('table');
  table.appendChild(tableNewBody);
  if (preenchidoTable=='Todos' && formularioTable=='Todos'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.preenchido=='Pendente');
    preenchidoTable='Pendente';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (preenchidoTable=='Todos' && formularioTable=='Fisioterapêutico'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.preenchido=='Pendente');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.formulario=='Fisioterapêutico');
    preenchidoTable='Pendente';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (preenchidoTable=='Todos' && formularioTable=='Fisioterapêutico infantil'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.preenchido=='Pendente');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.formulario=='Fisioterapêutico infantil');
    preenchidoTable='Pendente';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (preenchidoTable=='Todos' && formularioTable=='Osteopático'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.preenchido=='Pendente');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.formulario=='Osteopático');
    preenchidoTable='Pendente';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (preenchidoTable=='Todos' && formularioTable=='Osteopático infantil'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.preenchido=='Pendente');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.formulario=='Osteopático infantil');
    preenchidoTable='Pendente';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  }
  else if (preenchidoTable=='Pendente' && formularioTable=='Todos'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.preenchido=='Completo');
    preenchidoTable='Completo';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (preenchidoTable=='Pendente' && formularioTable=='Fisioterapêutico'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.preenchido=='Completo');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.formulario=='Fisioterapêutico');
    preenchidoTable='Completo';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (preenchidoTable=='Pendente' && formularioTable=='Fisioterapêutico infantil'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.preenchido=='Completo');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.formulario=='Fisioterapêutico infantil');
    preenchidoTable='Completo';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (preenchidoTable=='Pendente' && formularioTable=='Osteopático'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.preenchido=='Completo');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.formulario=='Osteopático');
    preenchidoTable='Completo';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (preenchidoTable=='Pendente' && formularioTable=='Osteopático infantil'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.preenchido=='Completo');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.formulario=='Osteopático infantil');
    preenchidoTable='Completo';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } 
  else if (preenchidoTable=='Completo' && formularioTable=='Todos'){
    arrayAtendimentosFiltrado = arrayRecebido;
    preenchidoTable='Todos';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (preenchidoTable=='Completo' && formularioTable=='Fisioterapêutico'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Fisioterapêutico');
    preenchidoTable='Todos';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (preenchidoTable=='Completo' && formularioTable=='Fisioterapêutico infantil'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Fisioterapêutico infantil');
    preenchidoTable='Todos';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (preenchidoTable=='Completo' && formularioTable=='Osteopático'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Osteopático');
    preenchidoTable='Todos';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (preenchidoTable=='Completo' && formularioTable=='Osteopático infantil'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Osteopático infantil');
    preenchidoTable='Todos';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } 
}

function FiltraFormulario(arrayRecebido){
  const tableOldBody = document.querySelector('tbody');
  tableOldBody.remove()
  const tableNewBody = document.createElement('tbody');
  const table = document.querySelector('table');
  table.appendChild(tableNewBody);
  if (formularioTable=='Todos' && preenchidoTable=='Todos'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Fisioterapêutico');
    formularioTable='Fisioterapêutico';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (formularioTable=='Todos' && preenchidoTable=='Pendente'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Fisioterapêutico');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.preenchido=='Pendente');
    formularioTable='Fisioterapêutico';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (formularioTable=='Todos' && preenchidoTable=='Completo'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Fisioterapêutico');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.preenchido=='Completo');
    formularioTable='Fisioterapêutico';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (formularioTable=='Fisioterapêutico' && preenchidoTable=='Todos'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Fisioterapêutico infantil');
    formularioTable='Fisioterapêutico infantil';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (formularioTable=='Fisioterapêutico' && preenchidoTable=='Pendente'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Fisioterapêutico infantil');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.preenchido=='Pendente');
    formularioTable='Fisioterapêutico infantil';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (formularioTable=='Fisioterapêutico' && preenchidoTable=='Completo'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Fisioterapêutico infantil');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.preenchido=='Completo');
    formularioTable='Fisioterapêutico infantil';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (formularioTable=='Fisioterapêutico infantil' && preenchidoTable=='Todos'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Osteopático');
    formularioTable='Osteopático';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (formularioTable=='Fisioterapêutico infantil' && preenchidoTable=='Pendente'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Osteopático');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.preenchido=='Pendente');
    formularioTable='Osteopático';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (formularioTable=='Fisioterapêutico infantil' && preenchidoTable=='Completo'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Osteopático');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.preenchido=='Completo');
    formularioTable='Osteopático';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado);
  } else if (formularioTable=='Osteopático' && preenchidoTable=='Todos'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Osteopático infantil');
    formularioTable='Osteopático infantil';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado); 
  } else if (formularioTable=='Osteopático' && preenchidoTable=='Pendente'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Osteopático infantil');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.preenchido=='Pendente');
    formularioTable='Osteopático infantil';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado); 
  } else if (formularioTable=='Osteopático' && preenchidoTable=='Completo'){
    arrayAtendimentosFiltrado = arrayRecebido.filter(arrayRecebido => arrayRecebido.formulario=='Osteopático infantil');
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.preenchido=='Completo');
    formularioTable='Osteopático infantil';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado); 
  } else if (formularioTable=='Osteopático infantil' && preenchidoTable=='Todos'){
    arrayAtendimentosFiltrado = arrayRecebido;
    formularioTable='Todos';
    MontaTabelaAtendimentos(arrayRecebido);
  } else if (formularioTable=='Osteopático infantil' && preenchidoTable=='Pendente') {
    arrayAtendimentosFiltrado = arrayRecebido;
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.preenchido=='Pendente');
    formularioTable='Todos';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado); 
  } else if (formularioTable=='Osteopático infantil' && preenchidoTable=='Completo') {
    arrayAtendimentosFiltrado = arrayRecebido;
    arrayAtendimentosFiltrado = arrayAtendimentosFiltrado.filter(arrayAtendimentosFiltrado => arrayAtendimentosFiltrado.preenchido=='Completo');
    formularioTable='Todos';
    MontaTabelaAtendimentos(arrayAtendimentosFiltrado); 
  }
}
