async function showInfoModal(item) {
    document.getElementById("infoModalTitle").textContent = "More info: " + item;
    document.getElementById("infoModalBody").innerHTML = await getEnemyInfo(item);
    new bootstrap.Modal(document.getElementById('infoModal')).show();
}

async function showMapModal(item) {
    document.getElementById("mapModalTitle").textContent = "Location for: " + item;
    document.getElementById("mapModalBody").innerHTML = await getItemLocation(item);
    new bootstrap.Modal(document.getElementById('mapModal')).show();
}

async function getItemLocation(item) {
    let data = await getData("enemies");
    let datam = await getData("maps");
    let datae = await getData("items")
    
    for (let i = 0; i < Object.keys(data).length; i++) {
        let elements = data[Object.keys(data)[i]];
        for (const element of elements) {
            if (element.name == item) {
                var locs = element.data["Location"].split(", ");
                let returnString = "<table class=\"table table-dark table-striped\">\
                <tbody>\ ";

                let enemies = data[Object.keys(data)[0]];
                let bosses = data[Object.keys(data)[1]];
                
                for(let j = 0; j < locs.length; j++){
                    l = locs[j]
                    for (const e of enemies) {
                        if (locs[j].search(e.name) > -1) {
                            l = l.replace(e.name, "<a href=\"/wiki/enemies/?item="+ nameToImage(e.name.toLowerCase()) + "\" color: inherit\" class=\"itemLink\">"+ e.name + "</a>");
                        }
                    }
                    for (const e of bosses) {
                        if (locs[j].search(e.name) > -1) {
                            l = l.replace(e.name, "<a href=\"/wiki/enemies/?item="+ nameToImage(e.name.toLowerCase()) + "\" color: inherit\" class=\"itemLink\">"+ e.name + "</a>");
                        }
                    }
                    for (let x = 0; x < Object.keys(datae).length; x++) {
                        let items = datae[Object.keys(datae)[x]];
                        for (const k of items) {
                            if (locs[j].search(k.name) > -1) {
                                l = l.replace(k.name, "<a href=\"/wiki/items/?item="+ nameToImage(k.name.toLowerCase()) + "\" color: inherit\" class=\"itemLink\">"+ k.name + "</a>");
                            }
                        }
                    }
                    for (const map of Object.keys(datam)){
                        if(locs[j].search(capitalizeFirstLetters(map)) > -1){
                            l = l.replace(capitalizeFirstLetters(map), "<a href=\"/wiki/maps/?map="+ nameToImage(map.toLowerCase()) + "\" color: inherit\" class=\"itemLink\">"+ capitalizeFirstLetters(map) + "</a>");
                        }
                    }
                    
                    returnString += " <tr>\
                                        <td>" + l + "</td>\
                                     </tr>\ ";
                }

                returnString += "</tbody>\
                            </table>";
                return returnString;
            }
        }
    }
}

async function getEnemyInfo(enemy) {
    let data = await getData("enemies");
    for (let i = 0; i < Object.keys(data).length; i++) {
        let elements = data[Object.keys(data)[i]];
        for (const element of elements) {
            if (element.name == enemy) {
                let returnString = "<table class=\"table table-dark table-striped\">\
                <tbody>\
                    <tr>\
                        <th scope=\"row\">HP</th>\
                        <td>" + element.data["Hit points"] + "</td>\
                    </tr>\
                    <tr>\
                        <th scope=\"row\">PP</th>\
                        <td>" + element.data["Psychic points"] + "</td>\
                    </tr>\
                    <tr>\
                        <th scope=\"row\">Attack</th>\
                        <td>" + element.data["Offense"] + "</td>\
                    </tr>\
                    <tr>\
                        <th scope=\"row\">Defense</th>\
                        <td>" + element.data["Defense"] + "</td>\
                    </tr>\
                    <tr>\
                        <th scope=\"row\">Speed</th>\
                        <td>" + element.data["Speed"] + "</td>\
                    </tr>\ ";
                if(typeof(element.data["Guts"]) != "undefined")
                    returnString += "<tr>\
                    <th scope=\"row\">Guts</th>\
                    <td>" + element.data["Guts"] + "</td>\
                        </tr>"
                if(typeof(element.data["Drops"]) != "undefined")
                    returnString += "<tr>\
                    <th scope=\"row\">Drops</th>\
                    <td><a href=\"/wiki/items/?item="+ nameToImage(element.data["Drops"].toLowerCase()) + "\" color: inherit\" class=\"itemLink\">"+ element.data["Drops"] + "</a></td>\
                        </tr>"
                if(typeof(element.data["Exp"]) != "undefined")
                    returnString += "<tr>\
                    <th scope=\"row\">Experience</th>\
                    <td>" + element.data["Exp"] + "</td>\
                        </tr>"
                if(typeof(element.data["Money"]) != "undefined")
                    returnString += "<tr>\
                    <th scope=\"row\">Money</th>\
                    <td>" + element.data["Money"] + "</td>\
                    </tr>"

                returnString += "</tbody>\
                            </table>";
                return returnString;
            }
        }
    }
}

