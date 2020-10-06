
const isEmpty = str => !str.trim().length;
let searchCpf = document.querySelector('#cpf');
let searchCns = document.querySelector('#cns');
let searchRegistro = document.querySelector('#registro');
let searchNome = document.querySelector('#nome');
searchCpf.value='';
searchCns.value='';
searchRegistro.value='';
searchNome.value='';

searchCpf.addEventListener('keyup', async function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    this.value = ValidaCpf(this.value);
    if (isEmpty(this.value)) {
      MsgTop('warning', 'Informe o CPF!');
    }
    else if (this.value.length != 14 && this.value.length != 0) {
        MsgTop('error', 'CPF inválido!');
    }
    else {
      let retorno = await GetCpf(this.value);
      if (retorno.length>0) console.log (retorno[0]);
      else MsgCenterText('info','Paciente não localizado!','Confira o dado informado.');
    }  
 }
});

searchCns.addEventListener('keyup', async function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    this.value = ValidaCns(this.value);
    if (isEmpty(this.value)) {
      MsgTop('warning', 'Informe o CNS!');
    }
    else if (this.value.length != 18 && this.value.length != 0) {
        MsgTop('error', 'CNS inválido!');
    }
    else {
      let retorno = await GetCns(this.value);
      if (retorno.length>0) console.log (retorno[0]);
      else MsgCenterText('info','Paciente não localizado!','Confira o dado informado.');
    }  
 }
});

searchRegistro.addEventListener('keyup', async function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    this.value = ValidaRegistro(this.value);
    if (isEmpty(this.value)) {
      MsgTop('warning', 'Informe o Registro!');
    }
    else if (this.value.length != 9 && this.value.length != 0) {
        MsgTop('error', 'Registro inválido!');
    }
    else {
      let retorno = await GetRegistro(this.value);
      if (retorno.length>0) console.log (retorno[0]);
      else MsgCenterText('info','Paciente não localizado!','Confira o dado informado.');
    }  
 }
});

searchNome.addEventListener('keyup', async function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    if (isEmpty(this.value)) {
      MsgTop('warning', 'Informe o nome!');
    }
    else {
      let retorno = await GetNome(this.value);
      if (retorno.length>0) {
        retorno.forEach( (item, index, arr) => {
          console.log(arr[index]);
        });
      }
      else MsgCenterText('info','Paciente não localizado!','Confira o dado informado.');
    }  
 }
});