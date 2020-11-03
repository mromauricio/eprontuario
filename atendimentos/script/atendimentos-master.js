// FOREIGN FUNCTION´S LOCATION
// Get...     (/global/script/fetch.js)
// Msg...     (/global/script/mensagens.js)
// Calcula... (/global/script/calcula.js
// Valida...  (/global/script/valida.js)
// ...Master  (/atendimentos/script/atendimentos-master.js)

async function CriaTelaAtendimentoMaster(index, atalho){
  indexPacienteBd = index;
  Swal.close(); 
  let retorno = await GetHtmlMain('/atendimentos/view/view-atendimentos-master.html');
  if (retorno.length>0) { 
    tagMain.innerHTML = retorno;
    ExibePacienteAtendimento(arrayPacienteBd[index]);
    ExibeTratamentos(arrayPacienteBd[index].id_paciente)
  }  
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contate o Suporte TI.');
}

function ExibePacienteAtendimento(data){
  PreencheCard1(data.cpfresp, data.cpf, data.cns, data.registro);
  PreencheCard2(data.nascimento,data.datalog,data.nome,data.ativo,data.id_paciente, data.id_formulario);
  PreencheCard3(data.cel,data.whatsapp,data.tel,data.email);
  PreencheCard4(data.historico);
  PreencheCard5(data.cirurgia);
  PreencheCard6(data.trauma);
  PreencheCard7(data.medicamento);
}

function PreencheCard1(cpfresp, cpf, cns, registro){
  const headCard = document.querySelector('.card-1');
  const p1Card = document.createElement('p');
  (cpf) ? p1Card.textContent = `CPF.......: `: p1Card.textContent = `CPF resp: `
  headCard.appendChild(p1Card);
  s1Card = document.createElement('span');
  (cpf) ? s1Card.textContent = cpf : s1Card.textContent = `${cpfresp}`
  p1Card.appendChild(s1Card)
  const p2Card = document.createElement('p');
  p2Card.textContent = `CNS......: `
  headCard.appendChild(p2Card);
  s2Card = document.createElement('span');
  if (cns) s2Card.textContent = cns;
  p2Card.appendChild(s2Card)
  const p3Card = document.createElement('p');
  p3Card.textContent = `Registro: `;
  headCard.appendChild(p3Card);
  s3Card = document.createElement('span');
  if (registro) s3Card.textContent = registro;
  p3Card.appendChild(s3Card)
}

async function PreencheCard2(nascimento, datalog, nome, ativo, id_paciente, id_formulario){
  const headCard = document.querySelector('.card-2 h6'); 
  headCard.textContent = nome; 
  const pCard = document.querySelector('.card-2 p');
  const aCard = document.querySelector('.card-2 a');
  aCard.innerHTML = `<a href = /pacientes/html/pacientes.html/?atalho=${id_paciente} >Precisa mudar dados cadastrais deste paciente?</a>`;

  btnIncluirTratamento = document.querySelector('.incluir-tratamento');
  if (!ativo) {
    sCard = document.createElement('span');
    sCard.textContent = `Paciente não habilitado para novos atendimentos`;  
    pCard.appendChild(sCard);
    const btnAlert = document.querySelector('.spinner');
    btnAlert.setAttribute('class',"spinner-grow spinner-grow-sm");
    setTimeout( ()=> { btnAlert.removeAttribute('class'); }, 5000);
    btnIncluirTratamento.innerHTML = `<a href='#'><img src='/global/images/iconfinder_document_file_paper_page-10_2850898.png' >Incluir tratamento</a>`
    btnIncluirTratamento.setAttribute('class','desabilitar-incluir-tratamento');
  }
  else {  
    let idade = CalculaIdade(nascimento);          //
    let diasLog = CalculaDiferencaDias(datalog);  // global/script/calcula.js
    pCard.textContent = idade;
    if (diasLog>=180) {
      let resultModal = await MsgCenterButtonsText('info','Cadastro desatualizado', `Última alteração faz ${diasLog} dias`);
      if (resultModal.isConfirmed) document.location = `/pacientes/html/pacientes.html/?atalho=${id_paciente}`;
      else if (resultModal.isDenied) { 
        (AtualizaDataLog(id_paciente)) ? MsgTop('success', 'Data do cadastro foi atualizada!') : MsgTop('error', 'Falha na atualização da data!');  // global/script/calcula.js
        pCard.textContent = idade;
      }
    }
    let acao = 1;
    btnIncluirTratamento.innerHTML = `<a href='javascript:ManipulaTratamentoAtendimento(${acao},${id_paciente},0,0,${id_formulario})'><img src='/global/images/iconfinder_document_file_paper_page-10_2850898.png' >Incluir tratamento</a>`;
  }
}

function PreencheCard3(cel,whatsapp,tel,email){
  const headCard = document.querySelector('.card-3');
  const p1Card = document.createElement('p');
  p1Card.textContent = `Celular..: `;
  headCard.appendChild(p1Card);
  s1Card = document.createElement('span');
  s1Card.textContent = cel;
  p1Card.appendChild(s1Card)
  const p2Card = document.createElement('p');
  p2Card.textContent = `Telefone: `
  headCard.appendChild(p2Card);
  s2Card = document.createElement('span');
  s2Card.textContent = tel;
  p2Card.appendChild(s2Card)
  const p3Card = document.createElement('p');
  p3Card.textContent = `E-mail...: `
  headCard.appendChild(p3Card);
  s3Card = document.createElement('span');
  s3Card.textContent = email;
  p3Card.appendChild(s3Card)
  if (cel) if (whatsapp) {
              p1Card.setAttribute('id','cel');
              s1Card.innerHTML +=`<img src='/global/images/iconfinder_Whatsapp_2460226.png' >` ;
              p2Card.setAttribute('id','tel');
            }
}

