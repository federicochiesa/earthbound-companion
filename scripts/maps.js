window.onload = function () {
    showSurveyToast();
    updateMap("onett");
}

function updateMap(id) {
    let arrows = document.querySelectorAll(".arrow");
    for (let i = 0; i < arrows.length; i++) {
        arrows[i].setAttribute("style", "display: none;");
    }
    document.getElementById(id + "Arrow").style.display = "inline";
    document.getElementById("mapiFrame").src = "../../mapframe/dist/?region=" + id;

    pages = ["items", "enemies", "shops"]
    data = []
    
    setTimeout(async function(){
        for(let j = 0; j < pages.length; j++)
            data[j] = await getData(pages[j]);
    }, 50);
    
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', (_) =>{
        searchOnSite(data);
    });
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
                if(nameToImage(elements[k].name.toLowerCase()) == nameToImage(label.toLowerCase()))
                    window.location.href = "../"+ pages[j] +"/?item="+ nameToImage(label.toLowerCase());
            }
        }
    }
}