window.onload = async function () {
    showSurveyToast();
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
                    for(let k = 0; k < elements.length; k++){
                        names.push(elements[k].name)
                    }
                }
            }else{
                for (const map of Object.keys(d))
                    names.push(capitalizeFirstLetters(map));
            }
        }
        
    }, 100);

    autocomplete(document.getElementById("searchLabel"), names)

    console.log(names);
    
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', (_) =>{
        searchOnSite(data);
    });  
}


