window.onload = async function () {
    let data = await getData("stats");
    let items = await getData("items");
    let name = document.getElementById("character");
    let level = document.getElementById("level");
    level.value = 1;

    updateWeapons(name, items);
    updateWeaponStats(name, items);
    updateBodyEquipments(name, items);
    updateBodyStats(name, items)
    updateArmsEquipments(name, items);
    updateArmsStats(name, items);
    updateOtherEquipments(name, items);
    updateOtherStats(name, items);
    updateStats(name, data)

    const selectLevel = document.querySelector('#level');
    selectLevel.addEventListener('change', (event) => {
        updateStats(name, data)
    });

    const selectWeapon = document.querySelector('#weapon');
    selectWeapon.addEventListener('change', (event) => {
        updateWeaponStats(name, items);
    });

    const selectBody = document.querySelector('#bodyEquip');
    selectBody.addEventListener('change', (event) => {
        updateBodyStats(name, items);
    });

    const selectArms = document.querySelector('#armsEquip');
    selectArms.addEventListener('change', (event) => {
        updateArmsStats(name, items);
    });

    const selectOther = document.querySelector('#otherEquip');
    selectOther.addEventListener('change', (event) => {
        updateOtherStats(name, items);
    });
}

async function updateWeaponStats(name, items) {
    let w = document.getElementById("weapon");
    let bonus = document.getElementById("bonus-attack")
    let bonusg = document.getElementById("bonus-guts")
    var weapons = items[Object.keys(items)[0]]
    for (let i = 0; i < weapons.length; i++) {
        element = weapons[i];
        if (w.value.toUpperCase() != "(NOTHING)") {
            if (w.value.toUpperCase() == element.name.toUpperCase()) {
                if (name.innerText == "POO" && w.value.search(/kings/i) < 0) {
                    bonus.innerText = "- " + element.data["Offense up"];
                    bonus.style.color = "red";
                    bonus.style.fontSize = "20px";
                }
                else {
                    bonus.innerText = "+ " + element.data["Offense up"];
                    bonus.style.color = "green";
                    bonus.style.fontSize = "20px";

                    if (typeof (element.data["Guts up"]) != "undefined") {
                        bonusg.innerText = "+ " + element.data["Guts up"];
                        bonusg.style.color = "green";
                        bonusg.style.fontSize = "20px";
                    }
                    else {
                        bonusg.innerText = "";
                    }
                }
            }
        } else {
            bonus.innerText = "";
            bonusg.innerText = "";
        }
    }
}

async function updateBodyStats(name, items) {
    let w = document.getElementById("bodyEquip");
    let arm = document.getElementById("armsEquip");
    let oth = document.getElementById("otherEquip");
    let bonus = document.getElementById("bonus-defense")

    var actualbonus = 0;
    var weapons = items[Object.keys(items)[1]]
    for (let i = 0; i < weapons.length; i++) {
        if (weapons[i].name.toUpperCase() == arm.value.toUpperCase() || weapons[i].name.toUpperCase() == oth.value.toUpperCase())
            actualbonus += parseInt(weapons[i].data["Defense up"])
    }

    let bonuss = document.getElementById("bonus-speed")
    var weapons = items[Object.keys(items)[1]]
    for (let i = 0; i < weapons.length; i++) {
        element = weapons[i];
        if (w.value.toUpperCase() != "(NOTHING)") {
            if (w.value.toUpperCase() == element.name.toUpperCase()) {
                if (name.innerText == "POO" && w.value.search(/kings/i) < 0) {
                    bonus.innerText = "- " + element.data["Defense up"];
                    bonus.style.color = "red";
                    bonus.style.fontSize = "20px";
                }
                else {
                    b = actualbonus + parseInt(element.data["Defense up"])
                    if (b != 0)
                        bonus.innerText = "+ " + b.toString();
                    bonus.style.color = "green";
                    bonus.style.fontSize = "20px";

                    if (typeof (element.data["Speed up"]) != "undefined") {
                        bonuss.innerText = "+ " + element.data["Speed up"];
                        bonuss.style.color = "green";
                        bonuss.style.fontSize = "20px";
                    }
                    else {
                        bonuss.innerText = "";
                    }
                }
            }
        } else {
            if (actualbonus != 0)
                bonus.innerText = "+ " + actualbonus.toString();
            else bonus.innerText = "";
            bonuss.innerText = "";
        }
    }
}

