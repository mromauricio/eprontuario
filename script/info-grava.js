
let tempInfoName = document.querySelector('#aligned-name');
let tempInfoResponsavel = document.querySelector('#aligned-responsavel');
let tempInfoCpfresp = document.querySelector('input[id="aligned-cpfresp"]');
let tempInfoMenor = document.querySelector('#menor');
let tempInfoCpf = document.querySelector('input[id="aligned-cpf"]');
let tempInfoCns = document.querySelector('#aligned-cns');
let tempInfoRegistro = document.querySelector('#aligned-registro');
let tempInfonacionalidade = document.querySelector('#aligned-nacionalidade');
let tempInfoNascimento = document.querySelector('#aligned-datanascimento');
let tempInfoGenero = document.querySelector('#stacked-genero');
let tempInfoTel = document.querySelector('#aligned-tel');
let tempInfoCel = document.querySelector('#aligned-cel');
let tempInfoWhatsapp = document.querySelector('#whatsapp');
let tempInfoEmail = document.querySelector('#aligned-email');
let tempInfoEndereco = document.querySelector('#aligned-endereco');
let tempInfoCep = document.querySelector('#aligned-cep');
let tempInfoBairro = document.querySelector('#aligned-bairro');
let tempInfoUf = document.querySelector('#stacked-uf');
let tempInfoCidade = document.querySelector('#aligned-cidade');
let buttonGravar = document.querySelector('#gravar');
const isEmpty = str => !str.trim().length;



/* Listeners */
buttonGravar.addEventListener('click', GravaLocalInfo);

tempInfoName.addEventListener("keyup", function(event) {
if (event.keyCode === 13) {
  event.preventDefault();
  SearchRegister();
}
});

