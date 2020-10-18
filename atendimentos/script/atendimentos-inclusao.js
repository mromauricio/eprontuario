// FOREIGN FUNCTION´S LOCATION
// Get...    (/global/script/fetch.js)
// Msg...    (/global/script/mensagens.js)
// Valida... (/global/script/valida.js)
// ...Master (/atendimentos/script/atendimentos-master.js)

async function CriaTelaAtendimento(){
  let retorno = await GetHtmlMain('view-atendimentos-inclusao.html');
  if (retorno.length>0) tagMain.innerHTML = retorno;
  if (retorno == 2) MsgCenterButtonText('error','HTML não localizado.', 'Contacte o Suporte TI.');
}


function RetornaTelaAtendimentoMaster(){
  CriaTelaAtendimentoMaster(indexPacienteBd);
}
