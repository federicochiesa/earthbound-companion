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
                                    <a href=\"/wiki/items/?item="+ nameToImage(objects[i].toLowerCase()) + "\" style=\"text-decoration: none; color: inherit\" class=\"itemLink\">" + objects[i] + "</a>\
                                </th>\
                                <td>"+ prices[i] + "</td>\
                            </tr>"
    }
    tableString += "    </tbody>\
                    </table>";
    document.getElementById("infoModalBody").innerHTML = tableString;
    new bootstrap.Modal(document.getElementById('infoModal')).show();
}

function showMapModal(item) {
    document.getElementById("mapModalTitle").textContent = "Map: " + item;
    document.getElementById("mapModalBody").textContent = "This is a test map modal for " + item;
    new bootstrap.Modal(document.getElementById('mapModal')).show();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function nameToImage(name) {
    return name.replace(/[ "()'\/.,-]/g, "");
}

window.onload = async function () {
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
                                    <div class=\"row mb-5 cg\" >\
                                        <div class=\"col-lg-4\">\
                                            <img src=\"/assets/buildings/" + nameToImage(elements[j].name) + ".png\" class=\"shop-image\">\
                                        </div>\
                                        <div class=\"col-lg-5\">\
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
                                        <div class=\"col-lg-4\">\
                                            <img src=\"/assets/buildings/" + nameToImage(elements[j + 1].name) + ".png\" class=\"shop-image\">\
                                        </div>\
                                        <div class=\"col-lg-5\">\
                                            <h3 class=\"text-white\">" + elements[j + 1].name + "</h3>\
                                            <span class=\"text-white description\">" + comments + "</span>\
                                        </div>\
                                        <div class=\"col-lg-2 icons\">\
                                        <div class=\"ok caput\">\
                                            <a href=\"#/\" id=\"infoModalButton\" onclick=\"showInfoModal(&quot;" + elements[j + 1].name + "&quot;,&quot;" + elements[j + 1].data + "&quot)\">\
                                                <img src=\"../../assets/sprites/info.png\" class=\"img-button\" \>\
                                            </a>\
                                        </div>\
                                        <div class=\"ok caput\">\
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
}

async function getData(type) {
    let data = await fetch('../../data/' + type + '.json');
    data = data.json();
    return data;
}

function nameToImage(name) {
    return name.replace(/[ "()'\/.,-]/g, "");
}
