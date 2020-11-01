function CalculaIdade(nascimento){
  if (!nascimento) return 'Data nascimento ?';
  let age = '';
  let today = new Date();
  let years = today.getFullYear()-nascimento.substring(0,4);
  let months = today.getMonth()+1-nascimento.substring(5,7);
  let days = today.getDate()-nascimento.substring(8,10);
  if (days<0)  months = months-1; 
  if (years<=0) {
    if (months == 1) age = (`${months} mês`) 
    if (months  > 1) age = (`${months} meses`)
    if (months == 0) (days == 1) ? age = (`${days} dia`) : age = (`${days} dias`)
  }  
  else if (months == 0) (years == 1) ? age = (`${years} ano`) : age = (`${years} anos`);
  else if (months == 1) (years == 1) ? age = (`${years} ano e ${months} mês`) : age = (`${years} anos e ${months} mês`);
  else if (months  > 1)  (years == 1) ? age = (`${years} ano e ${months} meses`)  : age = (`${years} anos e ${months} meses`);
  else if (12+months == 1) (years-1 == 1) ? age = (`${years-1} ano e ${12+months} mês`) : age = (`${years-1} anos e ${12+months} mês`)
  else (years-1 == 1) ? age = (`${years-1} ano e ${12+months} meses`) : age = (`${years-1} anos e ${12+months} meses`);
  return age;
}

function CalculaDiferencaDias(datalog){
  let year = datalog.substring(0,4);
  let month = datalog.substring(5,7) - 1;
  let day = datalog.substring(8,10);
  let dateAux = new Date(year, month, day);
  let msDatalog = dateAux.getTime();
  let msHoje = Date.now();
  return (parseInt((msHoje-msDatalog)/86400000));
}

function CalculaDiferencaDiasAtendimento(dataatendimento){
  let year = dataatendimento.substring(0,4);
  let month = dataatendimento.substring(5,7) - 1;
  let day = dataatendimento.substring(8,10);
  let dateAux = new Date(year, month, day);
  let msDatalog = dateAux.getTime();
  let msHoje = Date.now();
  return ((msHoje-msDatalog)/86400000);
}

async function AtualizaDataLog(id_paciente){
  let retorno = await PutAtualizaDataPaciente (JSON.stringify({"id_paciente":`${id_paciente}`}));
  if (retorno == 0) return true
  if (retorno == 2 || retorno == 3 || retorno == 5) return false
}

function Hoje(){
  let dt = new Date();
  let dd = dt.getDate(); 
  let mm = dt.getMonth()+1; 
  if (dd <= 9) dd = `0${dd}`
  if (mm <=9 ) mm = `0${mm}`
  return `${dt.getFullYear()}-${mm}-${dd}`
}
