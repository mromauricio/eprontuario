// FOREIGN FUNCTION´S LOCATION
// Get...    (/global/script/fetch.js)
// Msg...    (/global/script/mensagens.js)
// Valida... (/global/script/valida.js)
// ...Master (/atendimentos/script/atendimentos-master.js)

async function SelecionaTratamento(id_tratamento){
  let retorno = await GetAtendimentosTratamento(id_tratamento);
  if (retorno.length>0) ExibeTratamento(retorno);
}

let id_paciente, arrayAtendimentosTemp;

async function ExibeTratamento(data){
  id_paciente = data[0].id_paciente;

  let retorno = await GetHtmlMain('view-atendimentos-existentes.html');
  if (retorno.length>0) tagMain.innerHTML = retorno;
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contacte o Suporte TI.');

  let nomePaciente = document.querySelector('.button-link-image p');
  nomePaciente.textContent = data[0].paciente;
  let titulo = document.querySelector('#titulo-tratamento');
  titulo.setAttribute('disabled'," ");
  titulo.setAttribute('style','background-color: #333; color: rgba(245, 245, 245, 0.801); border-color: #777');
  titulo.value = data[0].titulotratamento;
  let status = document.querySelector('#status');
  status.setAttribute('disabled'," ");
  status.setAttribute('style','background-color: #333; color: rgba(245, 245, 245, 0.801); border-color: #777');
  btnIncluirAtendimento = document.querySelector('.incluir-atendimento');
  let acao = 2;
  btnIncluirAtendimento.innerHTML = `<a href='javascript:ManipulaTratamentoAtendimento(${acao},${id_paciente},${data[0].id_tratamento})'><img src='/global/images/iconfinder_document_file_paper_page-10_2850898.png' >Incluir atendimento</a>`;
  status.value = data[0].status;
  MontaTabelaAtendimentos(data);
  arrayAtendimentosTemp = data;
}

function MontaTabelaAtendimentos(data){
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
    rowCol3.innerText = `${arr[index].queixa}`;
    tr.appendChild(rowCol3);
    const rowCol4 = document.createElement('td');
    rowCol4.innerText = `${arr[index].evolucao}`;
    tr.appendChild(rowCol4);
    const rowCol5 = document.createElement('td');
    rowCol5.setAttribute('style','text-align: center');
    rowCol5.innerText = `${arr[index].intensidadedor}`;
    tr.appendChild(rowCol5);
    const rowCol6 = document.createElement('td');
    rowCol6.innerText = `${arr[index].profissional}`;
    tr.appendChild(rowCol6);
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

  // async function RetornaTelaAtendimentosMaster() {
  //   let retorno = await GetHtmlMain('view-atendimentos-master.html');
  //   if (retorno.length>0) { 
  //   tagMain.innerHTML = retorno;
  //   let retornoPaciente = await GetPaciente(id_paciente);
  //   ExibePacienteAtendimento(retornoPaciente[0]);
  //   ExibeAtendimentosAnteriores(retornoPaciente[0].id_paciente)
  //   }  
  // }