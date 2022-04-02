window.onload = async function () {
    showSurveyToast();
    let optionGroup = document.getElementById("levelSelect");
    for(let i = 0; i < 99; i++){
        let option = document.createElement("option");
        option.innerText = i+1;
        optionGroup.appendChild(option);
    }
    let data = await getData("stats");
    let items = await getData("items");
    let name = document.getElementById("character");
    let level = document.getElementById("level");
    let magiSwitch = document.getElementById("flexSwitchCheckDefault");
    level.value = 1;
    if(name.innerText != "NESS") magiSwitch.disabled = true;
    else{
        magiSwitch.disabled = false;
        magiSwitch.checked = false;
    } 
    
    updateWeapons(name, items);
    updateBodyEquipments(name, items);
    updateArmsEquipments(name, items);
    updateOtherEquipments(name, items);
    updateStats(name, data)

    const selectLevel = document.querySelector('#level');
    selectLevel.addEventListener('change', (_) => {
        updateStats(name, data)
        equip("all");
    });

    const selectWeapon = document.querySelector('#weapon');
    selectWeapon.addEventListener('change', (_) => {
        updateEquipmentStats(items);
    });

    const selectBody = document.querySelector('#bodyEquip');
    selectBody.addEventListener('change', (_) => {
        updateEquipmentStats(items);
    });

    const selectArms = document.querySelector('#armsEquip');
    selectArms.addEventListener('change', (_) => {
        updateEquipmentStats(items);
    });

    const selectOther = document.querySelector('#otherEquip');
    selectOther.addEventListener('change', (_) => {
        updateEquipmentStats(items);
    });
}

async function updateEquipmentStats(items) {
        currentBonuses = calcCurrentBonus(items);
        equippedBonuses = calcEquippedBonus(items);

        let atkbonus = document.getElementById("bonus-attack");
        let defbonus = document.getElementById("bonus-defense");
        let gutsbonus = document.getElementById("bonus-guts");
        let luckbonus = document.getElementById("bonus-luck");
        let speedbonus = document.getElementById("bonus-speed");
        let erbonus = document.getElementById("bonus-errorrate");
        bonuses = [atkbonus, gutsbonus, defbonus, speedbonus, luckbonus, erbonus];

        for(let i = 0; i< currentBonuses.length - 1; i++){
            bonus = currentBonuses[i] - equippedBonuses[i]
            if(bonus > 0){
                bonuses[i].innerText = "+" + bonus.toString();
                bonuses[i].style.color = "green";
            } else if(bonus < 0){
                bonuses[i].innerText = bonus.toString();
                bonuses[i].style.color = "red";
            } else bonuses[i].innerText = "";

            bonuses[i].style.fontSize = "20px";
        }

        bonuses[5].innerText = currentBonuses[5];
        if(calcFraction(currentBonuses[5]) > calcFraction(equippedBonuses[5])) bonuses[5].style.color = "red";
        else if(calcFraction(currentBonuses[5]) < calcFraction(equippedBonuses[5])) bonuses[5].style.color = "green";
        else bonuses[5].innerText = "";
        bonuses[5].style.fontSize = "20px";

}
async function updateStats(name, data) {
    for (let i = 0; i < Object.keys(data).length; i++) {
        if (Object.keys(data)[i] == name.innerText) {
            let level = document.getElementById("level");
            stats = Object.values(data)[i]
            for (let j = 0; j < stats.length; j++) {
                if (stats[j]["level"] == level.value) {
                    let off = document.getElementById("attack");
                    off.innerText = stats[j]["off"]
                    let def = document.getElementById("defense");
                    def.innerText = stats[j]["def"]
                    let spd = document.getElementById("speed");
                    spd.innerText = stats[j]["spd"]
                    let gut = document.getElementById("guts");
                    gut.innerText = stats[j]["gut"]
                    let vit = document.getElementById("vitality");
                    vit.innerText = stats[j]["vit"]
                    let iq = document.getElementById("iq");
                    iq.innerText = stats[j]["iq"]
                    let luck = document.getElementById("luck");
                    luck.innerText = stats[j]["luck"]
                    let hp = document.getElementById("hp");
                    hp.innerText = stats[j]["hp"]
                    let pp = document.getElementById("pp");
                    pp.innerText = stats[j]["pp"]
                    let er = document.getElementById("errorrate");
                    er.innerText = "0"
                }
            }
        }
    }
}