async function updateArmsStats(name, items) {
    let w = document.getElementById("armsEquip");
    let bod = document.getElementById("bodyEquip");
    let oth = document.getElementById("otherEquip");
    let bonus = document.getElementById("bonus-defense")
    var actualbonus = 0;
    var actualLbonus = 0;
    var weapons = items[Object.keys(items)[1]]
    for (let i = 0; i < weapons.length; i++) {
        if (weapons[i].name.toUpperCase() == bod.value.toUpperCase() || weapons[i].name.toUpperCase() == oth.value.toUpperCase()) {
            actualbonus += parseInt(weapons[i].data["Defense up"])
            if (typeof (weapons[i].data["Luck up"]) != "undefined")
                actualLbonus += parseInt(weapons[i].data["Luck up"])
        }
    }

    let bonusl = document.getElementById("bonus-luck")
    var weapons = items[Object.keys(items)[1]]
    for (let i = 0; i < weapons.length; i++) {
        element = weapons[i];
        if (w.value.toUpperCase() != "(NOTHING)") {
            if (w.value.toUpperCase() == element.name.toUpperCase()) {
                if (name.innerText == "POO" && w.value.search(/kings/i) < 0) {
                    bonus.innerText = "- " + element.data["Defense up"];
                    bonus.style.color = "red";
                    bonus.style.fontSize = "20px";
                }
                else {
                    b = actualbonus + parseInt(element.data["Defense up"])
                    if (b != 0)
                        bonus.innerText = "+ " + b.toString();
                    bonus.style.color = "green";
                    bonus.style.fontSize = "20px";

                    if (typeof (element.data["Luck up"]) != "undefined") {
                        b = actualLbonus + parseInt(element.data["Luck up"])
                        if (b != 0)
                            bonusl.innerText = "+ " + b.toString();
                        bonusl.style.color = "green";
                        bonusl.style.fontSize = "20px";
                    }
                    else {
                        if (actualLbonus != 0)
                            bonusl.innerText = "+ " + actualLbonus.toString();
                        else bonusl.innerText = "";
                    }
                }
            }
        } else {
            if (actualbonus != 0)
                bonus.innerText = "+ " + actualbonus.toString();
            else bonus.innerText = "";
            if (actualLbonus != 0)
                bonusl.innerText = "+ " + actualLbonus.toString();
            else bonusl.innerText = "";
        }
    }
}

