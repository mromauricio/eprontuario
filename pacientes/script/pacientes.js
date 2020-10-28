// FOREIGN FUNCTION´S LOCATION
// Get... Put... Post... (/global/script/fetch.js)
// Msg... (/global/script/mensagens.js)
// Valida... (/global/script/valida.js)

$('#form-pacientes').w2form({ 
  name   : 'form',
  header : 'HEADER',
  url    : 'http://localhost:9001/pacientes',
  tabs: [
      { id: 'tab1', caption: 'Dados'  },
   //   { id: 'tab2', caption: 'Contato'},
      // { id: 'tab2', caption: 'Histórico clínico' },
      { id: 'tab2', caption: 'Anexos' }
  ],
  fields : [
      { field: 'nome', type: 'text',  html: { caption: 'Nome', page: 0, column: 0, group:'Paciente', attr: 'placeholder="nome completo sem abreviações + tecla Enter"'} },
      { field: 'menor', type: 'checkbox',  html: { caption: 'Menor de idade', page: 0, column: 0 } },
      { field: 'nacionalidade', type: 'text',  html: { caption: 'Nacionalidade', page: 0, column: 0 } },
      { field: 'datanascimento', type: 'date', html: { caption: 'Data nascimento', page: 0, column: 0, attr: 'placeholder="dd/mm/aaaa"' } },
      { field: 'genero', type: 'list',  html: { caption: 'Gênero', page: 0, column: 0, attr: 'style="width: 40px;"' },
        options: { items: ['Feminino', 'Masculino'] } },
      { field: 'cpf', type: 'text', html: { caption: 'CPF', page: 0, column: 1, group:'Documentos'} },
      { field: 'cns', type: 'text',  html: { caption: 'CNS', page: 0, column: 1 } },
      { field: 'registro', type: 'text',  html: { caption: 'Registro', page: 0, column: 1 } },
      { field: 'responsavel', type: 'text',  html: { caption: 'Responsável', page: 0, column: 1 } },
      { field: 'cpfresp',  type: 'text', html: { caption: 'CPF Resp.', page: 0, column: 1} },
      { field: 'email',  type: 'email', html: { caption: 'E-mail', page: 0, column: 0, group: 'Comunicação'} },
      { field: 'cel',  type: 'text', html: { caption: 'Celular', page: 0, column: 0 } },
      { field: 'whatsapp',  type: 'checkbox', html: { caption: 'WhatsApp', page: 0, column: 0} },
      { field: 'tel', type: 'text',  html: { caption: 'Telefone', page: 0, column: 0 } },
      { field: 'endereco', type: 'text', html: { caption: 'Rua e n༠', page: 0, column: 1, group: 'Endereço' } },
      { field: 'bairro', type: 'text', html: { caption: 'Bairro', page: 0, column: 1 } },
      { field: 'cep', type: 'text', html: { caption: 'CEP', page: 0, column: 1 } },
      { field: 'uf', type: 'list', html: { caption: 'UF', page: 0, column: 1 },
        options: { items: ['   ','Acre','Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Brasília', 'Ceará', 'Espírito Santo', 'Goiás','Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí','Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantis' ] } },
      { field: 'cidade', type: 'text', html: { caption: 'Cidade', page: 0, column: 1 } },

      { field: 'historico', type: 'textarea', html: { caption: 'Histórico', page: 0, column: 0, group: 'Histórico clínico', attr: 'placeholder="Acontecimentos relevantes em ordem cronológica"' } },
      { field: 'cirurgia', type: 'textarea', html: { caption: 'Cirurgias', page: 0, column: 0, attr: 'placeholder="Toda cirurgia pode ser relevante"' } },
      { field: 'medicamento', type: 'textarea', html: { caption: 'Medicamentos', page: 0, column: 1, attr: 'placeholder="Medicamentos de uso regular"' } },
      { field: 'trauma', type: 'textarea', html: { caption: 'Traumas', page: 0, column: 1, attr: 'placeholder="Trauma por mais simples que seja pode influenciar"'} },

      { field: 'ativo',  type: 'checkbox', html: { caption: 'Ativo atendimento', page: 0, column: 0, group: 'Configurações'} },
      { field: 'formulario',  type: 'list', html: { caption: 'Formulário padrâo', page: 0, column: 0 },
        options: { items: [' ','Fisioterapêutico', 'Fisioterapêutico infantil', 'Osteopático', 'Osteopático infantil'] } },
      
      { field: 'pdf', type: 'checkbox', html: { caption: 'Anexar PDF', page: 2 } },
      { field: 'imagem', type: 'checkbox', html: { caption: 'Anexar JPG/PNG', page: 2 } },
      { field: 'link', type: 'text', html: { caption: 'Link', page: 3 } },
      { field: 'texto', type: 'textarea', html: { caption: 'Texto livre', page: 2, attr: 'style="width: 300px; height:150px"' } }
  ],
  //actions: {
      // reset: function () {
      //     this.clear();
      // },
      // save: function () {
      //     this.save(GravaLocalInfo,function(){});
      // }
 // }   
});


