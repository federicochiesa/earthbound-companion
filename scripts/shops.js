async function findPrice(object) {
    let data = await getData("items");
    for (let i = 0; i < Object.keys(data).length; i++) {
        var elements = data[Object.keys(data)[i]];
        for (const element of elements) {
            if (object.toUpperCase() == element.name.toUpperCase()) {
                return element.data["Price"];
            }
        }
    }
    return "";
}

async function showInfoModal(item, data) {
    document.getElementById("infoModalTitle").textContent = "More info: " + item;
    tableString = "<table class=\"table table-dark table-striped\">\
                    <tbody>";
    objects = [];
    obj = "";
    j = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i] != ",") {
            obj += data[i];
            if (i + 1 == data.length) {
                objects[j] = obj;
                j++;
                obj = "";
            }
        }
        else {
            objects[j] = obj;
            obj = "";
            j++;
        }
    }
    prices = [];
    for (let i = 0; i < objects.length; i++)
        prices[i] = await findPrice(objects[i]);
    for (let i = 0; i < objects.length; i++) {
        tableString += "<tr>\
                                <th scope=\"row\">\
                                    <a href=\"../items/?item="+ nameToImage(objects[i].toLowerCase()) + "\" color: inherit\" class=\"itemLink\">" + objects[i] + "</a>\
                                </th>\
                                <td>"+ prices[i] + "</td>\
                            </tr>"
    }
    tableString += "    </tbody>\
                    </table>";
    document.getElementById("infoModalBody").innerHTML = tableString;
    new bootstrap.Modal(document.getElementById('infoModal')).show();
}

async function showMapModal(item) {
    document.getElementById("mapModalTitle").textContent = "Location for: " + item;
    document.getElementById("mapModalBody").innerHTML = await getItemLocation(item);
    new bootstrap.Modal(document.getElementById('mapModal')).show();
}

