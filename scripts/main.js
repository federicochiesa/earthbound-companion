function showSurveyToast() {
  if (getCookie("survey") == "") {
    setTimeout(function () {
      const myToast = new bootstrap.Toast(document.getElementById("surveyToast"), {"autohide": false});
      myToast.show();
    }, 2000);
  }
}

function setSurveyCookie() {
  document.cookie = "survey=no; expires=2038-01-19, 03:14:08 UTC; path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
} 

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function nameToImage(name) {
  return name.replace(/[ "()'\/.,-]/g, "");
}

async function getData(type) {
  let data = await fetch('../../data/' + type + '.json');
  data = data.json();
  return data;
}

async function searchOnSite(data){
  let label = document.getElementById("searchLabel").value;
  
  pages = ["items", "enemies", "shops"]
  
  for(let j = 0; j < pages.length; j++){
      d = data[j]
      for (let i = 0; i < Object.keys(d).length; i++) {
          var elements = d[Object.keys(d)[i]];
          for(let k = 0; k < elements.length; k++){
              console.log(nameToImage(elements[k].name.toLowerCase()))
              if(nameToImage(elements[k].name.toLowerCase()).search(nameToImage(label.toLowerCase())) > -1){
                  window.location.href = "/wiki/"+ pages[j] +"/?item="+ nameToImage(elements[k].name.toLowerCase());
                  break;
              }
          }
      }
  }
}