let cameFromDb = false;
let cameFromAtalho = false;
let idDb = 0;
let returnGetNome;
let diasLog;
let headerForm = document.querySelector('.w2ui-form-header')
let tempInfoNome = document.querySelector('#nome');
let tempInfoResponsavel = document.querySelector('#responsavel');
let tempInfoCpfresp = document.querySelector('#cpfresp');
let tempInfoMenor = document.querySelector('#menor');
let tempInfoCpf = document.querySelector('#cpf');
let tempInfoCns = document.querySelector('#cns');
let tempInfoRegistro = document.querySelector('#registro');
let tempInfoNacionalidade = document.querySelector('#nacionalidade');
let tempInfoNascimento = document.querySelector('#datanascimento');
let tempInfoGenero = document.querySelector('#genero');
let tempInfoTel = document.querySelector('#tel');
let tempInfoCel = document.querySelector('#cel');
let tempInfoWhatsapp = document.querySelector('#whatsapp');
let tempInfoEmail = document.querySelector('#email');
let tempInfoEndereco = document.querySelector('#endereco');
let tempInfoCep = document.querySelector('#cep');
let tempInfoBairro = document.querySelector('#bairro');
let tempInfoUf = document.querySelector('#uf');
let tempInfoCidade = document.querySelector('#cidade');
let tempInfoHistorico = document.querySelector('#historico');
let tempInfoMedicamento = document.querySelector('#medicamento');
let tempInfoCirurgia = document.querySelector('#cirurgia');
let tempInfoTrauma = document.querySelector('#trauma');
let tempInfoAtivo = document.querySelector('#ativo');
let tempInfoFormulario = document.querySelector('#formulario');

let buttonGravar = document.querySelector('#gravar');
let buttonDescartar = document.querySelector('#descartar');

class Paciente {
  constructor(nome, menor, responsavel, cpfresp, cpf, cns, registro, nacionalidade, nascimento,genero,
    tel, cel, whatsapp, email, endereco, cep, bairro, uf, cidade, historico, medicamento, cirurgia,
    trauma, ativo, formulario){
    this.nome = nome;
    this.menor = menor;
    this.responsavel = responsavel;
    this.cpfresp = cpfresp;
    this.cpf = cpf;
    this.cns = cns;
    this.registro = registro;
    this.nacionalidade = nacionalidade;
    this.nascimento = nascimento;
    this.genero = genero;
    this.tel = tel;
    this.cel = cel;
    this.whatsapp = whatsapp;
    this.email = email;
    this.endereco = endereco;
    this.cep = cep;
    this.bairro = bairro;
    this.uf = uf;
    this.cidade = cidade;
    this.historico = historico;
    this.medicamento = medicamento;
    this.cirurgia = cirurgia;
    this.trauma = trauma;
    this.ativo = ativo;
    this.formulario = formulario;
  }
}

/* Listeners */


buttonGravar.addEventListener('click', GravaLocalInfo);
buttonDescartar.addEventListener('click', ()=>{
  ClearData();
  DisableAll();
  if (cameFromAtalho) document.location.href = `/atendimentos/html/atendimentos.html/?atalho=${idDb}`
});

tempInfoNome.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    if (isEmpty(this.value)) MsgTop('warning', 'Informe o nome!');
    else SearchRegister();
  }
  });

tempInfoNome.addEventListener('focus', async function(event) {
  const urlParams = new URLSearchParams(window.location.search)
  let id = urlParams.get('atalho')
  if (id && !cameFromAtalho){
     returnGetNome = await GetPaciente(id);
     idDb = id;
     cameFromDb = true;
     cameFromAtalho = true;
     EnableAll();
     selecionaPaciente(0);
  }
  });