async function getItemLocation(item) {
    let data = await getData("shops");
    let datai = await getData("items");
    let datae = await getData("enemies");
    let datam = await getData("maps");

    for (let i = 0; i < Object.keys(data).length; i++) {
        let elements = data[Object.keys(data)[i]];
        for (const element of elements) {
            if (element.name == item) {
                var locs = element["Location"].split(", ");
                let returnString = "<table class=\"table table-dark table-striped\">\
                <tbody>\ ";

                let enemies = datae[Object.keys(datae)[0]];
                let bosses = datae[Object.keys(datae)[1]];
                
                let specialEnemies = ["Arachnid!!!", "Bionic Kraken", "Final Starman", "Ghost of Starman", "Great Crested Booka", "Cute Li'l UFO",
                "Hyper Spinning Robo", "Major Psychic Psycho", "Manly Fish's Brother", "Mighty Bear Seven", "Starman Super", "Tough Mobile Sprout",
                "Wild 'N Wooly Shambler", "Frankystein Mark II", "Giygas Part III (unstable defenses)", "Starman Deluxe", "Starman Junior"]
                
                let foundSE = false

                for(let j = 0; j < locs.length; j++){
                    l = locs[j]
                    for(const se of specialEnemies){
                        if (locs[j].search(se) > -1) {
                            foundSE = true;
                            l = l.replace(se, "<a href=\"../enemies/?item="+ nameToImage(se.toLowerCase()) + "\" color: inherit\" class=\"itemLink\">"+ se + "</a>");
                        }
                    }
                    if(!foundSE){
                        for (const e of enemies) {
                            if (locs[j].search(e.name) > -1) {
                                l = l.replace(e.name, "<a href=\"../enemies/?item="+ nameToImage(e.name.toLowerCase()) + "\" color: inherit\" class=\"itemLink\">"+ e.name + "</a>");
                            }
                        }
                        for (const e of bosses) {
                            if (locs[j].search(e.name) > -1) {
                                l = l.replace(e.name, "<a href=\"../enemies/?item="+ nameToImage(e.name.toLowerCase()) + "\" color: inherit\" class=\"itemLink\">"+ e.name + "</a>");
                            }
                        }
                    }
                    for (let x = 0; x < Object.keys(datai).length; x++) {
                        let items = datai[Object.keys(datai)[x]];
                        for (const k of items) {
                            if (locs[j].search(k.name) > -1) {
                                l = l.replace(k.name, "<a href=\"../items/?item="+ nameToImage(k.name.toLowerCase()) + "\" color: inherit\" class=\"itemLink\">"+ k.name + "</a>");
                            }
                        }
                    }
                    for (const map of Object.keys(datam)){
                        if(locs[j].search(capitalizeFirstLetters(map)) > -1){
                            l = l.replace(capitalizeFirstLetters(map), "<a href=\"../maps/?map="+ nameToImage(map.toLowerCase()) + "\" color: inherit\" class=\"itemLink\">"+ capitalizeFirstLetters(map) + "</a>");
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

window.onload = async function () {
    showSurveyToast();
    let data = await getData("shops");
    let list = document.getElementById("dataList");
    for (let i = 0; i < Object.keys(data).length; i++) {
        let title = document.createElement("div");
        title.innerHTML = "<div class=\"row\"><div class=\"col\"><h1 class=\"text-white\">" + capitalizeFirstLetter(Object.keys(data)[i]) + "</h1></div></div>";
        var elements = data[Object.keys(data)[i]];
        list.appendChild(title);
        for (let j = 0; j < elements.length; j = j + 2) {
            let newEntry = document.createElement("div");
            if (typeof (elements[j].data["Comments"]) == "undefined") var comments = "";
            else var comments = elements[j].data["Comments"];
            newEntry.innerHTML = "<div class=\"row mb-3\"><div class=\"col me-2\">\
                                    <div class=\"row mb-5 cg\" id=\"" + nameToImage(elements[j].name.toLowerCase()) + "\">\
                                        <div class=\"col-lg-4\">\
                                            <img src=\"../../assets/buildings/" + nameToImage(elements[j].name) + ".png\" class=\"shop-image\">\
                                        </div>\
                                        <div class=\"col-lg-5\">\
                                            <h3 class=\"text-white\">" + elements[j].name + "</h3>\
                                            <span class=\"text-white description\">" + comments + "</span>\
                                        </div>\
                                        <div class=\"col-lg-2 icons\">\
                                        <div class=\"ok centering\">\
                                            <a href=\"#/\" id=\"infoModalButton\" onclick=\"showInfoModal(&quot;" + elements[j].name + "&quot;,&quot;" + elements[j].data + "&quot)\">\
                                                <img src=\"../../assets/sprites/info.png\" class=\"img-button\" \>\
                                            </a>\
                                        </div>\
                                        <div class=\"ok centering\">\
                                            <a href=\"#/\" id=\"mapModalButton\" onclick=\"showMapModal(&quot;" + elements[j].name + "&quot;)\">\
                                                <img src=\"../../assets/sprites/Mappost.png\" class=\"img-button\" \>\
                                            </a>\
                                        </div>\
                                        </div>\
                                     </div>\
                                    </div>\
                                    <div class=\"col ms-2\">\
                                    <div class=\"row mb-5 cg\" id=\"" + nameToImage(elements[j+1].name.toLowerCase()) + "\">\
                                        <div class=\"col-lg-4\">\
                                            <img src=\"../../assets/buildings/" + nameToImage(elements[j + 1].name) + ".png\" class=\"shop-image\">\
                                        </div>\
                                        <div class=\"col-lg-5\">\
                                            <h3 class=\"text-white\">" + elements[j + 1].name + "</h3>\
                                            <span class=\"text-white description\">" + comments + "</span>\
                                        </div>\
                                        <div class=\"col-lg-2 icons\">\
                                        <div class=\"ok centering\">\
                                            <a href=\"#/\" id=\"infoModalButton\" onclick=\"showInfoModal(&quot;" + elements[j + 1].name + "&quot;,&quot;" + elements[j + 1].data + "&quot)\">\
                                                <img src=\"../../assets/sprites/info.png\" class=\"img-button\" \>\
                                            </a>\
                                        </div>\
                                        <div class=\"ok centering\">\
                                            <a href=\"#/\" id=\"mapModalButton\" onclick=\"showMapModal(&quot;" + elements[j + 1].name + "&quot;)\">\
                                                <img src=\"../../assets/sprites/Mappost.png\" class=\"img-button\" \>\
                                            </a>\
                                        </div>\
                                        </div>\
                                     </div>\
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
            window.scrollTo({ top: y});
        }
    }, 100);

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


