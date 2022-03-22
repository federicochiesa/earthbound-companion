let dropdowns = document.querySelectorAll('.dropdown-toggle')
dropdowns.forEach((dd)=>{
    dd.addEventListener('click', function (_) {
        var el = this.nextElementSibling
        el.style.display = el.style.display==='block'?'none':'block'
    })
})

function showInfoModal(item, dati){
    document.getElementById("infoModalTitle").textContent = "More info: " + item;
    tableString = "<table class=\"table table-dark table-striped\">\
                     <tbody>\ ";
    obj = "";
    for(let i = 0; i < dati.length; i++){
        if(dati[i] != ","){
                obj += dati[i];
                if(i+1 == dati.length){
                    tableString += "<tr>\
                                <th scope=\"row\">"+ obj +"</th>\
                                <td> 10$ </td>\
                            </tr>\ "
                }
            }
        else{
            tableString += "<tr>\
                                <th scope=\"row\">"+ obj +"</th>\
                                <td> 10$ </td>\
                            </tr>\ "
            obj = ""
        }
    }
    tableString += "</tbody>\
                    </table>"

    document.getElementById("infoModalBody").innerHTML = tableString;
    new bootstrap.Modal(document.getElementById('infoModal')).show();
}

function showMapModal(item){
    document.getElementById("mapModalTitle").textContent = "Map: " + item;
    document.getElementById("mapModalBody").textContent = "This is a test map modal for " + item;
    new bootstrap.Modal(document.getElementById('mapModal')).show();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}  

window.onload = async function(){
    let data = await getShopsData();
    let list = document.getElementById("dataList");
    for (let i = 0; i < Object.keys(data).length; i++){
        let title = document.createElement("div");
        title.innerHTML = "<div class=\"row\"><div class=\"col\"><h1 class=\"text-white\">" + capitalizeFirstLetter(Object.keys(data)[i]) +"</h1></div></div>";
        var elements = data[Object.keys(data)[i]];
        list.appendChild(title);
        for(let j = 0; j < elements.length; j++){
            let newEntry = document.createElement("div");
            if (typeof(elements[j].data["Comments"]) == "undefined") var comments = "";
            else var comments = elements[j].data["Comments"];
            newEntry.innerHTML = "<div class=\"row mb-3\"><div class=\"col me-2\">\
                                    <div class=\"row mb-5 cg\" >\
                                        <div class=\"col-lg-3\">\
                                            <img src=\"/assets/" + elements[j].name + ".png\" class=\"shop-image\">\
                                        </div>\
                                        <div class=\"col-lg-6\">\
                                            <h3 class=\"text-white\">" + elements[j].name + "</h3>\
                                            <span class=\"text-white description\">" + comments + "</span>\
                                        </div>\
                                        <div class=\"col-lg-2 icons\">\
                                        <div class=\"ok caput\">\
                                            <a href=\"#/\" id=\"infoModalButton\" onclick=\"showInfoModal(&quot;" + elements[j].name + "&quot;,&quot;" + elements[j].data + "&quot)\">\
                                                <img src=\"../../assets/sprites/info.png\" class=\"img-button\" \>\
                                            </a>\
                                        </div>\
                                        <div class=\"ok caput\">\
                                            <a href=\"#/\" id=\"mapModalButton\" onclick=\"showMapModal(&quot;" + elements[j].name + "&quot;)\">\
                                                <img src=\"../../assets/sprites/Mappost.png\" class=\"img-button\" \>\
                                            </a>\
                                        </div>\
                                        </div>\
                                     </div>\
                                    </div>\
                                    <div class=\"col ms-2\">\
                                    <div class=\"row mb-5 cg\">\
                                        <div class=\"col-lg-3\">\
                                            <img src=\"/assets/" + elements[j+1].name + ".png\" class=\"shop-image\">\
                                        </div>\
                                        <div class=\"col-lg-6\">\
                                            <h3 class=\"text-white\">" + elements[j+1].name + "</h3>\
                                            <span class=\"text-white description\">" + comments + "</span>\
                                        </div>\
                                        <div class=\"col-lg-2 icons\">\
                                        <div class=\"ok caput\">\
                                            <a href=\"#/\" id=\"infoModalButton\" onclick=\"showInfoModal(&quot;" + elements[j+1].name + "&quot;,&quot;" + elements[j+1].data + "&quot)\">\
                                                <img src=\"../../assets/sprites/info.png\" class=\"img-button\" \>\
                                            </a>\
                                        </div>\
                                        <div class=\"ok caput\">\
                                            <a href=\"#/\" id=\"mapModalButton\" onclick=\"showMapModal(&quot;" + elements[j+1].name + "&quot;)\">\
                                                <img src=\"../../assets/sprites/Mappost.png\" class=\"img-button\" \>\
                                            </a>\
                                        </div>\
                                        </div>\
                                     </div>\
                                    </div>\
                                    </div>";
            j++;
            list.appendChild(newEntry);

        }
    }
}

async function getShopsData(){
    let enemiesData = await fetch('../../data/shops.json');
    enemiesData = enemiesData.json();
    return enemiesData;
}