async function updateOtherStats(name, items) {
    let w = document.getElementById("otherEquip");
    let bod = document.getElementById("bodyEquip");
    let arm = document.getElementById("armsEquip");
    let bonus = document.getElementById("bonus-defense")

    var actualbonus = 0;
    var actualLbonus = 0;
    var weapons = items[Object.keys(items)[1]]
    for (let i = 0; i < weapons.length; i++) {
        if (weapons[i].name.toUpperCase() == bod.value.toUpperCase() || weapons[i].name.toUpperCase() == arm.value.toUpperCase()) {
            actualbonus += parseInt(weapons[i].data["Defense up"])
            if (typeof (weapons[i].data["Luck up"]) != "undefined")
                actualLbonus += parseInt(weapons[i].data["Luck up"])
        }
    }

    console.log(actualLbonus)

    let bonusl = document.getElementById("bonus-luck")
    var weapons = items[Object.keys(items)[1]]
    for (let i = 0; i < weapons.length; i++) {
        element = weapons[i];
        if (w.value.toUpperCase() != "(NOTHING)") {
            if (w.value.toUpperCase() == element.name.toUpperCase()) {
                if (name.innerText == "POO" && w.value.search(/kings/i) < 0) {
                    bonus.innerText = "- " + element.data["Defense up"];
                    bonus.style.color = "red";
                    bonus.style.fontSize = "20px";
                }
                else {
                    b = actualbonus + parseInt(element.data["Defense up"])
                    if (b != 0)
                        bonus.innerText = "+ " + b.toString();
                    bonus.style.color = "green";
                    bonus.style.fontSize = "20px";

                    if (typeof (element.data["Luck up"]) != "undefined") {
                        b = actualLbonus + parseInt(element.data["Luck up"])
                        if (b != 0)
                            bonusl.innerText = "+ " + b.toString();
                        bonusl.style.color = "green";
                        bonusl.style.fontSize = "20px";
                    }
                    else {
                        if (actualLbonus != 0)
                            bonusl.innerText = "+ " + actualLbonus.toString();
                        else bonusl.innerText = "";
                    }

                }
            }
        } else {
            if (actualbonus != 0)
                bonus.innerText = "+ " + actualbonus.toString();
            else bonus.innerText = "";
            if (actualLbonus != 0)
                bonusl.innerText = "+ " + actualLbonus.toString();
            else bonusl.innerText = "";
        }
    }
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
                }
            }
        }
    }
}

async function updateWeapons(name, items) {
    let weaponSel = document.getElementById("weapon");
    var weaponString = "<optgroup label=\"Choose weapon:\">\
                            <option>(Nothing)</option>\ ";
    var weapons = items[Object.keys(items)[0]]
    for (let i = 0; i < weapons.length; i++) {
        element = weapons[i];
        if (typeof (element.data["Description"]) == "undefined") {
            weaponString += "<option>" + element.name + "</option>\ ";
        } else {
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
            if (ness == "N" && paula == "N" && poo == "N" && jeff == "N") {
                weaponString += "<option>" + element.name + "</option>\ ";
            }
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
    var eqString = "<optgroup label=\"Choose Body Equipment:\">\
                            <option>(Nothing)</option>\ ";
    var eqs = items[Object.keys(items)[1]]
    for (let i = 0; i < eqs.length; i++) {
        element = eqs[i];

        if (typeof (element.data["Description"]) == "undefined") {
            eqString += "<option>" + element.name + "</option>\ ";
        } else {
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
                if (ness == "N" && paula == "N" && poo == "N" && jeff == "N") {
                    eqString += "<option>" + element.name + "</option>\ ";
                }
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
    var eqString = "<optgroup label=\"Choose Arms Equipment:\">\
                            <option>(Nothing)</option>\ ";
    var eqs = items[Object.keys(items)[1]]
    for (let i = 0; i < eqs.length; i++) {
        element = eqs[i];

        if (typeof (element.data["Description"]) == "undefined") {
            eqString += "<option>" + element.name + "</option>\ ";
        } else {
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
                if (ness == "N" && paula == "N" && poo == "N" && jeff == "N") {
                    eqString += "<option>" + element.name + "</option>\ ";
                }
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
    var eqString = "<optgroup label=\"Choose Other Equipment:\">\
                            <option>(Nothing)</option>\ ";
    var eqs = items[Object.keys(items)[1]]
    for (let i = 0; i < eqs.length; i++) {
        element = eqs[i];

        if (typeof (element.data["Description"]) == "undefined") {
            eqString += "<option>" + element.name + "</option>\ ";
        } else {
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
                if (ness == "N" && paula == "N" && poo == "N" && jeff == "N") {
                    eqString += "<option>" + element.name + "</option>\ ";
                }
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
    let offence_up = document.getElementById("bonus-attack");
    offence_up.innerText = "";
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
        updateWeaponStats(name, items);
        updateBodyEquipments(name, items);
        updateBodyStats(name, items)
        updateArmsEquipments(name, items);
        updateArmsStats(name, items)
        updateOtherEquipments(name, items);
        updateOtherStats(name, items);
    }
}