tempInfoMenor.addEventListener('click', function(){
  if (this.checked) {
    tempInfoResponsavel.removeAttribute('disabled'); 
    tempInfoResponsavel.removeAttribute('style'); 
    tempInfoCpfresp.removeAttribute('disabled'); 
    tempInfoCpfresp.removeAttribute('style'); 
   }
  else { 
    tempInfoResponsavel.value='';
    tempInfoCpfresp.value='';
    tempInfoResponsavel.setAttribute('disabled'," ");
    tempInfoResponsavel.setAttribute('style','background-color: #333');
    tempInfoCpfresp.setAttribute('disabled'," ");
    tempInfoCpfresp.setAttribute('style','background-color: #333');
  }
});

tempInfoResponsavel.addEventListener('blur', function() {
  this.value = this.value.toUpperCase();
  if (isEmpty(this.value)) {
    this.setAttribute('style','color: red;');
    MsgTop('warning', 'Informe o responsável!');
   }
  else this.removeAttribute('style');  
});

tempInfoCpfresp.addEventListener('blur', function(){
  this.value = ValidaCpf(this.value);  // valida.js
  if ((this.value.length != 14 && this.value.length != 0)) {
    this.setAttribute('style','color: red;');
    MsgTop('error', 'CPF responsável inválido!');
  }
  else if (isEmpty(this.value))  MsgTop('warning', 'Informe o CPF do responsável!');
  else if (this.value==tempInfoCpf.value) MsgTop('error', 'CPF do responsável não pode ser igual do paciente!');
  else this.removeAttribute('style');
});

tempInfoCpf.addEventListener('blur', function(){
  this.value = ValidaCpf(this.value);   // valida.js
  if (this.value.length != 14 && this.value.length != 0) {
    this.setAttribute('style','color: red;');
    MsgTop('error', 'CPF inválido!');
  }
  else if (isEmpty(this.value) && tempInfoMenor.checked==false) {  MsgTop('warning', 'Informe o CPF!');}
  else {
    this.removeAttribute('style');
    if (this.value.length != 0) {
      ValidaExistenciaCpfDB(this.value)  // valida.js
      .then(response => {
        if (response!=0){MsgCenterButtonOkText('error','CPF já cadastrado!',`Paciente: ${response[0].nome}`);  }
      });
    }
  }
});

tempInfoCns.addEventListener('blur', function(){
  this.value = ValidaCns(this.value);   // valida.js
  if (this.value.length != 18 && this.value.length != 0) {
    this.setAttribute('style','color: red;');  
    MsgTop('error', 'CNS inválido!');
  }
  else {
    this.removeAttribute('style');
    if (this.value.length != 0) {
      ValidaExistenciaCnsDB(this.value) // valida.js
      .then(response => {
        if (response!=0){MsgCenterButtonOkText('error','CNS já cadastrado:',`Paciente: ${response[0].nome}`);  }
      });
    }
  }
});

tempInfoRegistro.addEventListener('blur', function(){
  this.value = ValidaRegistro(this.value);   // valida.js
  if (this.value.length != 9 && this.value.length != 0) {
    this.setAttribute('style','color: red;');  
    MsgTop('error', 'Registro inválido!');
  }
  else {
    this.removeAttribute('style');
    if (this.value.length != 0) {
      ValidaExistenciaRegistroDB(this.value)    // valida.js
      .then(response => {
        if (response!=0) MsgCenterButtonOkText('error','Registro já cadastrado:',`Paciente: ${response[0].nome}`);  
      });
    }
  }
});

tempInfoNacionalidade.addEventListener('blur', function(){
  String.prototype.initCap = function () {
    return this.toLowerCase().replace(/(?:^|\b)[a-z]/g, function (m) {
        return m.toUpperCase();
    });
  };
  tempInfoNacionalidade.value = tempInfoNacionalidade.value.initCap();
});

tempInfoTel.addEventListener('blur', function(){
  this.value = ValidaTel(this.value);  // valida.js
  if (this.value.length !=14 && this.value.length != 0) {
    this.setAttribute('style','color: red;'); 
    MsgTop('error', 'Telefone inválido!');
  }
  else this.removeAttribute('style');  
});