async function updateWeapons(name, items) {
    let weaponSel = document.getElementById("weapon");
    var weaponString = "<optgroup label=\"Choose weapon:\"><option>(Nothing)</option>\ ";
    var weapons = items[Object.keys(items)[0]]
    for (let i = 0; i < weapons.length; i++) {
        element = weapons[i];
        if (typeof (element.data["Description"]) == "undefined") 
            weaponString += "<option>" + element.name + "</option>\ ";
        else {
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
            if (ness == "N" && paula == "N" && poo == "N" && jeff == "N") weaponString += "<option>" + element.name + "</option>\ ";
            if (name.innerText == "NESS" && ness == "Y") weaponString += "<option>" + element.name + "</option>\ ";
            else if (name.innerText == "PAULA" && paula == "Y") weaponString += "<option>" + element.name + "</option>\ ";
            else if (name.innerText == "JEFF" && jeff == "Y") weaponString += "<option>" + element.name + "</option>\ ";
            else if (name.innerText == "POO" && poo == "Y") weaponString += "<option>" + element.name + "</option>\ ";
        }
    }
    weaponString += "</optgroup>";
    weaponSel.innerHTML = weaponString;
}
async function updateBodyEquipments(name, items) {
    let eqSel = document.getElementById("bodyEquip");
    var eqString = "<optgroup label=\"Choose Body Equipment:\"><option>(Nothing)</option>\ ";
    var eqs = items[Object.keys(items)[1]]
    for (let i = 0; i < eqs.length; i++) {
        element = eqs[i];

        if (typeof (element.data["Description"]) == "undefined")
            eqString += "<option>" + element.name + "</option>\ ";
        else {
            if (element.data["Description"].search(/body/i) > -1) {
                if (element.data["Description"].search(/ness/i) > -1) var ness = "Y";
                else if (element.name.search(/bat/i) > -1) var ness = "Y";
                else var ness = "N";
                if (element.data["Description"].search(/paula/i) > -1) var paula = "Y";
                else if (element.name.search(/pan/i) > -1) var ness = "Y";
                else var paula = "N";
                if (element.data["Description"].search(/jeff/i) > -1) var jeff = "Y";
                else var jeff = "N";
                if (element.data["Description"].search(/poo/i) > -1) var poo = "Y";
                else var poo = "N";
                if (ness == "N" && paula == "N" && poo == "N" && jeff == "N") eqString += "<option>" + element.name + "</option>\ ";
                if (name.innerText == "NESS" && ness == "Y") eqString += "<option>" + element.name + "</option>\ ";
                else if (name.innerText == "PAULA" && paula == "Y") eqString += "<option>" + element.name + "</option>\ ";
                else if (name.innerText == "JEFF" && jeff == "Y") eqString += "<option>" + element.name + "</option>\ ";
                else if (name.innerText == "POO" && poo == "Y") eqString += "<option>" + element.name + "</option>\ ";
            }
        }
    }
    eqString += "</optgroup>";
    eqSel.innerHTML = eqString;
}
async function updateArmsEquipments(name, items) {
    let eqSel = document.getElementById("armsEquip");
    var eqString = "<optgroup label=\"Choose Arms Equipment:\"><option>(Nothing)</option>\ ";
    var eqs = items[Object.keys(items)[1]]
    for (let i = 0; i < eqs.length; i++) {
        element = eqs[i];
        if (typeof (element.data["Description"]) == "undefined") 
            eqString += "<option>" + element.name + "</option>\ ";
        else {
            if (element.data["Description"].search(/arm/i) > -1) {
                if (element.data["Description"].search(/ness/i) > -1) var ness = "Y";
                else if (element.name.search(/bat/i) > -1) var ness = "Y";
                else var ness = "N";
                if (element.data["Description"].search(/paula/i) > -1) var paula = "Y";
                else if (element.name.search(/pan/i) > -1) var ness = "Y";
                else var paula = "N";
                if (element.data["Description"].search(/jeff/i) > -1) var jeff = "Y";
                else var jeff = "N";
                if (element.data["Description"].search(/poo/i) > -1) var poo = "Y";
                else var poo = "N";
                if (ness == "N" && paula == "N" && poo == "N" && jeff == "N") eqString += "<option>" + element.name + "</option>\ ";
                if (name.innerText == "NESS" && ness == "Y") eqString += "<option>" + element.name + "</option>\ ";
                else if (name.innerText == "PAULA" && paula == "Y") eqString += "<option>" + element.name + "</option>\ ";
                else if (name.innerText == "JEFF" && jeff == "Y") eqString += "<option>" + element.name + "</option>\ ";
                else if (name.innerText == "POO" && poo == "Y") eqString += "<option>" + element.name + "</option>\ ";
            }
        }
    }
    eqString += "</optgroup>";
    eqSel.innerHTML = eqString;
}
async function updateOtherEquipments(name, items) {
    let eqSel = document.getElementById("otherEquip");
    var eqString = "<optgroup label=\"Choose Other Equipment:\"><option>(Nothing)</option>\ ";
    var eqs = items[Object.keys(items)[1]]
    for (let i = 0; i < eqs.length; i++) {
        element = eqs[i];
        if (typeof (element.data["Description"]) == "undefined") 
            eqString += "<option>" + element.name + "</option>\ ";
        else {
            if (element.data["Description"].search(/arm/i) == -1 &&
                element.data["Description"].search(/body/i) == -1) {
                if (element.data["Description"].search(/ness/i) > -1) var ness = "Y";
                else if (element.name.search(/bat/i) > -1) var ness = "Y";
                else var ness = "N";
                if (element.data["Description"].search(/paula/i) > -1) var paula = "Y";
                else if (element.name.search(/pan/i) > -1) var ness = "Y";
                else var paula = "N";
                if (element.data["Description"].search(/jeff/i) > -1) var jeff = "Y";
                else var jeff = "N";
                if (element.data["Description"].search(/poo/i) > -1) var poo = "Y";
                else var poo = "N";
                if (ness == "N" && paula == "N" && poo == "N" && jeff == "N") eqString += "<option>" + element.name + "</option>\ ";
                if (name.innerText == "NESS" && ness == "Y") eqString += "<option>" + element.name + "</option>\ ";
                else if (name.innerText == "PAULA" && paula == "Y") eqString += "<option>" + element.name + "</option>\ ";
                else if (name.innerText == "JEFF" && jeff == "Y") eqString += "<option>" + element.name + "</option>\ ";
                else if (name.innerText == "POO" && poo == "Y") eqString += "<option>" + element.name + "</option>\ ";
            }
        }
    }
    eqString += "</optgroup>";
    eqSel.innerHTML = eqString;
}

