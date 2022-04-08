function showInfoModal(item) {
    document.getElementById("infoModalTitle").textContent = "More info: " + item;
    document.getElementById("infoModalBody").textContent = "This is a test info modal for " + item;
    new bootstrap.Modal(document.getElementById('infoModal')).show();
}

async function showMapModal(item) {
    document.getElementById("mapModalTitle").textContent = "Location for: " + item;
    document.getElementById("mapModalBody").innerHTML = await getItemLocation(item);
    new bootstrap.Modal(document.getElementById('mapModal')).show();
}

async function getItemLocation(item) {
    let data = await getData("items");
    let datae = await getData("enemies");

    for (let i = 0; i < Object.keys(data).length; i++) {
        let elements = data[Object.keys(data)[i]];
        for (const element of elements) {
            if (element.name == item) {
                var locs = element.data["Location"].split(", ");
                let returnString = "<table class=\"table table-dark table-striped\">\
                <tbody>\ ";

                let enemies = datae[Object.keys(datae)[0]];
                
                for(let j = 0; j < locs.length; j++){
                    l = locs[j]
                    for (const e of enemies) {
                        if (locs[j].search(e.name) > -1) {
                            l = locs[j].replace(e.name, "<a href=\"/wiki/enemies/?item="+ nameToImage(e.name.toLowerCase()) + "\" color: inherit\" class=\"itemLink\">"+ e.name + "</a>");
                        }
                    }
                    for (let x = 0; x < Object.keys(data).length; x++) {
                        let items = data[Object.keys(data)[x]];
                        for (const k of items) {
                            if (locs[j].search(k.name) > -1) {
                                l = locs[j].replace(k.name, "<a href=\"/wiki/items/?item="+ nameToImage(k.name.toLowerCase()) + "\" color: inherit\" class=\"itemLink\">"+ k.name + "</a>");
                            }
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
    let data = await getData("items");
    let list = document.getElementById("dataList");
    for (let i = 0; i < Object.keys(data).length; i++) {
        let title = document.createElement("div");
        title.innerHTML = "<div class=\"row\"><div class=\"col\"><h1 class=\"text-white\">" + capitalizeFirstLetter(Object.keys(data)[i]) + "</h1></div></div>";
        var elements = data[Object.keys(data)[i]];
        list.appendChild(title);
        for (const element of elements) {
            if (typeof (element.data["Description"]) == "undefined") {
                ness = "Y";
                paula = "Y";
                jeff = "Y";
                poo = "Y";
            } else {
                if (element.data["Description"].search(/ness/i) > -1) var ness = "Y";
                else if (element.name.search(/bat/i) > -1 && element.name.search(/combat/i) < 0) var ness = "Y";
                else var ness = "N";
                if (element.data["Description"].search(/paula/i) > -1) var paula = "Y";
                else if (element.name.search(/pan/i) > -1) var ness = "Y";
                else var paula = "N";
                if (element.data["Description"].search(/jeff/i) > -1) var jeff = "Y";
                else var jeff = "N";
                if (element.data["Description"].search(/poo/i) > -1) var poo = "Y";
                else var poo = "N";
                if (ness == "N" && paula == "N" && poo == "N" && jeff == "N") {
                    ness = "Y";
                    paula = "Y";
                    jeff = "Y";
                    poo = "Y";
                }
            }
            let newEntry = document.createElement("div");
            if (typeof (element.data["Description"]) == "undefined") var description = "";
            else var description = element.data["Description"];
            tableString = "";
            switch (Object.keys(data)[i]) {
                case "weapons":
                    tableString = "<table class=\"table table-dark table-striped\">\
                                        <tbody>\
                                            <tr>\
                                                <th scope=\"row\">Price</th>\
                                                <td>" + element.data["Price"] + "</td>\
                                            </tr>\
                                            <tr>\
                                                <th scope=\"row\">Error Rate</th>\
                                                <td>" + element.data["Error rate"] + "</td>\
                                            </tr>\
                                            <tr>\
                                                <th scope=\"row\">Offense Up</th>\
                                                <td>" + element.data["Offense up"] + "</td>\
                                            </tr>\ ";

                    if(typeof(element.data["Guts up"]) != "undefined")
                        tableString += "<tr>\
                                        <th scope=\"row\">Guts Up</th>\
                                         <td>" + element.data["Guts up"] + "</td>\
                                        </tr>\ ";
                    tableString += "</tbody>\
                                    </table>\"";

                    break;
                case "protection":
                    tableString = "<table class=\"table table-dark table-striped\">\
                                            <tbody>\
                                                <tr>\
                                                    <th scope=\"row\">Price</th>\
                                                    <td>" + element.data["Price"] + "</td>\
                                                </tr>\
                                                <tr>\
                                                    <th scope=\"row\">Defense Up</th>\
                                                    <td>" + element.data["Defense up"] + "</td>\
                                                </tr>\ ";

                    if(typeof(element.data["Speed up"]) != "undefined")
                    tableString += "<tr>\
                                    <th scope=\"row\">Speed Up</th>\
                                        <td>" + element.data["Speed up"] + "</td>\
                                    </tr>\ ";
                    if(typeof(element.data["Luck up"]) != "undefined")
                    tableString += "<tr>\
                                    <th scope=\"row\">Luck Up</th>\
                                        <td>" + element.data["Luck up"] + "</td>\
                                    </tr>\ ";
                    tableString += "</tbody>\
                                </table>\"";
                    break;
                case "goods":
                    tableString = "<table class=\"table table-dark table-striped\">\
                                            <tbody>\
                                                <tr>\
                                                    <th scope=\"row\">Price</th>\
                                                    <td>" + element.data["Price"] + "</td>\
                                                </tr>\
                                            </tbody>\
                                        </table>\"";
                    break;
                case "food":
                    hpup = "0";
                    ppup = "0";
                    if (typeof (element.data["Hit points up"]) != "undefined") hpup = element.data["Hit points up"];
                    if (typeof (element.data["Psychic points up"]) != "undefined") ppup = element.data["Psychic points up"];
                    tableString = "<table class=\"table table-dark table-striped\">\
                                            <tbody>\
                                                <tr>\
                                                    <th scope=\"row\">Price</th>\
                                                    <td>" + element.data["Price"] + "</td>\
                                                </tr>\
                                                <tr>\
                                                    <th scope=\"row\">HP up</th>\
                                                    <td>" + hpup + "</td>\
                                                </tr>\
                                                <tr>\
                                                    <th scope=\"row\">PP up</th>\
                                                    <td>" + ppup + "</td>\
                                                </tr>\
                                            </tbody>\
                                        </table>\"";
                    break;
                case "condiments":
                    tableString = "<table class=\"table table-dark table-striped\">\
                                            <tbody>\
                                                <tr>\
                                                    <th scope=\"row\">Price</th>\
                                                    <td>" + element.data["Price"] + "</td>\
                                                </tr>\
                                            </tbody>\
                                        </table>\"";
                    break;
                case "medicine":
                    tableString = "<table class=\"table table-dark table-striped\">\
                                            <tbody>\
                                                <tr>\
                                                    <th scope=\"row\">Price</th>\
                                                    <td>" + element.data["Price"] + "</td>\
                                                </tr>\
                                            </tbody>\
                                        </table>\"";
                    break;
            }
            newEntry.innerHTML = "<div class=\"row mb-5\" id=\"" + nameToImage(element.name.toLowerCase()) + "\">\
                                    <div class=\"col-lg-6\">\
                                        <h3 class=\"text-white\">" + element.name + "</h3>\
                                        <span class=\"text-white description\">" + description + "</span>\
                                    </div>\
                                    <div class=\"col-lg-3\">\
                                    <img src=\"../../assets/sprites/ness.png\" class=\"img-hero"+ ness + "\" \>\
                                    <img src=\"../../assets/sprites/paula.png\" class=\"img-hero"+ paula + "\" \>\
                                    <img src=\"../../assets/sprites/jeff.png\" class=\"img-hero"+ jeff + "\" \>\
                                    <img src=\"../../assets/sprites/poo.png\" class=\"img-hero"+ poo + "\"\>\
                                    </div>\
                                    <div class=\"col-lg-2\">\
                                       " + tableString + "\
                                    </div>\
                                    <div class=\"col-lg-1 centering\">\
                                        <div class=\"col mini\">\
                                        <a href=\"#/\" id=\"mapModalButton\" onclick=\"showMapModal(&quot;" + element.name + "&quot;)\">\
                                            <img src=\"../../assets/sprites/Mappost.png\" class=\"img-button\" \>\
                                        </a>\
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
            console.log(element.getBoundingClientRect().top)
            window.scrollTo({ top: y});
        }
    }, 50);

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