tempInfoCel.addEventListener('blur', function(){
  this.value = ValidaCel(this.value);   // valida.js
  if (this.value.length !=15 && this.value.length != 0) {
    this.setAttribute('style','color: red;');  
    MsgTop('error', 'Celular inválido!');
  }
  else this.removeAttribute('style');  
});

tempInfoCep.addEventListener('blur', function(){
  this.value = ValidaCep(this.value);   // valida.js
  if (this.value.length !=9 && this.value.length != 0) {
    this.setAttribute('style','color: red;');  
    MsgTop('error', 'CEP inválido!');
  }
  else this.removeAttribute('style');  
});

tempInfoAtivo.addEventListener('click', function(){
  if (this.checked) MsgTop('success', 'Paciente habilitado para atendimento!');
  else   MsgCenterButtonOkText('info','Ativo está desmarcado.',`Não será possível incluir atendimentos.`); 
});
/****** END Linsteners ***********/  
ClearData();
DisableAll();

async function SearchRegister(){
  tempInfoNome.value = tempInfoNome.value.toUpperCase();
  headerForm.textContent = tempInfoNome.value;
  EnableAll(); 
  ClearDataMinusNome();
  let data = await GetNome(tempInfoNome.value);  // +'%' para buscar a partir de
  if (data.length>0){ 
    cameFromDb = true;
    returnGetNome = data;
    let modalData='';  
    data.forEach( (item, index, arr) => { 
      if (arr[index].cpf == null) modalData += (`<a href='javascript:selecionaPaciente(${index})'><b>${arr[index].nome} CPF resp. ${arr[index].cpfresp}</b></a>  <br>`);  
      else modalData += (`<a href='javascript:selecionaPaciente(${index})'><b>${arr[index].nome} CPF ${arr[index].cpf}</b></a>  <br>`);  
    });
    let resultModal = await MsgHomonio(modalData);
    if (resultModal.dismiss=="close" || resultModal.dismiss=="cancel" || resultModal.dismiss=="backdrop" || resultModal.dismiss=="esc") {
      cameFromDb = false; 
      idDb = 0;
      ClearData(); 
      DisableAll();
    }
    else if (resultModal.isConfirmed) {
      cameFromDb = false; 
      idDb = 0;
      tempInfoAtivo.checked = true;
    }
  }
  else {// SE RETURN 2, 3 OU 5 
    cameFromDb = false;
    idDb = 0;
    tempInfoAtivo.checked = true;   
  }
}

function selecionaPaciente(index){
  Swal.close(); 
  idDb = returnGetNome[index].id_paciente;
  ShowDataGetNome(returnGetNome[index]);
}

