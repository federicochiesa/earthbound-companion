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

function searchOnSite(){
  let label = document.getElementById("searchForm").submit();
  console.log(label);


}

