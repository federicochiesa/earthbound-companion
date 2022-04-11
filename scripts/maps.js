window.onload = function () {
    showSurveyToast();
    updateMap("onett");
    //Go to selected map in query URL(if any)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const mapToShow = urlParams.get("map");
    if(mapToShow != null)
        updateMap(mapToShow);
    //Add click event listener on popovers
    const iframe = document.getElementById("mapiFrame");
}

function updateMap(id) {
    let arrows = document.querySelectorAll(".arrow");
    for (let i = 0; i < arrows.length; i++) {
        arrows[i].setAttribute("style", "display: none;");
    }
    document.getElementById(id + "Arrow").style.display = "inline";
    document.getElementById("mapiFrame").src = "../../mapframe/dist/?region=" + id;

    pages = ["items", "enemies", "shops", "maps"]
    data = []
    names = []
    
    setTimeout(async function(){
        for(let j = 0; j < pages.length; j++){
            data[j] = await getData(pages[j]);
            d = data[j]
            if(j < 3){
                for (let i = 0; i < Object.keys(d).length; i++) {
                    var elements = d[Object.keys(d)[i]];
                    for(let k = 0; k < elements.length; k++)
                        names.push(elements[k].name)
                }
            }
            else{
                for (const map of Object.keys(d))
                    names.push(capitalizeFirstLetters(map));
            }
        }
    }, 100);

    autocomplete(document.getElementById("searchLabel"), names)
    
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', (_) =>{
        searchOnSite(data);
    });
}

function checkForPopover(){

}