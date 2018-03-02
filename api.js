
let apiStorage = window.localStorage;
let apiKey = apiStorage.getItem('id');

addEventListener('load', getBooks);

let content = document.getElementById('content');
let getBooksBtn = document.getElementById('getBooksBtn').addEventListener('click', getBooks);
let addBtn = document.getElementById('addBtn').addEventListener('click', function() {
  addBook();
  showAddForm();
});
let requestAPIKeyBtn = document.getElementById('getAPIKeyBtn').addEventListener('click', getApiKey);
let addForm = document.getElementById('addForm');
let showAddFormBtn = document.getElementById('showAddForm').addEventListener('click', showAddForm);

let isAddFormShown = false;

function showAddForm() {
  if(!isAddFormShown) {
    addForm.style.display = "block";
    document.getElementById('errorMessage').innerHTML = "";
    isAddFormShown = true;
  }
  else {
    addForm.style.display = "none";
    document.getElementById('errorMessage').innerHTML = "";
    isAddFormShown = false;
  }
}

function getApiKey() {
  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?requestKey')
  .then((response) => response.json())
  .then((data) => {
    apiStorage.setItem('id', data.key);
    apiKey = data.key;
    console.log(data.key);
  })
}

let getBooksCounter = 0;
function getBooks(){
  fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key='+apiKey)
  .then((response) => response.json())
  .then((data) => {
    if(data.status != 'success'){
      console.log('Operation failed, retrying')
      getBooksCounter++;
      getBooks();
      return;
    }
    else {
      console.log('Successfully loaded all the books after ' + getBooksCounter + ' fail(s)')
      document.getElementById('errorMessage').innerHTML = "Successfully loaded all the books after " + getBooksCounter + " fail(s)";
      getBooksCounter = 0;
    }

    let output = '';
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
      console.log('Successfully added book after ' + addBookCounter + ' fail(s)');
      document.getElementById('errorMessage').innerHTML = "Successfully added book after " + addBookCounter + " fail(s)";
      addBookCounter = 0;
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
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
      console.log('Successfully deleted book after ' + deleteBookCounter+ ' fail(s)')
      document.getElementById('errorMessage').innerHTML = "Successfully deleted book after " + deleteBookCounter+ " fail(s)";
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
      console.log('Successfully updated book after ' + updateBookCounter + ' fail(s)')
      document.getElementById('errorMessage').innerHTML = "Successfully updated book after " + updateBookCounter + " fail(s)";
      return;
    }
  })
}