function ShowDataGetNome(data){
  tempInfoNome.value = data.nome;
  diasLog = CalculaDiferencaDias(data.datalog);
  headerForm.textContent = tempInfoNome.value;
  spanHeaderForm = document.createElement('small');
  spanHeaderForm.textContent = ` (última atualização do cadastro faz ${diasLog} dias)`;
  headerForm.appendChild(spanHeaderForm);
  if (diasLog>=180 && cameFromAtalho==false) MsgCenter('warning','Cadastro desatualizado!')
  if (data.menor) {
    tempInfoMenor.checked=true;
    tempInfoResponsavel.removeAttribute('disabled');
    tempInfoResponsavel.removeAttribute('style');
    tempInfoCpfresp.removeAttribute('disabled');
    tempInfoCpfresp.removeAttribute('style');
  }
  else {
    tempInfoMenor.checked=false;
    tempInfoResponsavel.setAttribute('disabled'," ");
    tempInfoResponsavel.setAttribute('style','background-color: #333');
    tempInfoCpfresp.setAttribute('disabled'," ");
    tempInfoCpfresp.setAttribute('style','background-color: #333');
  }
  tempInfoResponsavel.value = data.responsavel;
  tempInfoCpfresp.value = data.cpfresp;
  tempInfoCpf.value = data.cpf;
  tempInfoCns.value = data.cns;
  if (tempInfoCns.value.length != 18 && tempInfoCns.value.length != 0) tempInfoCns.setAttribute('style','color: red;');
  tempInfoRegistro.value = data.registro;
  if (tempInfoRegistro.value.length != 9 && tempInfoRegistro.value.length != 0) tempInfoRegistro.setAttribute('style','color: red;');  
  tempInfoNacionalidade.value = data.nacionalidade;
  if (data.nascimento){
    let dataTemp = data.nascimento.substring(0,10).split('-');
    tempInfoNascimento.value  = `${dataTemp[2]}/${dataTemp[1]}/${dataTemp[0]}`;
  }  
  tempInfoGenero.value = data.genero;
  tempInfoTel.value = data.tel;
  if (tempInfoTel.value.length !=14 && tempInfoTel.value.length != 0) tempInfoTel.setAttribute('style','color: red;');  
  tempInfoCel.value = data.cel;
  if (tempInfoCel.value.length !=15 && tempInfoCel.value.length != 0) tempInfoCel.setAttribute('style','color: red;');   
  (data.whatsapp) ? tempInfoWhatsapp.checked=true : tempInfoWhatsapp.checked=false
  tempInfoEmail.value = data.email;
  tempInfoEndereco.value = data.endereco;
  tempInfoCep.value = data.cep;
  if (tempInfoCep.value.length !=9 && tempInfoCep.value.length != 0) tempInfoCep.setAttribute('style','color: red;'); 
  tempInfoBairro.value = data.bairro;
  tempInfoUf.value = data.uf;
  tempInfoCidade.value = data.cidade;
  tempInfoHistorico.value = data.historico;
  tempInfoMedicamento.value = data.medicamento;
  tempInfoCirurgia.value = data.cirurgia;
  tempInfoTrauma.value = data.trauma;
  (data.ativo) ? tempInfoAtivo.checked=true : tempInfoAtivo.checked=false
  if (!tempInfoAtivo.checked) if (!cameFromAtalho) MsgCenterButtonOkText('info','Ativo está desmarcado.',`Não será possível incluir atendimentos.`); 
  if (data.id_formulario == 10) tempInfoFormulario.value = 'Fisioterapêutico';
  if (data.id_formulario == 11) tempInfoFormulario.value = 'Fisioterapêutico infantil';
  if (data.id_formulario == 20) tempInfoFormulario.value = 'Osteopático';
  if (data.id_formulario == 21) tempInfoFormulario.value = 'Osteopático infantil';  
 }

