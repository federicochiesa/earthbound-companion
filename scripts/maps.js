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

function checkForPopover(){

}