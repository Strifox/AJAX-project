var content, txt = "";

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
