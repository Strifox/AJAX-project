
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

  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key='+apiKey+'&title='+title+'&author='+author+'')
  .then((response) => response.json())
  .then((data) => {
    if(data.status !== 'success') {
      console.log('Operation failed, click again on "Add"')
    }
    else {
      console.log('Successfully added book')
    }
  })
}

function deleteBook(id) {
  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key='+apiKey+'&id='+id+'')
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

  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key='+apiKey+'&id='+id+'&title='+title+'&author='+author)
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
