// FOREIGN FUNCTION´S LOCATION
// Get...     (/global/script/fetch.js)
// Msg...     (/global/script/mensagens.js)
// Calcula... (/global/script/calcula.js
// Valida...  (/global/script/valida.js)
// ...Master  (/atendimentos/script/atendimentos-master.js)

async function CriaTelaAtendimentoMaster(index){
  indexPacienteBd = index;
  Swal.close(); 
  let retorno = await GetHtmlMain('view-atendimentos-master.html');
  if (retorno.length>0) { 
    tagMain.innerHTML = retorno;
    ExibePacienteAtendimento(arrayPacienteBd[index]);
  }  
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contacte o Suporte TI.');
}

function ExibePacienteAtendimento(data){
  PreencheCard1(data.cpfresp, data.responsavel, data.cpf, data.cns, data.registro);
  PreencheCard2(data.nascimento,data.datalog,data.nome,data.ativo,data.id_paciente);
  PreencheCard3(data.cel,data.whatsapp,data.tel,data.email);
  PreencheCard4(data.historico);
  PreencheCard5(data.cirurgia);
  PreencheCard6(data.trauma);
  PreencheCard7(data.medicamento);
}

function PreencheCard1(cpfresp,responsavel,cpf,cns,registro){
  const headCard = document.querySelector('.card-1');
  const p1Card = document.createElement('p');
  (cpf) ? p1Card.textContent = `CPF.....: `: p1Card.textContent = `CPF resp: `
  headCard.appendChild(p1Card);
  s1Card = document.createElement('span');
  (cpf) ? s1Card.textContent = cpf : s1Card.textContent = `${cpfresp} ${responsavel}`
  p1Card.appendChild(s1Card)
  const p2Card = document.createElement('p');
  p2Card.textContent = `CNS.....: `
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

async function PreencheCard2(nascimento,datalog,nome,ativo,id_paciente){
  const headCard = document.querySelector('.card-2 h6'); 
  headCard.textContent = nome; 
  const pCard = document.querySelector('.card-2 p');
  btnIncluirPaciente = document.querySelector('.incluir-paciente');
  if (!ativo) {
    sCard = document.createElement('span');
    sCard.textContent = `Paciente não habilitado para novos atendimentos`;  
    pCard.appendChild(sCard);
    const btnAlert = document.querySelector('.spinner');
    btnAlert.setAttribute('class',"spinner-grow spinner-grow-sm");
    setTimeout( ()=> { btnAlert.removeAttribute('class'); }, 5000);
    btnIncluirPaciente.innerHTML = `<a href='#'><img src='/global/images/iconfinder_document_file_paper_page-10_2850898.png' >Incluir atendimento</a>`
    btnIncluirPaciente.setAttribute('class','desabilitar-incluir-atendimento')
  }
  else {  
    let idade = CalculaIdade(nascimento);          //
    let diasLog = CalculaDiferencaDias(datalog);  // global/script/calcula.js
    pCard.textContent = idade;
    if (diasLog) pCard.textContent += ` - cadastro atualizado há ${diasLog} dias`;
    if (diasLog>=180) {
      let resultModal = await MsgCenterButtonsText('info','Cadastro desatualizado', `Última alteração faz ${diasLog} dias`);
      if (resultModal.isConfirmed) document.location.href = "/pacientes/html/pacientes.html";
      else if (resultModal.isDenied) { 
        (AtualizaDataLog(id_paciente)) ? MsgTop('success', 'Data do cadastro foi atualizada!') : MsgTop('error', 'Falha na atualização da data!');  // global/script/calcula.js
        pCard.textContent = idade;
      }
    }
    btnIncluirPaciente.innerHTML = `<a href='javascript:CriaTelaAtendimento()'><img src='/global/images/iconfinder_document_file_paper_page-10_2850898.png' >Incluir atendimento</a>`;
  }
}

function PreencheCard3(cel,whatsapp,tel,email){
  const headCard = document.querySelector('.card-3');
  const p1Card = document.createElement('p');
  p1Card.textContent = `Celular : `;
  headCard.appendChild(p1Card);
  s1Card = document.createElement('span');
  s1Card.textContent = cel;
  if (cel) (whatsapp) ? s1Card.textContent += ' usa Whatsapp' : s1Card.textContent += ' SEM Whatsapp'
  p1Card.appendChild(s1Card)
  const p2Card = document.createElement('p');
  p2Card.textContent = `Telefone: `
  headCard.appendChild(p2Card);
  s2Card = document.createElement('span');
  s2Card.textContent = tel;
  p2Card.appendChild(s2Card)
  const p3Card = document.createElement('p');
  p3Card.textContent = `E-mail..: `
  headCard.appendChild(p3Card);
  s3Card = document.createElement('span');
  s3Card.textContent = email;
  p3Card.appendChild(s3Card)
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
