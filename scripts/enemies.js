async function showInfoModal(item) {
    document.getElementById("infoModalTitle").textContent = "More info: " + item;
    document.getElementById("infoModalBody").innerHTML = await getEnemyInfo(item);
    new bootstrap.Modal(document.getElementById('infoModal')).show();
}

function showMapModal(item) {
    document.getElementById("mapModalTitle").textContent = "Map: " + item;
    document.getElementById("mapModalBody").textContent = "This is a test map modal for " + item;
    new bootstrap.Modal(document.getElementById('mapModal')).show();
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
                    </tr>\
                    <tr>\
                        <th scope=\"row\">Location</th>\
                        <td>" + element.data["Location"] + "</td>\
                    </tr>";
                if(typeof(element.data["Guts"]) != "undefined")
                    returnString += "<tr>\
                    <th scope=\"row\">Guts</th>\
                    <td>" + element.data["Guts"] + "</td>\
                        </tr>"
                if(typeof(element.data["Item"]) != "undefined")
                    returnString += "<tr>\
                    <th scope=\"row\">Item</th>\
                    <td><a href=\"/wiki/items/?item="+ nameToImage(element.data["Item"].toLowerCase()) + "\" style=\"text-decoration: none; color: inherit\" class=\"itemLink\">"+ element.data["Item"] + "</a></td>\
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
            newEntry.innerHTML = "<div class=\"row mb-4\">\
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
}