async function resetBonus() {
    let k = document.getElementById("equipped-weapon");
    k.innerText = "(Nothing)";
    k = document.getElementById("equipped-body");
    k.innerText = "(Nothing)";
    k = document.getElementById("equipped-arms");
    k.innerText = "(Nothing)";
    k = document.getElementById("equipped-other");
    k.innerText = "(Nothing)";
}

async function changeCharacter(clicked_id) {
    let items = await getData("items");
    let hero = document.getElementsByClassName("selected-hero")
    let pics = document.getElementsByClassName("select-hero")
    let name = document.getElementById("character");
    if (getComputedStyle(document.getElementById(clicked_id)).opacity == 0.3) {
        name.innerText = clicked_id.toUpperCase()
        for (let j = 0; j < pics.length; j++) {
            if (pics[j].id != clicked_id)
                pics[j].style.opacity = 0.3
            else
                pics[j].style.opacity = 1
        }

        hero[0].src = "../../assets/sprites/" + clicked_id + ".png";

        let data = await getData("stats");
        let level = document.getElementById("level");
        level.value = 1;

        resetBonus();
        updateStats(name, data);
        updateWeapons(name, items);
        updateBodyEquipments(name, items);
        updateArmsEquipments(name, items);
        updateOtherEquipments(name, items);
        updateEquipmentStats(items);

        let magiSwitch = document.getElementById("flexSwitchCheckDefault");
        if(name.innerText != "NESS") magiSwitch.disabled = true;
        else{
            magiSwitch.disabled = false;
            magiSwitch.checked = false;
        } 
    }

    
}

