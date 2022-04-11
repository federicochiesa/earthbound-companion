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

function capitalizeFirstLetters(string) {
  let words = string.split(" ");
  finalString = ""
  for(w of words)
    finalString += (capitalizeFirstLetter(w) + " ");
  finS = finalString.slice(0,-1);
  return finS;
}

function nameToImage(name) {
  return name.replace(/[ "()'\/.,-]/g, "");
}

async function getData(type) {
  let data = await fetch('../../data/' + type + '.json');
  data = data.json();
  return data;
}

async function searchOnSite2(data){
  let label = document.getElementById("searchLabel").value;
  let searchButton = document.getElementById("searchButton");
  var popover = new bootstrap.Popover(searchButton, {content: "Nothing found. Did you type that right?"});
  
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
  popover.show();
  setTimeout(function(){popover.hide()}, 2000);
}

async function searchOnSite(data){
  let label = document.getElementById("searchLabel").value;
  let searchButton = document.getElementById("searchButton");
  var popover = new bootstrap.Popover(searchButton, {content: "Nothing found. Did you type that right?"});
  
  pages = ["items", "enemies", "shops", "maps"]
  
  for(let j = 0; j < pages.length; j++){
      d = data[j]
      if(j < 3){
        for (let i = 0; i < Object.keys(d).length; i++) {
            var elements = d[Object.keys(d)[i]];
            for(let k = 0; k < elements.length; k++){
                console.log(nameToImage(elements[k].name.toLowerCase()))
                if(nameToImage(elements[k].name.toLowerCase()) == nameToImage(label.toLowerCase())){
                    window.location.href = "/wiki/"+ pages[j] +"/?item="+ nameToImage(elements[k].name.toLowerCase());
                    break;
                }
            }
        }
      }else{
        for(const map of Object.keys(d)){
          if(nameToImage(map.toLowerCase()) == nameToImage(label.toLowerCase())){
            window.location.href = "/wiki/"+ pages[j] +"/?map="+ nameToImage(map.toLowerCase());
            break;
          }
        }
      }
  }

  popover.show();
  setTimeout(function(){popover.hide()}, 2000);
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.innerText;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
document.addEventListener("click", function (e) {
  closeAllLists(e.target);
});
} 

