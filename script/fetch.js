
function RequestHTTP(action, jsonContent){ 
  let url = new URL('http://localhost:3000');
  if (action == 'POST')  url.href += 'paciente';
  let xhttp = new XMLHttpRequest();
  xhttp.open(action, url, false); /* How to obtain response when async is true ????  */
  xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  (action == 'GET') ? xhttp.send() : xhttp.send(jsonContent);
  console.log(xhttp);
  if (xhttp.readyState == 4 && xhttp.status>=200 && xhttp.status<=299) return(1);  /* if async is true status returns 0 */
  else return(0); 
  //xhttp.responseType = 'text';  /* only works if async is true  */
  //xhttp.withCredentials = true; /* make cross-origin requests, using the same CORS policy as fetch. */
  //xhttp.setRequestHeader('Access-Control-Allow-Origin',url); /* add verbo OPTIONS */
 // xhttp.onload = function() {console.log(xhttp)};
}

/////////////////
function FetchGetJson(){
  let url =  new URL('http://localhost:3000/jsonserver');
  fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));
}

function FetchGetText(){
  let url =  new URL('http://localhost:3000');
  fetch(url)
  .then(response => response.text())
  .then(data => console.log(data));
}

function FetchPost(jsonContent){
  let url =  new URL('http://localhost:3000/paciente');
  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: jsonContent
  })
  //.then(response => console.log(response.text()))
  // .then(response => response.text())
  .then(response => { console.log('Success:', response);
        console.log(response.ok);
  .catch((error) => {
    console.error('Error:', error);
  })
}

//////////////////
async function FetchGetJsonAsync(){
  let url =  new URL('http://localhost:3000/jsonserver');
  fetch(url)
  await function() {response.json()}
  await function() {console.log(data)}
}

async function FetchGetTextAsync() {
  let url =  new URL('http://localhost:3000');
  fetch(url);
  await function(){response.text()};
  await function(){console.log(data);}
}

async function FetchPostAsync (jsonContent){
  let result;
  let url =  new URL('http://localhost:3000/paciente');
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: jsonContent
  })
  //.then(response => console.log(response.text()))
  await function() { response.text()}
  await function() { console.log('Success:', data); }
}

//////////////////
function GetHTTPjQuery(){
  let url = new URL('http://localhost:3000');
  $.get(url, function(data, status){
    console.log("Data: " + data + "\nStatus: " + status);
  });
}

function PostHTTPjQuery(jsonContent){
  let url = new URL('http://localhost:3000/paciente');
  $.post(url, jsonContent, function(data, status){
    console.log("Data: " + data + "\nStatus: " + status);
  });
}