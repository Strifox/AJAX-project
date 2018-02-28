 /* var content, txt = "";

let request = new XMLHttpRequest();
request.open('GET', 'https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=tFVZr');
request.onreadystatechange = function(event) {
  if(request.status == 200 && request.readyState == 4) {
    console.log("Respons: " + request.responseText);
    content = JSON.parse(request.responseText);
    console.log("Här kommer content: ", content);
      txt += "<table border='1'>";
        for (let x in content) {
          let y = content[x];
            txt += "<tr><td>" + y[0].title + "</td>";
            txt += "<td>" + y[0].author + "</td></tr>";
        }
      txt += "</table>";
      document.getElementById('content').innerHTML = txt;
    }
  };
request.send();

data.forEach(function(book){
  output += `
    <ul>
      <li>Title: </li>
      <li>Author:  </li>
    </ul>
  `;
*/

var request = ('https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=tFVZr');
var content = document.getElementById('content');
var getBooksBtn = document.getElementById('getBooksBtn');
getBooksBtn.addEventListener('click', getBooks)

function getBooks(){
  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=tFVZr')
  .then((response) => response.json())
  .then((data) => {
    let output = '<h2>Books</h2>';
    for(let x of data.data) {
      output += `
          <input type="text" name="title" value="${x.title}">
          <input type="text" name="title" value="${x.author}"> <br>
      `;
    }
  document.getElementById('content').innerHTML = output;
  })
}
