window.onload = async function () {
    showSurveyToast();
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