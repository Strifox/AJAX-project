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

var addBtn = document.getElementById('addBtn').addEventListener('click', addBook)

function getBooks(){
  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=tFVZr')
  .then((response) => response.json())
  .then((data) => {
    if(data.status != 'success'){
      console.log('Operation failed, click again on "Get Books"')
      return;
    }

    let output = '<h2>Books</h2>';
    let books = [];

    for(i = 0; i < data.data.length; i++) {
      books[i] = data.data[i];
    }

    for(let x of books) {
      output += `
          <input type="text" id="title${x.id}" value="${x.title}">
          <input type="text" id="author${x.id}" value="${x.author}">
          <button onclick="deleteBook(${x.id})">Delete</button>
          <button onclick="updateBook(${x.id})">Update</button>
          <br>
      `;
    }
  document.getElementById('content').innerHTML = output;
  })
}

function addBook() {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;

  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=tFVZr&title='+title+'&author='+author+'')
  .then((response) => response.json())
  .then((data) => data)
}

function deleteBook(id) {
  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=tFVZr&id='+id+'')
  .then((response) => response.json())
  .then((data) => {
    if(data.status !== 'success') {
      console.log('Operation failed, click again on "Delete"')
    }
    else {
      console.log('Successfully deleted book')
    }
  })
}

function updateBook(id) {
  let title = document.getElementById('title'+id).value;
  let author = document.getElementById('author'+id).value;

  console.log(title);
  console.log(author);

  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=tFVZr&id='+id+'&title='+title+'&author='+author)
  .then((response) => response.json())
  .then((data) => {
    if(data.status !== 'success') {
      console.log('Operation failed, click again on "Update"')
    }
    else {
      console.log('Successfully updated book')
    }
  })
}
