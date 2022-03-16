let dropdowns = document.querySelectorAll('.dropdown-toggle')
dropdowns.forEach((dd)=>{
    dd.addEventListener('click', function (e) {
        var el = this.nextElementSibling
        el.style.display = el.style.display==='block'?'none':'block'
    })
})

function showModal(body){
    document.getElementById("infoModalBody").textContent = body;
    new bootstrap.Modal(document.getElementById('infoModal')).show();
}

window.onload = function(){
    document.getElementById("infoModalButton").onclick = function(){showModal("Posso");}
}
