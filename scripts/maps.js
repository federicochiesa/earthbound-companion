window.onload = function(){
    updateMap("onett")
}

function updateMap(id){
    let arrows = document.querySelectorAll(".arrow");
    for(let i = 0; i < arrows.length; arrows++){
        arrows[i].setAttribute("style", "display: none;");
    }
    document.getElementById(id).style.display = "inline";
    document.getElementById("mapiFrame").src = "../../mapframe/dist/?region="+id;
}