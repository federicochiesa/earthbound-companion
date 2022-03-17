let dropdowns = document.querySelectorAll('.dropdown-toggle')
dropdowns.forEach((dd)=>{
    dd.addEventListener('click', function (e) {
        var el = this.nextElementSibling
        el.style.display = el.style.display==='block'?'none':'block'
    })
})

window.onload = function(){
    setTimeout(function(){
        const myToast = new bootstrap.Toast(document.getElementById("surveyToast"));
        myToast.show();
    }, 2000);
}