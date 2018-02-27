var request = new XMLHttpRequest();

request.open('GET', 'https://www.forverkliga.se/JavaScript/api/crud.php?key=Xczmv', true);

var myFunc = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    data.forEach(book => {
      console.log(book.title);
    });
  }  else {
    console.log('error');
  }
}

request.send();