async function equip(clicked_id){
    let items = await getData("items");
    switch(clicked_id){
        case "arrowW":
            w = document.getElementById("weapon");
            eqW = document.getElementById("equipped-weapon");
            applyAllBonuses(w, eqW, items);
            break;
        case "arrowB":
            w = document.getElementById("bodyEquip");
            eqW = document.getElementById("equipped-body");
            applyAllBonuses(w, eqW, items);
            break;
        case "arrowA":
            w = document.getElementById("armsEquip");
            eqW = document.getElementById("equipped-arms");
            applyAllBonuses(w, eqW, items);
            break;
        case "arrowO":
            w = document.getElementById("otherEquip");
            eqW = document.getElementById("equipped-other");
            applyAllBonuses(w, eqW, items);
            break;
        case "all":
            applyEquippedBonuses(items);
            break;
    }
}

function calcFraction(fracString){
    if(fracString.includes("/")){
        var split = fracString.split("/");
        var result = parseInt(split[0], 10) / parseInt(split[1], 10);
        return result;
        }
    else return fracString;
}
function calcCurrentBonus(items){
    let weapon = document.getElementById("weapon");
    let body = document.getElementById("bodyEquip");
    let arms = document.getElementById("armsEquip");
    let other = document.getElementById("otherEquip");

    var weapons = items[Object.keys(items)[0]]
    var protections = items[Object.keys(items)[1]]
    var sign = 1;

    bonuses = [0, 0, 0, 0, 0, "0"];

    for(let i = 0; i < weapons.length; i++){
        if(weapons[i].name.toUpperCase() == weapon.value.toUpperCase()){
            if(document.getElementById("character").innerText == "POO" && weapon.value.search(/kings/i) < 0) sign = -1;
            bonuses[0] = sign*parseInt(weapons[i].data["Offense up"]);
            bonuses[5] = weapons[i].data["Error rate"];
            if(typeof(weapons[i].data["Guts up"]) != "undefined") bonuses[1] = sign*parseInt(weapons[i].data["Guts up"]);
        }
    }

    for(let i = 0; i < protections.length; i++){
        sign = 1;
        if(protections[i].name.toUpperCase() == body.value.toUpperCase()){
            if(document.getElementById("character").innerText == "POO" && body.value.search(/kings/i) < 0) sign = -1;
            bonuses[2] += sign*parseInt(protections[i].data["Defense up"]);
            if(typeof(protections[i].data["Speed up"]) != "undefined") bonuses[3] = sign*parseInt(protections[i].data["Speed up"]);
        }
        sign = 1;
        if(protections[i].name.toUpperCase() == arms.value.toUpperCase()){
            if(document.getElementById("character").innerText == "POO" && arms.value.search(/kings/i) < 0) sign = -1;
            bonuses[2] += sign*parseInt(protections[i].data["Defense up"]);
            if(typeof(protections[i].data["Luck up"]) != "undefined") bonuses[4] += sign*parseInt(protections[i].data["Luck up"]);
        }
        sign = 1;
        if(protections[i].name.toUpperCase() == other.value.toUpperCase()){
            if(document.getElementById("character").innerText == "POO" && other.value.search(/kings/i) < 0) sign = -1;
            bonuses[2] += sign*parseInt(protections[i].data["Defense up"]);
            if(typeof(protections[i].data["Luck up"]) != "undefined") bonuses[4] += sign*parseInt(protections[i].data["Luck up"]);
        }
    }

    return bonuses;
}
function calcEquippedBonus(items){
    let weapon = document.getElementById("equipped-weapon");
    let body = document.getElementById("equipped-body");
    let arms = document.getElementById("equipped-arms");
    let other = document.getElementById("equipped-other");

    var weapons = items[Object.keys(items)[0]]
    var protections = items[Object.keys(items)[1]]
    var sign = 1;

    bonuses = [0, 0, 0, 0, 0, "0"];

    for(let i = 0; i < weapons.length; i++){
        if(weapons[i].name.toUpperCase() == weapon.innerText.toUpperCase()){
            if(document.getElementById("character").innerText == "POO" && weapon.innerText.search(/kings/i) < 0) sign = -1;
            bonuses[0] = sign*parseInt(weapons[i].data["Offense up"]);
            bonuses[5] = weapons[i].data["Error rate"];
            if(typeof(weapons[i].data["Guts up"]) != "undefined") bonuses[1] = sign*parseInt(weapons[i].data["Guts up"]);
        }
    }

    for(let i = 0; i < protections.length; i++){
        sign = 1;
        if(protections[i].name.toUpperCase() == body.innerText.toUpperCase()){
            if(document.getElementById("character").innerText == "POO" && body.innerText.search(/kings/i) < 0) sign = -1;
            bonuses[2] += sign*parseInt(protections[i].data["Defense up"]);
            if(typeof(protections[i].data["Speed up"]) != "undefined") bonuses[3] = sign*parseInt(protections[i].data["Speed up"]);
        }
        sign = 1;
        if(protections[i].name.toUpperCase() == arms.innerText.toUpperCase()){
            if(document.getElementById("character").innerText == "POO" && arms.innerText.search(/kings/i) < 0) sign = -1;
            bonuses[2] += sign*parseInt(protections[i].data["Defense up"]);
            if(typeof(protections[i].data["Luck up"]) != "undefined") bonuses[4] += sign*parseInt(protections[i].data["Luck up"]);
        }
        sign = 1;
        if(protections[i].name.toUpperCase() == other.innerText.toUpperCase()){
            if(document.getElementById("character").innerText == "POO" && other.innerText.search(/kings/i) < 0) sign = -1;
            bonuses[2] += sign*parseInt(protections[i].data["Defense up"]);
            if(typeof(protections[i].data["Luck up"]) != "undefined") bonuses[4] += sign*parseInt(protections[i].data["Luck up"]);
        }
    }
    return bonuses;
}

