window.onload = function(){
    document.getElementById("mapiFrame").src = "../../mapframe/dist/?region=onett"
    var list = document.querySelectorAll(".list-group-item");
    for (var i = 0; i < list.length; ++i) list[i].classList.remove('active');
    document.getElementById("onett").classList.add("active");
}

function updateMap(id){
    var list = document.querySelectorAll(".list-group-item");
    for (var i = 0; i < list.length; ++i) list[i].classList.remove('active');
    document.getElementById(id).classList.add("active");
    document.getElementById("mapiFrame").src = "../../mapframe/dist/?region="+id;
}