tempInfoMenor.addEventListener('click', function(){
  if (this.checked) {
    tempInfoResponsavel.removeAttribute('disabled'); 
    tempInfoCpfresp.removeAttribute('disabled'); 
   }
  else { 
    tempInfoResponsavel.setAttribute('disabled'," ");
    tempInfoCpfresp.setAttribute('disabled'," ");
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
  if ((this.value.length != 14 && this.value.length != 0)||isEmpty(this.value)) {
    this.setAttribute('style','color: red;');
    MsgTop('error', 'CPF responsável inválido!');
  }
  else this.removeAttribute('style');
});

tempInfoCpf.addEventListener('blur', function(){
this.value = ValidaCpf(this.value); 
if (this.value.length != 14 && this.value.length != 0||isEmpty(this.value)) {
  this.setAttribute('style','color: red;');
  MsgTop('error', 'CPF inválido!');
}
else tempInfoCpf.removeAttribute('style');
});

tempInfoCns.addEventListener('blur', function(){
  this.value = ValidaCns(this.value);
if (this.value.length != 18 && this.value.length != 0) {
  this.setAttribute('style','color: red;');  
  MsgTop('error', 'CNS inválido!');
}
else this.removeAttribute('style');
});

tempInfoRegistro.addEventListener('blur', function(){
  this.value = ValidaRegistro(this.value);
  if (this.value.length != 9 && this.value.length != 0) {
    this.setAttribute('style','color: red;');  
    MsgTop('error', 'Registro inválido!');
  }
  else this.removeAttribute('style');
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

DisableAll();
tempInfoName.focus();

function SearchRegister(){
  tempInfoName.value = tempInfoName.value.toUpperCase();
  if (localStorage.getItem('name') != null)
  {
    if (tempInfoName.value.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") == localStorage.name.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) 
    {
      ShowData();
    } 
  }
  EnableAll(); 
}


function GravaLocalInfo(){  
let alertResponsavel, alertCpfresp,alertCpf, alertCns, alertRegistro, alertTel, alertCel, alertCep; 

localStorage.setItem('name',tempInfoName.value.toUpperCase());
localStorage.setItem('menor', tempInfoMenor.checked);
alertResponsavel = '';
alertCpfresp = '';
if (tempInfoMenor.checked)
{
  if (isEmpty(tempInfoResponsavel.value)) alertResponsavel = `\n[Responsável não informado]`;
  else alertResponsavel = '';
  if (tempInfoCpfresp.value.length != 14 && tempInfoCpfresp.value.length != 0) alertCpfresp = `\n[CPF resp. ${tempInfoCpfresp.value}]`;
  else if (isEmpty(tempInfoCpfresp.value)) alertCpfresp = `\n[CPF resp. não informado]`;
  else  alertCpfresp = ''; 
}
localStorage.setItem('responsavel', tempInfoResponsavel.value.toUpperCase());
localStorage.setItem('cpfresp', tempInfoCpfresp.value); 

if (tempInfoCpf.value.length != 14 && tempInfoCpf.value.length != 0)  alertCpf = `\n[CPF ${tempInfoCpf.value}]`;
else alertCpf = '';  
localStorage.setItem('cpf', tempInfoCpf.value); 

if (tempInfoCns.value.length != 18 && tempInfoCns.value.length != 0) {
  localStorage.setItem('cns', tempInfoCns.value); 
  alertCns = `\n[CNS ${tempInfoCns.value}]`;}
else { localStorage.setItem('cns', tempInfoCns.value);  alertCns = ''; }

if (tempInfoRegistro.value.length != 9 && tempInfoRegistro.value.length != 0) { 
  localStorage.setItem('registro', tempInfoRegistro.value); 
  alertRegistro = `\n[Registro ${tempInfoRegistro.value}]`;}
else { localStorage.setItem('registro', tempInfoRegistro.value);  alertRegistro = ''; }    

localStorage.setItem('nacionalidade', tempInfonacionalidade.value);
localStorage.setItem('nascimento', tempInfoNascimento.value);
localStorage.setItem('genero',tempInfoGenero.value);


if (tempInfoTel.value.length !=14 && tempInfoTel.value.length != 0) {
  localStorage.setItem('tel', tempInfoTel.value); 
  alertTel = `\n[Tel. ${tempInfoTel.value}]`;}
else { localStorage.setItem('tel', tempInfoTel.value);  alertTel = ''; }   


if (tempInfoCel.value.length !=15 && tempInfoCel.value.length != 0) { 
  localStorage.setItem('cel', tempInfoCel.value); 
  alertCel = `\n[Cel. ${tempInfoCel.value}]`;}
else { localStorage.setItem('cel', tempInfoCel.value);  alertCel = ''; }   

localStorage.setItem('whatsapp', tempInfoWhatsapp.checked);
localStorage.setItem('email',tempInfoEmail.value);
localStorage.setItem('endereco',tempInfoEndereco.value);


if (tempInfoCep.value.length !=9 && tempInfoCep.value.length != 0) { 
  localStorage.setItem('cep', tempInfoCep.value); 
  alertCep = `\n[CEP ${tempInfoCep.value}]`;}
else { localStorage.setItem('cep', tempInfoCep.value);  alertCep = ''; } 

localStorage.setItem('bairro',tempInfoBairro.value);
localStorage.setItem('uf',tempInfoUf.value);
localStorage.setItem('cidade',tempInfoCidade.value);

if (alertResponsavel!=''||alertCpfresp!=''||alertCpf!=''||alertCns!=''||alertRegistro!=''||alertTel!=''||alertCel!=''||alertCep!='') 
{ 
  alert(`Dados gravados com inconsistências:\n${alertResponsavel} \n${alertCpfresp} \n${alertCpf} \n${alertCns} \n${alertRegistro} \n${alertTel} \n${alertCel} \n${alertCep}`); 
}
else alert('Dados salvos!'); 
DisableAll();
}


function EnableAll(){
  tempInfoMenor.removeAttribute('disabled');
  if (tempInfoMenor.checked) { 
    tempInfoResponsavel.removeAttribute('disabled');
    tempInfoCpfresp.removeAttribute('disabled');
  }
  tempInfoCpf.removeAttribute('disabled');
  tempInfoCns.removeAttribute('disabled');
  tempInfoRegistro.removeAttribute('disabled');
  tempInfonacionalidade.removeAttribute('disabled');
  tempInfoNascimento.removeAttribute('disabled');
  tempInfoGenero.removeAttribute('disabled');
  tempInfoTel.removeAttribute('disabled');
  tempInfoCel.removeAttribute('disabled');
  tempInfoWhatsapp.removeAttribute('disabled');
  tempInfoEmail.removeAttribute('disabled');
  tempInfoEndereco.removeAttribute('disabled');
  tempInfoCep.removeAttribute('disabled');
  tempInfoBairro.removeAttribute('disabled');
  tempInfoUf.removeAttribute('disabled');
  tempInfoCidade.removeAttribute('disabled');
  buttonGravar.removeAttribute('disabled');
}

function ShowData(){
  tempInfoName.value = localStorage.name;
  (localStorage.menor == "false") ? tempInfoMenor.checked=false : tempInfoMenor.checked=true
  
  tempInfoResponsavel.value = localStorage.responsavel;

  tempInfoCpfresp.value = localStorage.cpfresp;

  tempInfoCpf.value = localStorage.cpf;
  if (tempInfoCpf.value.length != 14 && tempInfoCpf.value.length != 0) tempInfoCpf.setAttribute('style','color: red;');
  
  tempInfoCns.value = localStorage.cns;
  if (tempInfoCns.value.length != 18 && tempInfoCns.value.length != 0) tempInfoCns.setAttribute('style','color: red;');

  tempInfoRegistro.value = localStorage.registro;
  if (tempInfoRegistro.value.length != 9 && tempInfoRegistro.value.length != 0) tempInfoRegistro.setAttribute('style','color: red;');  

  tempInfonacionalidade.value = localStorage.nacionalidade;
  tempInfoNascimento.value = localStorage.nascimento;
  tempInfoGenero.value = localStorage.genero;

  tempInfoTel.value = localStorage.tel;
  if (tempInfoTel.value.length !=14 && tempInfoTel.value.length != 0) tempInfoTel.setAttribute('style','color: red;');  

  tempInfoCel.value = localStorage.cel;
  if (tempInfoCel.value.length !=15 && tempInfoCel.value.length != 0) tempInfoCel.setAttribute('style','color: red;');   
  
  (localStorage.whatsapp=="false") ? tempInfoWhatsapp.checked=false : tempInfoWhatsapp.checked=true
  tempInfoEmail.value = localStorage.email;
  tempInfoEndereco.value = localStorage.endereco;

  tempInfoCep.value = localStorage.cep;
  if (tempInfoCep.value.length !=9 && tempInfoCep.value.length != 0) tempInfoCep.setAttribute('style','color: red;'); 
  
  tempInfoBairro.value = localStorage.bairro;
  tempInfoUf.value = localStorage.uf;
  tempInfoCidade.value = localStorage.cidade;
}

function DisableAll(){
  tempInfoMenor.setAttribute('disabled'," ");
  tempInfoResponsavel.setAttribute('disabled'," ");
  tempInfoCpfresp.setAttribute('disabled'," ");
  tempInfoCpf.setAttribute('disabled'," ");
  tempInfoCns.setAttribute('disabled'," ");
  tempInfoRegistro.setAttribute('disabled'," ");
  tempInfonacionalidade.setAttribute('disabled'," ");
  tempInfoNascimento.setAttribute('disabled'," ");
  tempInfoGenero.setAttribute('disabled'," ");
  tempInfoTel.setAttribute('disabled'," ");
  tempInfoCel.setAttribute('disabled'," ");
  tempInfoWhatsapp.setAttribute('disabled'," ");
  tempInfoEmail.setAttribute('disabled'," ");
  tempInfoEndereco.setAttribute('disabled'," ");
  tempInfoCep.setAttribute('disabled'," ");
  tempInfoBairro.setAttribute('disabled'," ");
  tempInfoUf.setAttribute('disabled'," ");
  tempInfoCidade.setAttribute('disabled'," ");
  buttonGravar.setAttribute('disabled'," ");
}




class Paciente {
  constructor(name, menor, responsavel, cpfresp, cpf, cns, registro, nacionalidade, nascimento,  genero,
             tel, cel, whatsapp, email, endereco, cep, bairro, uf, cidade ){
    this.name = name;
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
  }
}


let paciente = new Paciente(localStorage.name, localStorage.menor, 
  localStorage.responsavel, localStorage.cpfresp,
  localStorage.cpf, 
  localStorage.cns, localStorage.registro, localStorage.nacionalidade,
  localStorage.nascimento, localStorage.genero, localStorage.tel, localStorage.cel,
  localStorage.whatsapp, localStorage.email, localStorage.endereco, localStorage.cep,
  localStorage.bairro, localStorage.uf, localStorage.cidade)

  console.log('paciente: '+typeof(paciente));  
  console.log (paciente);
  
  jsonPaciente = JSON.stringify(paciente);
  console.log('paciente: '+typeof(jsonPaciente)+' (json)');
  console.log(jsonPaciente);
  

/*

class Paciente {
  constructor( ){
    this.name = [];
    this.menor = [];
    this.responsavel = [];
    this.cpfresp = [];
    this.cpf = [];
    this.cns = [];
    this.registro = [];
    this.nacionalidade = [];
    this.nascimento = [];
    this.genero = [];
    this.tel = [];
    this.cel = [];
    this.whatsapp = [];
    this.email = [];
    this.endereco = [];
    this.cep = [];
    this.bairro = [];
    this.uf = [];
    this.cidade = [];
  }
  push(element){
    this.name.push(element);
    this.menor.push(element);
    this.responsavel.push(element);
    this.cpfresp.push(element);
    this.cpf.push(element);
    this.cns.push(element);
    this.registro.push(element);
    this.nacionalidade.push(element);
    this.nascimento.push(element);
    this.genero.push(element);
    this.tel.push(element);
    this.cel.push(element);
    this.whatsapp.push(element);
    this.email.push(element);
    this.endereco.push(element);
    this.cep.push(element);
    this.bairro.push(element);
    this.uf.push(element);
    this.cidade.push(element);
  }
}

/* let paciente = new Paciente; */