async function GravaLocalInfo(){  
let alertNome, alertResponsavel, alertCpfresp,alertCpf, alertCns, alertRegistro, alertTel, alertCel, alertCep; 
(isEmpty(tempInfoNome.value)) ? alertNome = `Nome não informado` : alertNome = '';
alertResponsavel = '';
alertCpfresp = '';
if (tempInfoMenor.checked)
{
  if (isEmpty(tempInfoResponsavel.value)) alertResponsavel = `Responsável não informado`;
  else alertResponsavel = '';
  if (tempInfoCpfresp.value.length != 14 && tempInfoCpfresp.value.length != 0) alertCpfresp = `CPF resp. ${tempInfoCpfresp.value}`;
  else if (isEmpty(tempInfoCpfresp.value)) alertCpfresp = `CPF resp. não informado`;
  else if (tempInfoCpfresp.value==tempInfoCpf.value) alertCpfresp = `CPF do responsável igual do paciente`;
  else  alertCpfresp = ''; 
}
if (tempInfoCpf.value.length != 14 && tempInfoCpf.value.length != 0)  alertCpf = `CPF ${tempInfoCpf.value}`;
else if (isEmpty(tempInfoCpf.value) && tempInfoMenor.checked==false) alertCpf = `CPF não informado`;
else if (tempInfoCpf.value.length != 0 && await ValidaExistenciaCpfDB(tempInfoCpf.value)!=0 ) alertCpf = `CPF pertence a outro paciente`;
else alertCpf = ''; 
if (tempInfoCns.value.length != 18 && tempInfoCns.value.length != 0 )  alertCns = `CNS ${tempInfoCns.value}`;
else if (tempInfoCns.value.length != 0 && await ValidaExistenciaCnsDB(tempInfoCns.value)!=0 ) alertCns = `CNS pertence a outro paciente`;
else alertCns = ''; 
if (tempInfoRegistro.value.length != 9 && tempInfoRegistro.value.length != 0)  alertRegistro = `Registro ${tempInfoRegistro.value}`;
else if (tempInfoRegistro.value.length != 0 && await ValidaExistenciaRegistroDB(tempInfoRegistro.value)!=0 ) {alertRegistro = `Registro pertence a outro paciente`;}  
else alertRegistro = '';  
if (tempInfoTel.value.length !=14 && tempInfoTel.value.length != 0) alertTel = `Tel. ${tempInfoTel.value}`;
else alertTel = ''; 
if (tempInfoCel.value.length !=15 && tempInfoCel.value.length != 0)  alertCel = `Cel. ${tempInfoCel.value}`;
else alertCel = '';   
if (tempInfoCep.value.length !=9 && tempInfoCep.value.length != 0) alertCep = `CEP ${tempInfoCep.value}`;
else alertCep = ''; 
if (tempInfoFormulario.value == 'Fisioterapêutico') tempInfoFormulario.value = 10;
if (tempInfoFormulario.value == 'Fisioterapêutico infantil') tempInfoFormulario.value = 11;
if (tempInfoFormulario.value == 'Osteopático') tempInfoFormulario.value = 20;
if (tempInfoFormulario.value == 'Osteopático infantil') tempInfoFormulario.value = 21;  
if (alertNome!=''||alertResponsavel!=''||alertCpfresp!=''||alertCpf!=''||alertCns!=''||alertRegistro!=''||alertTel!=''||alertCel!=''||alertCep!='') 
  { 
  MsgCenterButtonOkText('warning','Dados inconsistentes!',`Corrija: \n${alertNome} \n${alertResponsavel} \n${alertCpfresp} \n${alertCpf} \n${alertCns} \n${alertRegistro} \n${alertTel} \n${alertCel} \n${alertCep}`);
  if (alertResponsavel!='') tempInfoResponsavel.focus();
  else if (alertCpfresp!='') tempInfoCpfresp.focus();
  else if (alertCpf!='')   tempInfoCpf.focus(); 
  else if (alertCns!='') tempInfoCns.focus();
  else if (alertRegistro!='') tempInfoRegistro.focus();
  }
else { 
  let paciente = new Paciente(tempInfoNome.value, tempInfoMenor.checked, 
    tempInfoResponsavel.value, tempInfoCpfresp.value,tempInfoCpf.value, 
    tempInfoCns.value, tempInfoRegistro.value, tempInfoNacionalidade.value,
    tempInfoNascimento.value, tempInfoGenero.value, tempInfoTel.value, 
    tempInfoCel.value, tempInfoWhatsapp.checked, tempInfoEmail.value, 
    tempInfoEndereco.value, tempInfoCep.value, tempInfoBairro.value, 
    tempInfoUf.value, tempInfoCidade.value, tempInfoHistorico.value,
    tempInfoMedicamento.value, tempInfoCirurgia.value, tempInfoTrauma.value,
    tempInfoAtivo.checked, tempInfoFormulario.value);
  if (cameFromDb){
    let retorno = await PutPaciente(idDb, JSON.stringify(paciente)); // global/script/fetch.js
    switch (retorno){
      case 0: {
        MsgCenter('success','Dados atualizados!', false); 
        let retornoAtualiza = await AtualizaDataLog(idDb);  // global/script/calcula.js
        if (cameFromAtalho && retornoAtualiza) document.location.href = `/atendimentos/html/atendimentos.html/?atalho=${idDb}`
        break;
      }
      case 2: MsgCenterButtonOkText('error','ID não localizado.', 'Preencha novamente o nome.'); break;    
      case 3: MsgCenterButtonOkText('error','CPF do responsável!', 'Não pode ser igual ao do paciente.'); break;   
      case 5: MsgCenterButtonOkText('error','Erro no servidor!', 'Contacte o Suporte TI.'); break;  
      }
    }
  else {  
    let retorno = await PostPaciente(JSON.stringify(paciente)); // global/script/fetch.js
    switch (retorno){
      case 0: MsgCenter('success','Dados enviados!', false); break;
      case 3: MsgCenterButtonOkText('error','CPF do responsável não pode ser igual ao do paciente', 'Corrija'); break;    
      case 5: MsgCenterButtonOkText('error','Erro no servidor!', 'Contacte o Suporte TI'); break;      
    }
  }
  ClearData();
  DisableAll();
  tempInfoNome.focus();
  }
}





 








