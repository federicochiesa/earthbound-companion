function showInfoModal(item) {
    document.getElementById("infoModalTitle").textContent = "More info: " + item;
    document.getElementById("infoModalBody").textContent = "This is a test info modal for " + item;
    new bootstrap.Modal(document.getElementById('infoModal')).show();
}

function showMapModal(item) {
    document.getElementById("mapModalTitle").textContent = "Map: " + item;
    document.getElementById("mapModalBody").textContent = "This is a test map modal for " + item;
    new bootstrap.Modal(document.getElementById('mapModal')).show();
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
                                            </tr>\
                                        </tbody>\
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
                                                </tr>\
                                            </tbody>\
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

async function searchOnSite(data){
    let label = document.getElementById("searchLabel").value;
    
    pages = ["items", "enemies", "shops"]
    
    for(let j = 0; j < pages.length; j++){
        d = data[j]
        for (let i = 0; i < Object.keys(d).length; i++) {
            var elements = d[Object.keys(d)[i]];
            for(let k = 0; k < elements.length; k++){
                console.log(nameToImage(elements[k].name.toLowerCase()))
                if(nameToImage(elements[k].name.toLowerCase()) == nameToImage(label.toLowerCase()))
                    window.location.href = "../"+ pages[j] +"/?item="+ nameToImage(label.toLowerCase());
            }
        }
    }
}