function applyBonus(stat, bonus){
    if(stat.innerText.search(/-/i) > -1 && stat.innerText[0] != "-"){
        values = stat.innerText.split("-");
        stat.innerText = (parseInt(values[0])+bonus).toString() + "-" + (parseInt(values[1])+bonus).toString();
    } else if((stat.innerText.match(/-/g) || []).length > 1){
        pos = stat.innerText.indexOf("-", 1)
        console.log(pos)
        stat.innerText = stat.innerText.replaceAt(pos, "$");
        console.log(stat.innerText)
        values = stat.innerText.split("$");
        stat.innerText = (parseInt(values[0])+bonus).toString() + "-" + (parseInt(values[1])+bonus).toString();
    }
    else stat.innerText = (parseInt(stat.innerText)+bonus).toString();

}
function applyAllBonuses(w, eqW, items){
    equippedBonuses = calcEquippedBonus(items);
    eqW.innerText = w.value;
    equippedBonuses2 = calcEquippedBonus(items);

    let atk = document.getElementById("attack");
    let def = document.getElementById("defense");
    let guts = document.getElementById("guts");
    let luck = document.getElementById("luck");
    let speed = document.getElementById("speed");
    let er = document.getElementById("errorrate");
    stats = [atk, guts, def, speed, luck, er];

    for(let i = 0; i< stats.length - 1; i++)
        if(equippedBonuses2[i] != equippedBonuses[i]) applyBonus(stats[i], equippedBonuses2[i] - equippedBonuses[i])

    stats[5].innerText = equippedBonuses2[5];
    updateEquipmentStats(items)
}
function applyEquippedBonuses(items){
    equippedBonuses = [0, 0, 0, 0, 0, "0"];
    equippedBonuses2 = calcEquippedBonus(items);

    let atk = document.getElementById("attack");
    let def = document.getElementById("defense");
    let guts = document.getElementById("guts");
    let luck = document.getElementById("luck");
    let speed = document.getElementById("speed");
    let er = document.getElementById("errorrate");
    stats = [atk, guts, def, speed, luck, er];

    for(let i = 0; i< stats.length - 1; i++)
        if(equippedBonuses2[i] != equippedBonuses[i]) applyBonus(stats[i], equippedBonuses2[i] - equippedBonuses[i])

    stats[5].innerText = equippedBonuses2[5];
    updateEquipmentStats("", items)

    if(document.getElementById("flexSwitchCheckDefault").checked) applyMagicantBonus();
}
function applyMagicantBonus(){
    sign = -1;
    if(document.getElementById("flexSwitchCheckDefault").checked) sign = 1;

    applyBonus(document.getElementById("speed"), sign*20);
    applyBonus(document.getElementById("luck"), sign*20);
    applyBonus(document.getElementById("guts"), sign*15);
    applyBonus(document.getElementById("iq"), sign*15);
    applyBonus(document.getElementById("vitality"), sign*10);
    applyBonus(document.getElementById("hp"), sign*150);
    applyBonus(document.getElementById("pp"), sign*320);
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function searchItem(id){
    let item = document.getElementById(id);
    if(item.innerText.toUpperCase() != "(NOTHING)")
        window.location.href = "../wiki/items/?item="+ nameToImage(item.innerText.toLowerCase());
}