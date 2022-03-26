async function getData(type) {
    let data = await fetch('../../data/' + type + '.json');
    data = data.json();
    return data;
}

window.onload = async function () {
    let data = await getData("stats");
    let items = await getData("items");
    let name = document.getElementById("character");
    let level = document.getElementById("level");
    level.value = 1;

    
    updateWeapons(name, items);
    updateStats(name, data)

    const selectLevel = document.querySelector('#level');
    selectLevel.addEventListener('change', (event) => {
        updateStats(name, data)
    });

    const selectWeapon = document.querySelector('#weapon');
    selectWeapon.addEventListener('change', (event) => {
        
    });
}

async function updateStats(name, data){
    for (let i = 0; i < Object.keys(data).length; i++) {
        if(Object.keys(data)[i] == name.innerText){
            let level = document.getElementById("level");
            stats = Object.values(data)[i]
            for(let j = 0; j<stats.length; j++){
                if(stats[j]["level"] == level.value){
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


async function updateWeapons(name, items){
    let weaponSel = document.getElementById("weapon");
    var weaponString = "<optgroup label=\"Choose weapon:\">\
                            <option>(Nothing)</option>\ ";
    var weapons = items[Object.keys(items)[0]]
    for(let i = 0; i < weapons.length; i++){
        element = weapons[i];
        if (typeof (element.data["Description"]) == "undefined") {
            weaponString += "<option>"+element.name+"</option>\ ";
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
                weaponString += "<option>"+element.name+"</option>\ ";
            }
            console.log(name.innerText);
            if(name.innerText == "NESS" && ness == "Y") weaponString += "<option>"+element.name+"</option>\ ";
            else if(name.innerText == "PAULA" && paula == "Y") weaponString += "<option>"+element.name+"</option>\ ";
            else if(name.innerText == "JEFF" && jeff == "Y") weaponString += "<option>"+element.name+"</option>\ ";
            else if(name.innerText == "POO" && poo == "Y") weaponString += "<option>"+element.name+"</option>\ ";
        }
    }

    weaponString+= "</optgroup>";
    weaponSel.innerHTML = weaponString;
}

async function changeCharacter(clicked_id){
    let items = await getData("items");
    let hero = document.getElementsByClassName("selected-hero")
    let pics = document.getElementsByClassName("select-hero")
    let name = document.getElementById("character");
    


    if(getComputedStyle(document.getElementById(clicked_id)).opacity == 0.3){
        name.innerText = clicked_id.toUpperCase()
    
        for(let j = 0; j<pics.length; j++){
            if(pics[j].id != clicked_id)
                pics[j].style.opacity = 0.3
            else 
                pics[j].style.opacity = 1
        }

        hero[0].src = "../../assets/sprites/"+clicked_id+".png";

        let data = await getData("stats");
        let level = document.getElementById("level");
        level.value = 1;
        
        updateStats(name, data);
        updateWeapons(name, items)
        
    }
    
}

  
  