async function getData(type) {
    let data = await fetch('../../data/' + type + '.json');
    data = data.json();
    return data;
  }

window.onload = async function () {
    let data = await getData("stats");
    let name = document.getElementById("character");
    let level = document.getElementById("level");
    level.value = 1;

    updateStats(name, data)

    //console.log(name.innerText)

    const selectElement = document.querySelector('#level');

    selectElement.addEventListener('change', (event) => {
        updateStats(name, data)
    });

    
}

function updateStats(name, data){
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


  
  