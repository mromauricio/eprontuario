// FOREIGN FUNCTION´S LOCATION
// Get...    (/global/script/fetch.js)
// Msg...    (/global/script/mensagens.js)
// Valida... (/global/script/valida.js)
// ...Master (/atendimentos/script/atendimentos-master.js)

async function SelecionaTratamento(id_tratamento){
  let retorno = await GetAtendimentosTratamento(id_tratamento);
  if (retorno.length>0) ExibeTratamento(retorno);
}

let id_paciente, arrayAtendimentos, arrayAtendimentosTemp;

async function ExibeTratamento(data){
  id_paciente = data[0].id_paciente;
  let retorno = await GetHtmlMain('/atendimentos/view/view-atendimentos-existentes.html');
  if (retorno.length>0) tagMain.innerHTML = retorno;
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contacte o Suporte TI.');
  let nomePaciente = document.querySelector('.button-link-image p');
  let titulo = document.querySelector('#titulo-tratamento');
  let status = document.querySelector('#status');
  let btnIncluirAtendimento = document.querySelector('.incluir-atendimento');
  let dataAberturaTratamento = document.querySelector('#data-tratamento');
  titulo.setAttribute('disabled'," ");
  titulo.setAttribute('style','background-color: #333; color: rgba(245, 245, 245, 0.801); border-color: #777');
  status.setAttribute('disabled'," ");
  status.setAttribute('style','background-color: #333; color: rgba(245, 245, 245, 0.801); border-color: #777');
  nomePaciente.textContent = data[0].paciente;
  titulo.value = data[0].titulotratamento;
  status.value = data[0].status;
  dataAberturaTratamento.value = data[0].datalog.substring(0,10);
  let acao = 2;
  btnIncluirAtendimento.innerHTML = `<a href='javascript:ManipulaTratamentoAtendimento(${acao},${id_paciente},${data[0].id_tratamento})'><img src='/global/images/iconfinder_document_file_paper_page-10_2850898.png' >Incluir atendimento</a>`;
  MontaTabelaAtendimentos(data);
  arrayAtendimentos = data;
  arrayAtendimentosTemp = data;
}

let preenchidoTable = 'Todos';
function MontaTabelaAtendimentos(data){
  let thPreenchido = document.querySelector('#preenchido-table');
  thPreenchido.innerHTML = `<a  href='javascript:FiltraPreenchido(arrayAtendimentos)' title="Clique aqui para filtrar por status"><img src="/global/images/iconfinder_arrow_20_393260.png"> ${preenchidoTable}</a>`;
  const bodyAtendimentos = document.querySelector('tbody');
  data.forEach( (item, index, arr) => { 
    const tr = document.createElement('tr');
    bodyAtendimentos.appendChild(tr);
    const rowCol1 = document.createElement('td');
    let acao = 3;
    rowCol1.innerHTML = `<a href='javascript:ManipulaTratamentoAtendimento(${acao}, ${arr[index].id_paciente}, ${arr[index].id_tratamento}, ${arr[index].id_atendimento})' title="Clique e vá para o atendimento"  ><img src='/global/images/iconfinder_document_file_paper_page-14_2850894.png' ></a>`
    rowCol1.setAttribute('style','text-align: center');
    tr.appendChild(rowCol1);
    const rowCol2 = document.createElement('td');
    if (arr[index].data.length>8){
        let dataTemp = arr[index].data.substring(0,10).split('-');
        arr[index].data = `${dataTemp[2]}.${dataTemp[1]}.${dataTemp[0].substring(2,4)}`;
    }    
    rowCol2.innerText = `${arr[index].data}`;
    rowCol2.setAttribute('style','text-align: left');
    tr.appendChild(rowCol2);
    const rowCol3 = document.createElement('td');
    rowCol3.innerText = `${arr[index].preenchido}`;
    tr.appendChild(rowCol3);
    const rowCol4 = document.createElement('td');
    rowCol4.innerText = `${arr[index].queixa}`;
    tr.appendChild(rowCol4);
    const rowCol5 = document.createElement('td');
    rowCol5.innerText = `${arr[index].evolucao}`;
    tr.appendChild(rowCol5);
    const rowCol6 = document.createElement('td');
    rowCol6.setAttribute('style','text-align: center');
    rowCol6.innerText = `${arr[index].intensidadedor}`;
    tr.appendChild(rowCol6);
    const rowCol7 = document.createElement('td');
    rowCol7.innerText = `${arr[index].profissional}`;
    tr.appendChild(rowCol7);
  });
}

function OrdenaDataAtendimentos(arrayAtendimentosTemp){
  const tableOldBody = document.querySelector('tbody');
  tableOldBody.remove()
  const tableNewBody = document.createElement('tbody');
  const table = document.querySelector('table');
  table.appendChild(tableNewBody);
  MontaTabelaAtendimentos(arrayAtendimentosTemp.reverse())
}

function FiltraPreenchido(arrayAtendimentos){
  const tableOldBody = document.querySelector('tbody');
  tableOldBody.remove()
  const tableNewBody = document.createElement('tbody');
  const table = document.querySelector('table');
  table.appendChild(tableNewBody);
  if (preenchidoTable=='Todos'){
    arrayAtendimentosTemp = arrayAtendimentos.filter(arrayAtendimentos => arrayAtendimentos.preenchido=='Pendente');
    preenchidoTable='Pendente';
    MontaTabelaAtendimentos(arrayAtendimentosTemp);
  } else if (preenchidoTable=='Pendente'){
    arrayAtendimentosTemp = arrayAtendimentos.filter(arrayAtendimentos => arrayAtendimentos.preenchido=='Completo');
    preenchidoTable='Completo';
    MontaTabelaAtendimentos(arrayAtendimentosTemp);
  } else if (preenchidoTable=='Completo'){
    arrayAtendimentosTemp = arrayAtendimentos;
    preenchidoTable='Todos';
    MontaTabelaAtendimentos(arrayAtendimentosTemp);
  }
}