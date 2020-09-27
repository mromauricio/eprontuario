// Funções com nome Valida... e  Msg... encontram-se no arquivo /scripts/valida.js
// Funções com nome Get/Put/Post... encontram-se no arquivo /scripts/fetch.js
//
//////////////////////////

$('#form').w2form({ 
  name   : 'form',
  header : `HEADER do formulário - [exibir nome do paciente e data da atualização mais recente, em vermelho se maior que 90 dias]`,
  url    : 'http://localhost:3000/pacientes',
  tabs: [
      { id: 'tab1', caption: 'Dados'  },
   //   { id: 'tab2', caption: 'Contato'},
      { id: 'tab2', caption: 'Histórico clínico' },
      { id: 'tab3', caption: 'Anexos' }
  ],
  fields : [
      { field: 'nome', required: true, type: 'text',  html: { caption: 'Nome', page: 0, column: 0, group:'Paciente', attr: 'placeholder="nome completo sem abreviações + tecla Enter"'} },
      { field: 'menor', type: 'checkbox',  html: { caption: 'Menor de idade', page: 0, column: 0 } },
      { field: 'nacionalidade', type: 'text',  html: { caption: 'Nacionalidade', page: 0, column: 0 } },
      { field: 'datanascimento', type: 'date', html: { caption: 'Data nascimento', page: 0, column: 0 } },
      { field: 'genero', type: 'text',  html: { caption: 'Gênero', page: 0, column: 0 } },
      { field: 'cpf',  type: 'text', html: { caption: 'CPF', page: 0, column: 1, group:'Documentos' } },
      { field: 'cns', type: 'text',  html: { caption: 'CNS', page: 0, column: 1 } },
      { field: 'registro', type: 'text',  html: { caption: 'Registro', page: 0, column: 1 } },
      { field: 'responsavel', type: 'text',  html: { caption: 'Responsável', page: 0, column: 1 /*, group:'Responsável - preencher para paciente menor de idade' */ } },
      { field: 'cpfresp',  type: 'text', html: { caption: 'CPF Resp.', page: 0, column: 1} },

      { field: 'email',  type: 'email', html: { caption: 'E-mail', page: 0, column: 0, group: 'Comunicação'} },
      { field: 'cel',  type: 'text', html: { caption: 'Celular', page: 0, column: 0 } },
      { field: 'whatsapp',  type: 'checkbox', html: { caption: 'WhatsApp', page: 0, column: 0} },
      { field: 'tel', type: 'text',  html: { caption: 'Telefone', page: 0, column: 0 } },
      { field: 'endereco', type: 'text', html: { caption: 'Rua e n༠', page: 0, column: 1, group: 'Endereço' } },
      { field: 'bairro', type: 'text', html: { caption: 'Bairro', page: 0, column: 1 } },
      { field: 'cep', type: 'text', html: { caption: 'CEP', page: 0, column: 1 } },
      { field: 'uf', type: 'text', html: { caption: 'UF', page: 0, column: 1 } },
      { field: 'cidade', type: 'text', html: { caption: 'Cidade', page: 0, column: 1 } },

      { field: 'historico', type: 'textarea', html: { caption: 'Histórico', page: 1, column: 0, attr: 'placeholder="Acontecimentos relevantes em ordem cronológica."' } },
      { field: 'medicamento', type: 'textarea', html: { caption: 'Medicamentos', page: 1, column: 1, attr: 'placeholder="Caso algum medicamento deixe de ser utilizado, mantenha-o aqui com a informação - data desuso"' } },
      { field: 'cirurgia', type: 'textarea', html: { caption: 'Cirurgias', page: 1, column: 0, attr: '' } },
      { field: 'trauma', type: 'textarea', html: { caption: 'Traumas', page: 1, column: 1, attr: '' } },
      
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

//w2ui['form'].off('*');


let cameFromDb = false;
let idDb = 0;
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

let buttonGravar = document.querySelector('#gravar');

const isEmpty = str => !str.trim().length;

class Paciente {
  constructor(nome, menor, responsavel, cpfresp, cpf, cns, registro, nacionalidade, nascimento,genero,
    tel, cel, whatsapp, email, endereco, cep, bairro, uf, cidade, historico, medicamento, cirurgia,
    trauma){
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
  }
}

/* Listeners */

buttonGravar.addEventListener('click', GravaLocalInfo);

tempInfoNome.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    if (isEmpty(this.value)) MsgTop('warning', 'Informe o nome!');
    else SearchRegister();
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
  this.value = ValidaCpf(this.value); 
  if ((this.value.length != 14 && this.value.length != 0)) {
    this.setAttribute('style','color: red;');
    MsgTop('error', 'CPF responsável inválido!');
  }
  else if (isEmpty(this.value))  MsgTop('warning', 'Informe o CPF do responsável!');
  else if (this.value==tempInfoCpf.value) MsgTop('error', 'CPF do responsável não pode ser igual do paciente!');
  else this.removeAttribute('style');
});

tempInfoCpf.addEventListener('blur', function(){
  this.value = ValidaCpf(this.value); 
  if (this.value.length != 14 && this.value.length != 0) {
    this.setAttribute('style','color: red;');
    MsgTop('error', 'CPF inválido!');
  }
  else if (isEmpty(this.value) && tempInfoMenor.checked==false) {  MsgTop('warning', 'Informe o CPF!');}
  else {
    this.removeAttribute('style');
    if (this.value.length != 0) {
      ValidaExistenciaCpfDB(this.value)
      .then(response => {
        if (response!=0){MsgCenterButtonText('error','CPF já cadastrado!',`Paciente: ${response[0].nome}`);  }
      });
    }
  }
});

tempInfoCns.addEventListener('blur', function(){
  this.value = ValidaCns(this.value);
  if (this.value.length != 18 && this.value.length != 0) {
    this.setAttribute('style','color: red;');  
    MsgTop('error', 'CNS inválido!');
  }
  else {
    this.removeAttribute('style');
    if (this.value.length != 0) {
      ValidaExistenciaCnsDB(this.value)
      .then(response => {
        if (response!=0){MsgCenterButtonText('error','CNS já cadastrado:',`Paciente: ${response[0].nome}`);  }
      });
    }
  }
});

tempInfoRegistro.addEventListener('blur', function(){
  this.value = ValidaRegistro(this.value);
  if (this.value.length != 9 && this.value.length != 0) {
    this.setAttribute('style','color: red;');  
    MsgTop('error', 'Registro inválido!');
  }
  else {
    this.removeAttribute('style');
    if (this.value.length != 0) {
      ValidaExistenciaRegistroDB(this.value)
      .then(response => {
        if (response!=0){MsgCenterButtonText('error','Registro já cadastrado:',`Paciente: ${response[0].nome}`);  }
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
  this.value = ValidaTel(this.value);
  if (this.value.length !=14 && this.value.length != 0) {
    this.setAttribute('style','color: red;'); 
    MsgTop('error', 'Telefone inválido!');
  }
  else this.removeAttribute('style');  
});

tempInfoCel.addEventListener('blur', function(){
  this.value = ValidaCel(this.value);
  if (this.value.length !=15 && this.value.length != 0) {
    this.setAttribute('style','color: red;');  
    MsgTop('error', 'Celular inválido!');
  }
  else this.removeAttribute('style');  
});

tempInfoCep.addEventListener('blur', function(){
  this.value = ValidaCep(this.value);
  if (this.value.length !=9 && this.value.length != 0) {
    this.setAttribute('style','color: red;');  
    MsgTop('error', 'CEP inválido!');
  }
  else this.removeAttribute('style');  
});
/****** END Linsteners ***********/  
ClearData();
DisableAll();

tempInfoNome.focus(); 

function DisableAll(){
  tempInfoMenor.setAttribute('disabled'," ");
  tempInfoMenor.setAttribute('style','background-color: #333');
  tempInfoResponsavel.setAttribute('disabled'," ");
  tempInfoResponsavel.setAttribute('style','background-color: #333');
  tempInfoCpfresp.setAttribute('disabled'," ");
  tempInfoCpfresp.setAttribute('style','background-color: #333');
  tempInfoCpf.setAttribute('disabled'," ");
  tempInfoCpf.setAttribute('style','background-color: #333')
  tempInfoCns.setAttribute('disabled'," ");
  tempInfoCns.setAttribute('style','background-color: #333');
  tempInfoRegistro.setAttribute('disabled'," ");
  tempInfoRegistro.setAttribute('style','background-color: #333');
  tempInfoNacionalidade.setAttribute('disabled'," ");
  tempInfoNacionalidade.setAttribute('style','background-color: #333');
  tempInfoNascimento.setAttribute('disabled'," ");
  tempInfoNascimento.setAttribute('style','background-color: #333');
  tempInfoGenero.setAttribute('disabled'," ");
  tempInfoGenero.setAttribute('style','background-color: #333');
  tempInfoTel.setAttribute('disabled'," ");
  tempInfoTel.setAttribute('style','background-color: #333');
  tempInfoCel.setAttribute('disabled'," ");
  tempInfoCel.setAttribute('style','background-color: #333');
  tempInfoWhatsapp.setAttribute('disabled'," ");
  tempInfoWhatsapp.setAttribute('style','background-color: #333');
  tempInfoEmail.setAttribute('disabled'," ");
  tempInfoEmail.setAttribute('style','background-color: #333');
  tempInfoEndereco.setAttribute('disabled'," ");
  tempInfoEndereco.setAttribute('style','background-color: #333');
  tempInfoCep.setAttribute('disabled'," ");
  tempInfoCep.setAttribute('style','background-color: #333');
  tempInfoBairro.setAttribute('disabled'," ");
  tempInfoBairro.setAttribute('style','background-color: #333');
  tempInfoUf.setAttribute('disabled'," ");
  tempInfoUf.setAttribute('style','background-color: #333');
  tempInfoCidade.setAttribute('disabled'," ");
  tempInfoCidade.setAttribute('style','background-color: #333');
  tempInfoHistorico.setAttribute('disabled'," ");
  tempInfoHistorico.setAttribute('style','background-color: #333; width: 300px; height:150px');
  tempInfoMedicamento.setAttribute('disabled'," ");
  tempInfoMedicamento.setAttribute('style','background-color: #333; width: 300px; height:150px');
  tempInfoCirurgia.setAttribute('disabled'," ");
  tempInfoCirurgia.setAttribute('style','background-color: #333; width: 300px; height:150px');
  tempInfoTrauma.setAttribute('disabled'," ");
  tempInfoTrauma.setAttribute('style','background-color: #333; width: 300px; height:150px');
  buttonGravar.setAttribute('disabled'," ");
}

function ClearData(){
  tempInfoNome.value = '';
  tempInfoNome.removeAttribute('style'); 
  tempInfoMenor.checked=false;
  tempInfoResponsavel.value = '';
  tempInfoCpfresp.value = '';
  tempInfoCpf.value = '';
  tempInfoCns.value = '';
  tempInfoRegistro.value = '';
  tempInfoNacionalidade.value = '';
  tempInfoNascimento.value = '';
  tempInfoGenero.value = '';
  tempInfoTel.value = '';
  tempInfoCel.value = '';
  tempInfoWhatsapp.checked=false;
  tempInfoEmail.value = '';
  tempInfoEndereco.value = '';
  tempInfoCep.value = '';
  tempInfoBairro.value = '';
  tempInfoUf.value = '';
  tempInfoCidade.value = '';
  tempInfoHistorico.value = '';
  tempInfoMedicamento.value = '';
  tempInfoCirurgia.value = '';
  tempInfoTrauma.value = '';
}

function SearchRegister(){
  tempInfoNome.value = tempInfoNome.value.toUpperCase();
  EnableAll(); 
  ClearDataMinusNome();
  GetDataFromNome(tempInfoNome.value); // fetch.js
}

function EnableAll(){
  tempInfoMenor.removeAttribute('disabled');
  tempInfoMenor.removeAttribute('style');

  tempInfoCpf.removeAttribute('disabled');
  tempInfoCpf.removeAttribute('style');
  tempInfoCns.removeAttribute('disabled');
  tempInfoCns.removeAttribute('style');
  tempInfoRegistro.removeAttribute('disabled');
  tempInfoRegistro.removeAttribute('style');
  tempInfoNacionalidade.removeAttribute('disabled');
  tempInfoNacionalidade.removeAttribute('style');
  tempInfoNascimento.removeAttribute('disabled');
  tempInfoNascimento.removeAttribute('style');
  tempInfoGenero.removeAttribute('disabled');
  tempInfoGenero.removeAttribute('style');
  tempInfoTel.removeAttribute('disabled');
  tempInfoTel.removeAttribute('style');
  tempInfoCel.removeAttribute('disabled');
  tempInfoCel.removeAttribute('style');
  tempInfoWhatsapp.removeAttribute('disabled');
  tempInfoWhatsapp.removeAttribute('style');
  tempInfoEmail.removeAttribute('disabled');
  tempInfoEmail.removeAttribute('style');
  tempInfoEndereco.removeAttribute('disabled');
  tempInfoEndereco.removeAttribute('style');
  tempInfoCep.removeAttribute('disabled');
  tempInfoCep.removeAttribute('style');
  tempInfoBairro.removeAttribute('disabled');
  tempInfoBairro.removeAttribute('style');
  tempInfoUf.removeAttribute('disabled');
  tempInfoUf.removeAttribute('style');
  tempInfoCidade.removeAttribute('disabled');
  tempInfoCidade.removeAttribute('style');
  tempInfoHistorico.removeAttribute('disabled');
  tempInfoHistorico.removeAttribute('style');
  tempInfoHistorico.setAttribute('style','width: 300px; height:150px');
  tempInfoMedicamento.removeAttribute('disabled');
  tempInfoMedicamento.removeAttribute('style');
  tempInfoMedicamento.setAttribute('style','width: 300px; height:150px');
  tempInfoCirurgia.removeAttribute('disabled');
  tempInfoCirurgia.removeAttribute('style');
  tempInfoCirurgia.setAttribute('style','width: 300px; height:150px');
  tempInfoTrauma.removeAttribute('disabled');
  tempInfoTrauma.removeAttribute('style');
  tempInfoTrauma.setAttribute('style','width: 300px; height:150px');
  buttonGravar.removeAttribute('disabled');
  buttonGravar.removeAttribute('style');
}

function ClearDataMinusNome(){
  //tempInfoNome.value = '';
  tempInfoNome.removeAttribute('style'); 
  tempInfoMenor.checked=false;
  tempInfoResponsavel.value = '';
  tempInfoCpfresp.value = '';
  tempInfoCpf.value = '';
  tempInfoCns.value = '';
  tempInfoRegistro.value = '';
  tempInfoNacionalidade.value = '';
  tempInfoNascimento.value = '';
  tempInfoGenero.value = '';
  tempInfoTel.value = '';
  tempInfoCel.value = '';
  tempInfoWhatsapp.checked=false;
  tempInfoEmail.value = '';
  tempInfoEndereco.value = '';
  tempInfoCep.value = '';
  tempInfoBairro.value = '';
  tempInfoUf.value = '';
  tempInfoCidade.value = '';
  tempInfoHistorico.value = '';
  tempInfoMedicamento.value = '';
  tempInfoCirurgia.value = '';
  tempInfoTrauma.value = '';
}

function ShowDataGetNome(data){
  tempInfoNome.value = data[0].nome;
  if (data[0].menor) {
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
  tempInfoResponsavel.value = data[0].responsavel;

  tempInfoCpfresp.value = data[0].cpfresp;

  tempInfoCpf.value = data[0].cpf;
  
  tempInfoCns.value = data[0].cns;
  if (tempInfoCns.value.length != 18 && tempInfoCns.value.length != 0) tempInfoCns.setAttribute('style','color: red;');

  tempInfoRegistro.value = data[0].registro;
  if (tempInfoRegistro.value.length != 9 && tempInfoRegistro.value.length != 0) tempInfoRegistro.setAttribute('style','color: red;');  

  tempInfoNacionalidade.value = data[0].nacionalidade;
  tempInfoNascimento.value = data[0].nascimento;
  tempInfoGenero.value = data[0].genero;

  tempInfoTel.value = data[0].tel;
  if (tempInfoTel.value.length !=14 && tempInfoTel.value.length != 0) tempInfoTel.setAttribute('style','color: red;');  

  tempInfoCel.value = data[0].cel;
  if (tempInfoCel.value.length !=15 && tempInfoCel.value.length != 0) tempInfoCel.setAttribute('style','color: red;');   
  
  (data[0].whatsapp) ? tempInfoWhatsapp.checked=true : tempInfoWhatsapp.checked=false
  tempInfoEmail.value = data[0].email;
  tempInfoEndereco.value = data[0].endereco;

  tempInfoCep.value = data[0].cep;
  if (tempInfoCep.value.length !=9 && tempInfoCep.value.length != 0) tempInfoCep.setAttribute('style','color: red;'); 
  
  tempInfoBairro.value = data[0].bairro;
  tempInfoUf.value = data[0].uf;
  tempInfoCidade.value = data[0].cidade;

  tempInfoHistorico.value = data[0].historico;
  tempInfoMedicamento.value = data[0].medicamento;
  tempInfoCirurgia.value = data[0].cirurgia;
  tempInfoTrauma.value = data[0].trauma;
 }
 
async function GravaLocalInfo(){  
let alertNome, alertResponsavel, alertCpfresp,alertCpf, alertCns, alertRegistro, alertTel, alertCel, alertCep; 

(isEmpty(tempInfoNome.value)) ? alertNome = `\n[Nome não informado]` : alertNome = '';

alertResponsavel = '';
alertCpfresp = '';
if (tempInfoMenor.checked)
{
  if (isEmpty(tempInfoResponsavel.value)) alertResponsavel = `\n[Responsável não informado]`;
  else alertResponsavel = '';
  if (tempInfoCpfresp.value.length != 14 && tempInfoCpfresp.value.length != 0) alertCpfresp = `\n[CPF resp. ${tempInfoCpfresp.value}]`;
  else if (isEmpty(tempInfoCpfresp.value)) alertCpfresp = `\n[CPF resp. não informado]`;
  else if (tempInfoCpfresp.value==tempInfoCpf.value) alertCpfresp = `\n[CPF do responsável igual do paciente]`;
  else  alertCpfresp = ''; 
}

if (tempInfoCpf.value.length != 14 && tempInfoCpf.value.length != 0)  alertCpf = `\n[CPF ${tempInfoCpf.value}]`;
else if (isEmpty(tempInfoCpf.value) && tempInfoMenor.checked==false) alertCpf = `\n[CPF não informado]`;
else if (tempInfoCpf.value.length != 0 && await ValidaExistenciaCpfDB(tempInfoCpf.value)!=0 ) alertCpf = `\n[CPF pertence a outro paciente]`;
else alertCpf = ''; 


if (tempInfoCns.value.length != 18 && tempInfoCns.value.length != 0 )  alertCns = `\n[CNS ${tempInfoCns.value}]`;
else if (tempInfoCns.value.length != 0 && await ValidaExistenciaCnsDB(tempInfoCns.value)!=0 ) alertCns = `\n[CNS pertence a outro paciente]`;
else alertCns = ''; 

if (tempInfoRegistro.value.length != 9 && tempInfoRegistro.value.length != 0)  alertRegistro = `\n[Registro ${tempInfoRegistro.value}]`;
else if (tempInfoRegistro.value.length != 0 && await ValidaExistenciaRegistroDB(tempInfoRegistro.value)!=0 ) {alertRegistro = `\n[Registro pertence a outro paciente]`;}  
else alertRegistro = '';  

if (tempInfoTel.value.length !=14 && tempInfoTel.value.length != 0) alertTel = `\n[Tel. ${tempInfoTel.value}]`;
else alertTel = ''; 

if (tempInfoCel.value.length !=15 && tempInfoCel.value.length != 0)  alertCel = `\n[Cel. ${tempInfoCel.value}]`;
else alertCel = '';   

if (tempInfoCep.value.length !=9 && tempInfoCep.value.length != 0) alertCep = `\n[CEP ${tempInfoCep.value}]`;
else alertCep = ''; 

if (alertNome!=''||alertResponsavel!=''||alertCpfresp!=''||alertCpf!=''||alertCns!=''||alertRegistro!=''||alertTel!=''||alertCel!=''||alertCep!='') 
  { 
  MsgCenterButtonText('warning','Dados inconsistentes!',`Corrija: \n${alertNome} \n${alertResponsavel} \n${alertCpfresp} \n${alertCpf} \n${alertCns} \n${alertRegistro} \n${alertTel} \n${alertCel} \n${alertCep}`);
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
    tempInfoMedicamento.value, tempInfoCirurgia.value, tempInfoTrauma.value);
  jsonPaciente = JSON.stringify(paciente);

  if (cameFromDb){
    let retorno = await PutDataPaciente(idDb, jsonPaciente);
    switch (retorno){
      case 0:
        MsgCenter('success','Dados atualizados!', false); break;
      case 1:
        MsgCenterButtonText('error','ID não localizado.', 'Corrija!'); break;    
      case 2:
        MsgCenterButtonText('error','Erro no servidor!', 'Contacte o Suporte TI.'); break;  
      case 3:
        MsgCenterButtonText('error','CPF do responsável!', 'Não pode ser igual ao do paciente.'); break;   
      }
    }
  else {  
    let retorno = await PostDataPaciente(jsonPaciente);
    switch (retorno){
      case 0:
        MsgCenter('success','Dados enviados!', false); break;
      case 1:
        MsgCenterButtonText('error','Erro no servidor!', 'Contacte o Suporte TI'); break;  
      case 2:
        MsgCenterButtonText('error','CPF do responsável não pode ser igual ao do paciente', 'Corrija'); break;    
    }
  }
  ClearData();
  DisableAll();
  }
}


 
 








