window.onload = function(){
    setTimeout(function(){
        const myToast = new bootstrap.Toast(document.getElementById("surveyToast"));
        myToast.show();
    }, 2000);
}