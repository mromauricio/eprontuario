/// MÁSCARAS
$(document).ready(function () { 
  let $cpf = $('#cpf');
  $cpf.mask('000.000.000-00', {reverse: false});
  let $cpfresp = $('#cpfresp');
  $cpfresp.mask('000.000.000-00', {reverse: false});
  let $cns = $('#cns');
  $cns.mask('000.0000.0000.0000', {reverse: false});
  let $registro = $('#registro');
  $registro.mask('0.000.000', {reverse: false});
  let $tel = $('#tel');
  $tel.mask('(00) 0000-0000', {reverse: true});
  let $cel = $('#cel');
  $cel.mask('(00) 00000-0000', {reverse: true});
  let $cep = $('#cep');
  $cep.mask('00000-000', {reverse: false});
});

/// ALERTAS
function MsgTop(type, message){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: type,
      title: message
    })
}
 
function MsgCenter (type, title){
  Swal.fire({
    position: 'center',
    icon: type,
    title: title,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
  })
}

function MsgCenterText(type, title, message){
  Swal.fire({
    position: 'center',
    icon: type,
    title: title,
    text: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
  })
}

function MsgCenterButtonText(type, title, message){
  Swal.fire({
    position: 'center',
    icon: type,
    title: title,
    text: message,
    showConfirmButton: true,
  })
}

async function MsgHomonio(htmlData){
  let result = await Swal.fire({
    width: 800,
    title: 'Escolha opção desejada:',
    icon: 'info',
    html: htmlData,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonColor: '#87CEFA',
    confirmButtonText: 'Incluir homônino',
    cancelButtonColor: '#87CEFA',
    cancelButtonText: 'Voltar'
  })
  return result
}
async function MsgSearch(htmlData){
  let result = await Swal.fire({
    width: 800,
    title: 'Escolha opção desejada:',
    icon: 'info',
    html: htmlData,
    showConfirmButton: false,
    showCloseButton: true,
    showCancelButton: true,
    cancelButtonColor: '#87CEFA',
    focusConfirm: false,
    cancelButtonText: 'Voltar'
  })
  return result
}
////////////// FIM ALERTAS

function ValidaCpf(cpf)
{
cpf= cpf.replace(/[^0-9\'']+/g,'');
if (cpf.length == 0 ) return(cpf);
if (cpf.length != 11)  
{
  return (cpf); }
const cpfnum = new Array;
for (let i = 0; i <= 10; i++) { cpfnum[i] = parseInt(cpf.charAt(i)); }
if (cpfnum[0] == cpfnum[1] && cpfnum[0] == cpfnum[2] && cpfnum[0] == cpfnum[3]
   && cpfnum[0] == cpfnum[4] && cpfnum[0] == cpfnum[5]
   && cpfnum[0] == cpfnum[6] && cpfnum[0] == cpfnum[7] && cpfnum[0] == cpfnum[8]
   && cpfnum[0] == cpfnum[9])
{ 
  return (cpf); }
let conta1 = 0;
for (let i = 1; i <= 9; i++) { conta1 += (cpfnum[i - 1] * (11 - i)); }
let conta2 = (conta1 * 10) % 11;
if (conta2 == 10) conta2 = 0;
let ok = false;
if (cpfnum[9] == conta2) {
  let conta3 = 0;
  for (let i = 1; i <= 10; i++) { conta3 += (cpfnum[i - 1] * (12 - i)); }
  let conta4 = (conta3 * 10) % 11;
  if (conta4 == 10) conta4 = 0;
  if (cpfnum[10] == conta4) {
    cpf = cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "."
    + cpf.substring(6, 9) + "-" + cpf.substring(9, 11);
    return (cpf);
  }
}
return (cpf);
}


async function ValidaExistenciaCpfDB(cpf){
  let retorno = await GetCpf(cpf);
  if (retorno == 2 || retorno == 5 || idDb==retorno[0].id_paciente ) return 0
  return retorno
  }

function ValidaCns(cns){
cns = cns.replace(/[^0-9\'']+/g,'');
if ( (cns.length>=1 && cns.length != 15) || (cns.length == 0) ) return(cns);
else { /* máscara 000.0000.0000.0000 */
  cns = cns.substring(0, 3) + "." + cns.substring(3, 7) + "." + cns.substring(7, 11) + "." + cns.substring(11, 15);
  return (cns); }
}

async function ValidaExistenciaCnsDB(cns){
  let retorno = await GetCns(cns);
  if (retorno == 2 || retorno == 5 || idDb==retorno[0].id_paciente ) return 0
  return retorno
  }

function ValidaRegistro(registro){
registro = registro.replace(/[^0-9\'']+/g,'');
if ((registro.length>=1 && registro.length != 7) || registro.length == 0) return(registro);
else { /* máscara 0.000.000  */
  registro = registro.substring(0, 1) + "." + registro.substring(1, 4) + "." + registro.substring(4, 7);
  return (registro); }
}

async function ValidaExistenciaRegistroDB(registro){
let retorno = await GetRegistro(registro);
if (retorno == 2 || retorno == 5 || idDb==retorno[0].id_paciente ) return 0
return retorno
}

function ValidaTel(tel){
tel = tel.replace(/[^0-9\'']+/g,'');
if ((tel.length>=1 && tel.length != 8 && tel.length !=10) || tel.length == 0) return(tel);
else if (tel.length == 10) { /* máscara (  ) 9999-9999 */
  tel = "(" + tel.substring(0, 2) + ") " + tel.substring(2, 6) + "-" + tel.substring(6, 10);
  return (tel); }
else { /* (99) 99999-9999  */ 
  tel = "(  ) " + tel.substring(0, 4) + "-" + tel.substring(4, 8);
  return (tel);  }
}

function ValidaCel(cel){
cel = cel.replace(/[^0-9\'']+/g,'');
if ((cel.length>=1 && cel.length != 9 && cel.length !=11) || cel.length == 0) return(cel);
else if (cel.length == 11) { /* máscara (  ) 99999-9999   */
  cel = "(" + cel.substring(0, 2) + ") " + cel.substring(2, 7) + "-" + cel.substring(7, 11);
  return (cel); }
else { /* máscara (99) 99999-9999   */ 
  cel = "(  ) " + cel.substring(0, 5) + "-" + cel.substring(5, 9);
  return (cel);  }
}

function ValidaCep(cep){
cep = cep.replace(/[^0-9\'']+/g,'');
if ((cep.length>=1 && cep.length != 8) || cep.length == 0) return(cep);
else  { /* máscara 99999-999 */
  cep = cep.substring(0, 5) + "-" + cep.substring(5, 8);
  return (cep); }
}