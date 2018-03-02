
let apiStorage = window.localStorage;
let apiKey = apiStorage.getItem('id');

addEventListener('load', getBooks);

let content = document.getElementById('content');
let getBooksBtn = document.getElementById('getBooksBtn').addEventListener('click', getBooks);
let addBtn = document.getElementById('addBtn').addEventListener('click', addBook);
let requestAPIKeyBtn = document.getElementById('getAPIKeyBtn').addEventListener('click', getApiKey);

function getApiKey() {
  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?requestKey')
  .then((response) => response.json())
  .then((data) => {
    apiStorage.setItem('id', data.key);
    apiKey = data.key;
    console.log(data.key);
  })
}

function getBooks(){
  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key='+apiKey)
  .then((response) => response.json())
  .then((data) => {
    if(data.status != 'success'){
      console.log('Operation failed, click again on "Get Books"')
      return;
    }
    else {
      console.log('Operation succeeded')
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

let addBookCounter = 0;
function addBook() {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key='+apiKey+'&title='+title+'&author='+author+'')
  .then((response) => response.json())
  .then((data) => {
    if(data.status !== 'success'){
      if(addBookCounter < 10){
        console.log('Operation failed, retrying')
        addBookCounter++;
        addBook();
      }
    }
    else {
      console.log('Successfully added book after ' + addBookCounter + ' fails')
      addBookCounter = 0;
      return;
    }
  })
}

let deleteBookCounter = 0;
function deleteBook(id) {
  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key='+apiKey+'&id='+id+'')
  .then((response) => response.json())
  .then((data) => {
    if(data.status !== 'success'){
      if(deleteBookCounter < 10){
        console.log('Operation failed, retrying')
        deleteBookCounter++;
        deleteBook(id);
      }
    }
    else {
      console.log('Successfully deleted book after ' + deleteBookCounter+ ' fails')
      deleteBookCounter = 0;
      return;
    }
  })
}

let updateBookCounter = 0;
function updateBook(id) {
  let title = document.getElementById('title'+id).value;
  let author = document.getElementById('author'+id).value;
  let successful = false;

  console.log(title);
  console.log(author);

  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key='+apiKey+'&id='+id+'&title='+title+'&author='+author)
  .then((response) => response.json())
  .then((data) => {
    if(data.status !== 'success') {
      if(updateBookCounter < 10) {
        console.log('Operation failed, click again on "Update"')
        updateBookCounter++;
        updateBook(id);
      }
    }
    else {
      console.log('Successfully updated book after ' + updateBookCounter + ' tries')
      return;
    }
  })
}