window.onload = async function () {
    showSurveyToast();

    let data = await getData("enemies");
    let list = document.getElementById("dataList");
    for (let i = 0; i < Object.keys(data).length; i++) {
        let title = document.createElement("div");
        title.innerHTML = "<div class=\"row\"><div class=\"col\"><h1 class=\"text-white\">" + capitalizeFirstLetter(Object.keys(data)[i]) + "</h1></div></div>";
        var elements = data[Object.keys(data)[i]];
        list.appendChild(title);
        for (const element of elements) {
            let newEntry = document.createElement("div");
            if (typeof (element.data["Comments"]) == "undefined") var comments = "";
            else var comments = element.data["Comments"];
            newEntry.innerHTML = "<div class=\"row mb-4\" id=\"" + nameToImage(element.name.toLowerCase()) + "\">\
                                    <div class=\"col-lg-2\">\
                                        <img src=\"/assets/sprites/" + nameToImage(element.name) + ".png\" class=\"img-item\">\
                                    </div>\
                                    <div class=\"col-lg-7\">\
                                        <h3 class=\"text-white\">" + element.name + "</h3>\
                                        <span class=\"text-white description\">" + comments + "</span>\
                                    </div>\
                                    <div class=\"col-lg-2\">\
                                        <table class=\"table table-dark table-striped\">\
                                            <tbody>\
                                                <tr>\
                                                    <th scope=\"row\">HP</th>\
                                                    <td>" + element.data["Hit points"] + "</td>\
                                                </tr>\
                                                <tr>\
                                                    <th scope=\"row\">PP</th>\
                                                    <td>" + element.data["Psychic points"] + "</td>\
                                                </tr>\
                                                <tr>\
                                                    <th scope=\"row\">Attack</th>\
                                                    <td>" + element.data["Offense"] + "</td>\
                                                </tr>\
                                                <tr>\
                                                    <th scope=\"row\">Defense</th>\
                                                    <td>" + element.data["Defense"] + "</td>\
                                                </tr>\
                                            </tbody>\
                                        </table>\
                                    </div>\
                                    <div class=\"col-lg-1\">\
                                        <a href=\"#/\" id=\"infoModalButton\" onclick=\"showInfoModal(&quot;" + element.name + "&quot;)\">\
                                            <img src=\"../../assets/sprites/info.png\" class=\"img-button\" \>\
                                        </a>\
                                        <a href=\"#/\" id=\"mapModalButton\" onclick=\"showMapModal(&quot;" + element.name + "&quot;)\">\
                                            <img src=\"../../assets/sprites/Mappost.png\" class=\"img-button\" \>\
                                        </a>\
                                    </div>\
                                </div>";
            list.appendChild(newEntry);
        }
    }

    setTimeout(function(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const idToScroll = urlParams.get("item");
        if (idToScroll != null) {
            const element = document.getElementById(idToScroll);
            const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
            console.log(element.getBoundingClientRect().top)
            window.scrollTo({ top: y});
        }
    }, 50);

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
    
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', (_) =>{
        searchOnSite(data);
    });

}

