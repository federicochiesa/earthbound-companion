window.onload = function(){
    updateMap("onett")
}

function updateMap(id){
    let arrows = document.querySelectorAll(".arrow");
    for(let i = 0; i < arrows.length; i++){
        arrows[i].setAttribute("style", "display: none;");
    }
    document.getElementById(id + "Arrow").style.display = "inline";
    document.getElementById("mapiFrame").src = "../../mapframe/dist/?region="+id;
}