function PreencheCard4(historico){
  const headCard = document.querySelector('.card-4');
  const pCard = document.createElement('p');
  headCard.appendChild(pCard);
  sCard = document.createElement('span');
  sCard.textContent = historico;
  pCard.appendChild(sCard)
}

function PreencheCard5(cirurgia){
  const headCard = document.querySelector('.card-5');
  const pCard = document.createElement('p');
  headCard.appendChild(pCard);
  sCard = document.createElement('span');
  sCard.textContent = cirurgia;
  pCard.appendChild(sCard)
}

function PreencheCard6(trauma){
  const headCard = document.querySelector('.card-6');
  const pCard = document.createElement('p');
  headCard.appendChild(pCard);
  sCard = document.createElement('span');
  sCard.textContent = trauma;
  pCard.appendChild(sCard)
}

function PreencheCard7(medicamento){
  const headCard = document.querySelector('.card-7');
  const pCard = document.createElement('p');
  headCard.appendChild(pCard);
  sCard = document.createElement('span');
  sCard.textContent = medicamento;
  pCard.appendChild(sCard)
}

let arrayTratamentos, arrayTemp;
async function ExibeTratamentos(id_paciente){
  let retorno = await GetTratamentosPaciente(id_paciente);
  if (retorno.length>0) {
    MontaTabelaTratamentos(retorno);
    arrayTratamentos = retorno;
    arrayTemp = arrayTratamentos;
  }
  else {
    const theadClean = document.querySelector('thead');
    theadClean.setAttribute('class','clean');
    const caption = document.querySelector('caption');
    caption.innerText = 'Não existe registro de tratamento para este paciente'
  }
}

let statusTable = 'Todos';
function MontaTabelaTratamentos(data){
  const thStatus = document.querySelector('#status-table');
  thStatus.innerHTML = `<a href='javascript:FiltraStatus(arrayTratamentos)' title="Clique até aparecer o status desejado"><img src="/global/images/iconfinder_arrow_20_393260.png"> ${statusTable}</a>`;
  const bodyAtendimentos = document.querySelector('tbody');
  data.forEach( (item, index, arr) => { 
    const tr = document.createElement('tr');
    bodyAtendimentos.appendChild(tr);
    const rowCol1 = document.createElement('td');
    rowCol1.innerHTML = `<a href='javascript:SelecionaTratamento(${arr[index].id_tratamento},${arr[index].id_paciente})' title="Clique para ver e editar o tratamento"  ><img src='/global/images/iconfinder_document_file_paper_page-14_2850894.png' ></a>`
    rowCol1.setAttribute('style','text-align: center');
    tr.appendChild(rowCol1);
    const rowCol2 = document.createElement('td');
    if (arr[index].datalog.length>8){
        let dataTemp = arr[index].datalog.substring(0,10).split('-');
        arr[index].datalog = `${dataTemp[2]}.${dataTemp[1]}.${dataTemp[0].substring(2,4)}`;
    }    
    rowCol2.innerText = `${arr[index].datalog}`;
    rowCol2.setAttribute('style','padding-left: 11px;');
    tr.appendChild(rowCol2);
    const rowCol3 = document.createElement('td');
    rowCol3.innerText = `${arr[index].status}`;
    tr.appendChild(rowCol3);
    const rowCol4 = document.createElement('td');
    rowCol4.innerText = `${arr[index].descricao}`;
    tr.appendChild(rowCol4);
  });
}

function OrdenaData(arrayTemp){
  const tableOldBody = document.querySelector('tbody');
  tableOldBody.remove()
  const tableNewBody = document.createElement('tbody');
  const table = document.querySelector('table');
  table.appendChild(tableNewBody);
  MontaTabelaTratamentos(arrayTemp.reverse())
}

function FiltraStatus(arrayTratamentos){
  const tableOldBody = document.querySelector('tbody');
  tableOldBody.remove()
  const tableNewBody = document.createElement('tbody');
  const table = document.querySelector('table');
  table.appendChild(tableNewBody);
  if (statusTable=='Todos'){
    arrayTemp = arrayTratamentos.filter(arrayTratamentos => arrayTratamentos.status=='Em curso');
    statusTable='Em curso';
    MontaTabelaTratamentos(arrayTemp);
  } else if (statusTable=='Em curso'){
    arrayTemp = arrayTratamentos.filter(arrayTratamentos => arrayTratamentos.status=='Condicionado');
    statusTable='Condicionado';
    MontaTabelaTratamentos(arrayTemp);
  } else if (statusTable=='Condicionado'){
    arrayTemp = arrayTratamentos.filter(arrayTratamentos => arrayTratamentos.status=='Concluído');
    statusTable='Concluído';
    MontaTabelaTratamentos(arrayTemp);
  } else if (statusTable=='Concluído'){
    arrayTemp = arrayTratamentos;
    statusTable='Todos';
    MontaTabelaTratamentos(arrayTemp);
  }
}

