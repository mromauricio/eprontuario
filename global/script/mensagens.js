
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
  timerProgressBar: true
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
  timerProgressBar: true
})
}

function MsgCenterButtonOkText(type, title, message){
Swal.fire({
  position: 'center',
  icon: type,
  title: title,
  text: message,
  showConfirmButton: true
})
}

async function MsgCenterButtonsText(type, title, message){
let result = await Swal.fire({
  position: 'center',
  icon: type,
  title: title,
  text: message,
  showDenyButton: true,
  denyButtonText: 'Nada mudou',
  denyButtonColor: '#3085d6',
  confirmButtonText: 'Ir para cadastro',
  showConfirmButton: true,
  showCancelButton: true,
  cancelButtonText: 'Farei depois',
  focusCancel: true
})
return result
}

async function MsgHomonio(htmlData){
let result = await Swal.fire({
  width: 800,
  title: 'Escolha opção desejada:',
  icon: 'info',
  html: htmlData,
  showCancelButton: true,
  focusConfirm: false,
  confirmButtonText: 'Incluir homônino',
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
  showCancelButton: true,
  focusConfirm: false,
  cancelButtonText: 'Voltar'
})
return result
}