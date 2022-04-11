Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--)
        if (this[i] && this[i].parentElement)
            this[i].parentElement.removeChild(this[i]);
}

var saves = [];
var itemsLUT = ["(Nothing)", "Franklin badge", "Teddy bear",
    "Super plush bear", "Broken machine", "Broken gadget",
    "Broken air gun", "Broken spray can", "Broken laser",
    "Broken iron", "Broken pipe", "Broken cannon", "Broken tube",
    "Broken bazooka", "Broken trumpet", "Broken harmonica",
    "Broken antenna", "Cracked bat", "Tee ball bat",
    "Sand lot bat", "Minor league bat", "Mr. Baseball bat",
    "Big league bat", "Hall of fame bat", "Magicant bat",
    "Legendary bat", "Gutsy bat", "Casey bat", "Fry pan",
    "Thick fry pan", "Deluxe fry pan", "Chef's fry pan",
    "French fry pan", "Magic fry pan", "Holy fry pan",
    "Sword of kings", "Pop gun", "Stun gun", "Toy air gun",
    "Magnum air gun", "Zip gun", "Laser gun", "Hyper beam",
    "Crusher beam", "Spectrum beam", "Death ray", "Baddest beam",
    "Moon beam gun", "Gaia beam", "Yo-yo", "Slingshot",
    "Bionic slingshot", "Trick yo-yo", "Combat yo-yo",
    "Travel charm", "Great charm", "Crystal charm",
    "Rabbit's foot", "Flame pendant", "Rain pendant",
    "Night pendant", "Sea pendant", "Star pendant",
    "Cloak of kings", "Cheap bracelet", "Copper bracelet",
    "Silver bracelet", "Gold bracelet", "Platinum band",
    "Diamond band", "Pixie's bracelet", "Cherub's band",
    "Goddess band", "Bracer of kings", "Baseball cap",
    "Holmes hat", "Mr. Baseball cap", "Hard hat", "Ribbon",
    "Red ribbon", "Goddess ribbon", "Coin of slumber",
    "Coin of defense", "Lucky coin", "Talisman coin",
    "Shiny coin", "Souvenir coin", "Diadem of kings",
    "Cookie", "Bag of fries", "Hamburger", "Boiled egg",
    "Fresh Egg", "Picnic lunch", "Pasta di Summers", "Pizza",
    "Chef's special", "Large pizza", "PSI caramel",
    "Magic truffle", "Brain food lunch", "Rock candy",
    "Croissant", "Bread roll", "Pak of bubble gum",
    "Jar of Fly Honey", "Can of fruit juice", "Royal iced tea",
    "Protein drink", "Kraken soup", "Bottle of water",
    "Cold remedy", "Vial of serum", "IQ capsule",
    "Guts capsule", "Speed capsule", "Vital capsule",
    "Luck capsule", "Ketchup packet", "Sugar packet",
    "Tin of Cocoa", "Carton of cream", "Sprig of parsley",
    "Jar of hot sauce", "Salt packet", "Backstage pass",
    "Jar of delisauce", "Wet towel", "Refreshing herb",
    "Secret herb", "Horn of life", "Counter-PSI unit",
    "Shield killer", "Bazooka", "Heavy bazooka", "HP-sucker",
    "Hungry HP-sucker", "Xterminator spray", "Slime generator",
    "Yogurt dispenser", "Ruler", "Snake bag", "Mummy wrap",
    "Protractor", "Bottle rocket", "Big bottle rocket",
    "Multi bottle rocket", "Bomb", "Super bomb",
    "Insecticide spray", "Rust promoter", "Rust promoter DX",
    "Pair of dirty socks", "Stag beetle", "Toothbrush",
    "Handbag strap", "Pharaoh's curse", "Defense shower",
    "Letter from mom", "Sudden guts pill", "Bag of Dragonite",
    "Defense spray", "Piggy nose", "For Sale sign",
    "Shyness book", "Picture postcard", "King banana",
    "Letter from Tony", "Chick", "Chicken", "Key to the shack",
    "Key to the cabin", "Bad key machine", "Temporary goods",
    "Zombie paper", "Hawk eye", "Bicycle", "ATM card",
    "Show ticket", "Letter from kids", "Wad of bills",
    "Receiver phone", "Diamond", "Signed banana",
    "Pencil eraser", "Hieroglyph copy", "Meteotite",
    "Contact lens", "Hand-Aid", "Trout yogurt", "Banana",
    "Calorie stick", "Key to the tower", "Meteorite piece",
    "Earth pendant", "Neutralizer", "Sound Stone", "Exit mouse",
    "Gelato de resort", "Snake", "Viper", "Brain stone",
    "Town map", "Video relaxant", "Suporma", "Key to the locker",
    "Insignificant item", "Magic tart", "Tiny ruby",
    "Monkey's love", "Eraser eraser", "Tendakraut",
    "T-rex's bat", "Big league bat", "Ultimate bat",
    "Double beam", "Platinum band", "Diamond band",
    "Defense ribbon", "Talisman ribbon", "Saturn ribbon",
    "Coin of silence", "Charm coin", "Cup of noodles",
    "Skip sandwich", "Skip sandwich DX", "Lucky sandwich",
    "Lucky sandwich", "Lucky sandwich", "Lucky sandwich",
    "Lucky sandwich", "Lucky sandwich", "Cup of coffee",
    "Double burger", "Peanut cheese bar", "Piggy jelly",
    "Bowl of rice gruel", "Bean croquette", "Molokheiya soup",
    "Plain roll", "Kabob", "Plain yogurt", "Beef jerky",
    "Mammoth burger", "Spicy jerky", "Luxury jerky",
    "Bottle of DXwater", "Magic pudding", "Non-stick frypan",
    "Mr. Saturn coin", "Meteornium", "Popsicle",
    "Cup of Lifenoodles", "Carrot key", "-", "-"];

window.onload = function () {
    showSurveyToast();
    initThumbnail();

    pages = ["items", "enemies", "shops", "maps"]
    data = []
    names = []

    setTimeout(async function () {
        for (let j = 0; j < pages.length; j++) {
            data[j] = await getData(pages[j]);
            d = data[j]
            if (j < 3) {
                for (let i = 0; i < Object.keys(d).length; i++) {
                    var elements = d[Object.keys(d)[i]];
                    for (let k = 0; k < elements.length; k++) {
                        names.push(elements[k].name)
                    }
                }
            } else {
                for (const map of Object.keys(d))
                    names.push(capitalizeFirstLetters(map));
            }
        }

    }, 100);

    autocomplete(document.getElementById("searchLabel"), names)

    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', (_) => {
        searchOnSite(data);
    });
}

function updateThumbnail(_, file) {
    document.getElementById("fileUploader").style.display = "none";
    document.getElementById("loadedFileBanner").style.display = "flex";
    document.getElementById("loadedFileBanner").classList.add("drop-zone--over");
    document.getElementById("loadedFileBanner").classList.add("drop-zone");
    document.getElementById("loadedFileBanner").innerHTML = "<span class=\"drop-zone__prompt\">Loaded file: \"" + file.name + "\", click to unload file</span>"
    var reader = new FileReader();
    var fileByteArray = [];
    reader.readAsArrayBuffer(file);
    reader.onloadend = function (evt) {
        if (evt.target.readyState == FileReader.DONE) {
            var arrayBuffer = evt.target.result,
                array = new Uint8Array(arrayBuffer);
            for (var i = 0; i < array.length; i++)
                fileByteArray.push(array[i]);
        }
        for (var i = 0; i < 3; i++) {
            let dataStart = i * hexToDec("A00");
            saves[i] = new GameSave(fileByteArray.slice(dataStart, dataStart + hexToDec("500")));
        }
        saves[0].displayData();
    }
    window.onresize = resizeTables;
}

function selectSave(id) {
    GameSave.resetData();
    saves[parseInt(id[4])].displayData();
    for (let i = 0; i < 3; i++)
        document.getElementById("save" + i).style.opacity = 0.3;
    document.getElementById(id).style.opacity = 1;
}

async function initThumbnail() {
    document.getElementById("loadedFileBanner").style.display = "none";
    document.getElementById("fileUploader").classList.remove("drop-zone--over")
    document.getElementById("fileUploader").innerHTML = "<span class=\"drop-zone__prompt\">Drop file here or click to load save file</span>\
        <input type=\"file\" id=\"fileToUpload\" name=\"myFile\" class=\"drop-zone__input\">";
    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
        const dropZoneElement = inputElement.closest(".drop-zone");
        dropZoneElement.addEventListener("click", (_) => {
            inputElement.click();
        });

        inputElement.addEventListener("change", (_) => {
            if (inputElement.files.length) {
                updateThumbnail(dropZoneElement, inputElement.files[0]);
            }
        });

        dropZoneElement.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZoneElement.classList.add("drop-zone--over");
        });

        ["dragleave", "dragend"].forEach((type) => {
            dropZoneElement.addEventListener(type, (_) => {
                dropZoneElement.classList.remove("drop-zone--over");
            });
        });

        dropZoneElement.addEventListener("drop", (e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) {
                inputElement.files = e.dataTransfer.files;
                updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
            }
        });
    });
    document.getElementById("fileToUpload").value = "";
    document.getElementById("fileUploader").removeAttribute("style");
    document.getElementById("fileUploader").style.display = "flex";
    if (typeof (saves[0]) != "undefined")
        GameSave.resetData();
    window.onresize = null;
}

class GameSave {
    constructor(data) {
        this.characters = [];
        this.playerName = "";
        this.petName = "";
        this.favFood = "";
        this.favThing = "";
        this.moneyHand = (data[hexToDec("5f")] << 24) + (data[hexToDec("5e")] << 16) + (data[hexToDec("5d")] << 8) + data[hexToDec("5c")];
        this.moneyATM = (data[hexToDec("63")] << 24) + (data[hexToDec("62")] << 16) + (data[hexToDec("61")] << 8) + data[hexToDec("60")];
        this.numPartyMembers = data[hexToDec("ce")];
        this.flags = []
        this.escargoItems = [];

        for (var i = 0; i < 24; i++) {
            let ch = data[i + hexToDec("2C")];
            if (ch > 0)
                this.playerName += getChar(ch);
        }

        for (i = 0; i < 6; i++) {
            let ch = data[i + hexToDec("44")];
            if (ch > 0)
                this.petName += getChar(ch);
        }

        for (i = 0; i < 6; i++) {
            let ch = data[i + hexToDec("4a")];
            if (ch > 0)
                this.favFood += getChar(ch);
        }

        for (i = 0; i < 7; i++) {
            let ch = data[i + hexToDec("54")];
            if (ch > 0)
                this.favThing += getChar(ch);
        }

        for (i = 0; i < 4; i++) {
            let subbuffer = [];
            for (var j = 0; j < hexToDec("5f"); j++)
                subbuffer.push(data[(i * hexToDec("5f")) + hexToDec("1f9") + j]);
            this.characters[i] = new PartyMember(subbuffer);
        }

        var flagCounter = 0;
        for (i = 0; i < 205; i++)
            for (j = 0; j < 8; j++)
                this.flags[flagCounter++] = ((data[i + hexToDec("433")] & (1 << j)) == 0) ? false : true;

        for (i = 0; i < 36; i++)
            this.escargoItems[i] = itemsLUT[data[i + hexToDec("76")]];
        this.inGameTimer = (data[hexToDec("1f7")] << 24) + (data[hexToDec("1f6")] << 16) + (data[hexToDec("1f5")] << 8) + data[hexToDec("1f4")];
    }
    async displayData() {
        for (let i = 0; i < 3; i++)
            document.getElementById("savec" + i).style.display = "block";
        if (this.inGameTimer == 0) {
            document.getElementById("emptyFileWarning").style.display = "block";
            return
        }
        else
            document.getElementById("emptyFileWarning").style.display = "none";
        let items = await getData("items");
        document.getElementById("handMoneyValue").innerText = this.moneyHand + "$";
        document.getElementById("ATMMoneyValue").innerText = this.moneyATM + "$";
        document.getElementById("petNameValue").innerText = this.petName;
        if (this.playerName != "") {
            document.getElementById("playerNameValue").innerText = this.playerName;
            document.getElementById("playerNameColon").innerText = ":";
            document.getElementById("playerNameHeader").innerText = "Player Name"
        }
        document.getElementById("favThingValue").innerText = this.favThing;
        document.getElementById("favFoodValue").innerText = this.favFood;
        for (let j = 0; j < this.numPartyMembers; j++) {
            document.getElementById("c" + j + "name").innerText = this.characters[j].name
            document.getElementById("c" + j + "weapon").innerText = this.characters[j].equip[0];
            document.getElementById("c" + j + "body").innerText = this.characters[j].equip[1];
            document.getElementById("c" + j + "arms").innerText = this.characters[j].equip[2];
            document.getElementById("c" + j + "other").innerText = this.characters[j].equip[3];
            let inventory = this.characters[j].items;
            for (let i = 0; i < inventory.length; i++)
                document.getElementById("c" + j + "i" + i).innerText = inventory[i];
            let stats = this.characters[j].stats;
            for (let i = 0; i < stats.length; i++)
                document.getElementById("c" + j + "stat" + i).innerText = stats[i];
            document.getElementById("c" + j + "level").innerText = this.characters[j].level;
            document.getElementById("c" + j + "xp").innerText = this.characters[j].exp;
            document.getElementById("c" + j + "hp").innerText = this.characters[j].currHP;
            document.getElementById("c" + j + "pp").innerText = this.characters[j].currPP;
            var weapons = items[Object.keys(items)[0]]
            for (let i = 0; i < weapons.length; i++)
                if (weapons[i].name.toUpperCase() == this.characters[j].equip[0].toUpperCase())
                    document.getElementById("c" + j + "errorRate").innerText = weapons[i].data["Error rate"];
            document.getElementById("c" + j).style.display = "block";
        }
        document.getElementById("escargo").style.display = "block";
        document.getElementById("generalInfo").style.display = "block";
        for (let i = 0; i < this.escargoItems.length - 1; i++)
            document.getElementById("esc" + i).innerText = this.escargoItems[i]
    }

    static resetData() {
        document.getElementById("handMoneyValue").innerText = "";
        document.getElementById("ATMMoneyValue").innerText = "";
        document.getElementById("petNameValue").innerText = "";
        document.getElementById("playerNameValue").innerText = "";
        document.getElementById("playerNameColon").innerText = "";
        document.getElementById("playerNameHeader").innerText = ""
        document.getElementById("favThingValue").innerText = "";
        document.getElementById("favFoodValue").innerText = "";
        for (let j = 0; j < 4; j++) {
            document.getElementById("c" + j).style.display = "none";
            document.getElementById("c" + j + "name").innerText = ""
            document.getElementById("c" + j + "weapon").innerText = "";
            document.getElementById("c" + j + "body").innerText = "";
            document.getElementById("c" + j + "arms").innerText = "";
            document.getElementById("c" + j + "other").innerText = "";
            for (let i = 0; i < 14; i++)
                document.getElementById("c" + j + "i" + i).innerText = "";
            for (let i = 0; i < 7; i++)
                document.getElementById("c" + j + "stat" + i).innerText = ""
            document.getElementById("c" + j + "level").innerText = "";
            document.getElementById("c" + j + "xp").innerText = "";
            document.getElementById("c" + j + "hp").innerText = "";
            document.getElementById("c" + j + "pp").innerText = "";
            document.getElementById("c" + j + "errorRate").innerText = "";
        }
        document.getElementById("escargo").style.display = "none";
        for (let i = 0; i < 35; i++)
            document.getElementById("esc" + i).innerText = "(Nothing)"
        document.getElementById("generalInfo").style.display = "none";
        for (let i = 0; i < 3; i++)
            document.getElementById("savec" + i).style.display = "none";
    }
}


class PartyMember {
    constructor(data) {
        this.name = "";
        var ch;
        for (var i = 0; i < 5; i++) {
            ch = data[i];
            if (ch > 0)
                this.name += getChar(ch);
        }
        this.level = data[5];
        this.exp = (data[9] << 24) + (data[8] << 16) + (data[7] << 8) + data[6];
        this.maxHP = (data[11] << 8) + data[10];
        this.maxPP = (data[13] << 8) + data[12];
        this.items = [];
        this.equip = [];
        for (i = 0; i < 14; i++)
            this.items.push(itemsLUT[data[i + 35]]);

        for (i = 0; i < 4; i++) {
            let index = data[i + 49];
            if (index != 0)
                this.equip.push(this.items[index - 1]);
            else this.equip.push("(Nothing)");
        }

        this.currHP = (data[70] << 8) + data[69];
        this.currPP = (data[76] << 8) + data[75];

        this.stats = [];
        for (i = 0; i < 7; i++)
            this.stats.push(data[21 + i]);
    }
}

//Helper functions

function decToHex(data) {
    return data.toString(16);
}

function hexToDec(data) {
    return parseInt(data, 16);
}

function getChar(char) {
    if (char < hexToDec("30")) return ""
    return String.fromCharCode(char - hexToDec("30"));
}

function resizeTables() {
    if (document.getElementsByClassName("smallTable").length == 0 && window.innerWidth < 992) {
        document.getElementById("generalInfoTable").innerHTML = "<tbody class=\"smallTable\">\
        <tr>\
          <th scope=\"row\">\
            Hand Money\
          </th>\
          <td>:</td>\
          <td id=\"handMoneyValue\"></td>\
          <th scope=\"row\">\
            ATM Money\
          </th>\
          <td>:</td>\
          <td id=\"ATMMoneyValue\"></td>\
        </tr>\
        <tr>\
          <th scope=\"row\">\
            Favorite Food\
          </th>\
          <td>:</td>\
          <td id=\"favFoodValue\"></td>\
          <th scope=\"row\">\
            Favorite Thing\
          </th>\
          <td>:</td>\
          <td id=\"favThingValue\"></td>\
        </tr>\
        <tr>\
            <th scope=\"row\">\
            Pet Name\
            </th>\
            <td>:</td>\
            <td id=\"petNameValue\"></td>\
            <th id=\"playerNameHeader\" scope=\"row\"></th>\
            <td id=\"playerNameColon\"></td>\
            <td id=\"playerNameValue\"></td>\
        </tr>\
      </tbody>"
        document.getElementById("escargoTable").innerHTML = "<tbody style=\"display: table !important; width:100% !important\">\
            <tr>\
              <td id=\"esc0\">(Nothing)</td>\
              <td id=\"esc1\">(Nothing)</td>\
              <td id=\"esc2\">(Nothing)</td>\
              </tr>\
              <tr>\
              <td id=\"esc3\">(Nothing)</td>\
              <td id=\"esc4\">(Nothing)</td>\
              <td id=\"esc5\">(Nothing)</td>\
              </tr>\
              <tr>\
              <td id=\"esc6\">(Nothing)</td>\
              <td id=\"esc7\">(Nothing)</td>\
              <td id=\"esc8\">(Nothing)</td>\
              </tr>\
              <tr>\
              <td id=\"esc9\">(Nothing)</td>\
              <td id=\"esc10\">(Nothing)</td>\
              <td id=\"esc11\">(Nothing)</td>\
              </tr>\
              <tr>\
              <td id=\"esc12\">(Nothing)</td>\
              <td id=\"esc13\">(Nothing)</td>\
              <td id=\"esc14\">(Nothing)</td>\
              </tr>\
              <tr>\
              <td id=\"esc15\">(Nothing)</td>\
              <td id=\"esc16\">(Nothing)</td>\
              <td id=\"esc17\">(Nothing)</td>\
              </tr>\
              <tr>\
              <td id=\"esc18\">(Nothing)</td>\
              <td id=\"esc19\">(Nothing)</td>\
              <td id=\"esc20\">(Nothing)</td>\
              </tr>\
              <tr>\
              <td id=\"esc21\">(Nothing)</td>\
              <td id=\"esc22\">(Nothing)</td>\
              <td id=\"esc23\">(Nothing)</td>\
              </tr>\
              <tr>\
              <td id=\"esc24\">(Nothing)</td>\
              <td id=\"esc25\">(Nothing)</td>\
              <td id=\"esc26\">(Nothing)</td>\
              </tr>\
              <tr>\
              <td id=\"esc27\">(Nothing)</td>\
              <td id=\"esc28\">(Nothing)</td>\
              <td id=\"esc29\">(Nothing)</td>\
              </tr>\
              <tr>\
              <td id=\"esc30\">(Nothing)</td>\
              <td id=\"esc31\">(Nothing)</td>\
              <td id=\"esc32\">(Nothing)</td>\
              </tr>\
              <tr>\
              <td id=\"esc33\">(Nothing)</td>\
              <td id=\"esc34\">(Nothing)</td>\
            </tr>\
          </tbody>";

          for (let i = 0; i < 4; i++) {
            document.getElementById("c" + i + "statsTable").innerHTML = "<tbody>\
            <tr>\
              <th scope=\"row\">\
                Offense\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "stat0\"></td>\
              <th scope=\"row\">\
                Defense\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "stat1\"></td>\
              </tr>\
              <tr>\
              <th scope=\"row\">\
                Speed\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "stat2\"></td>\
              <th scope=\"row\">\
                Guts\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "stat3\"></td>\
              </tr>\
              <tr>\
              <th scope=\"row\">\
                Luck\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "stat4\"></td>\
              <th scope=\"row\">\
                Vitality\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "stat5\"></td>\
              </tr>\
              <tr>\
              <th scope=\"row\">\
                IQ\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "stat6\"></td>\
              <th scope=\"row\">\
                Error Rate\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "errorRate\"></td>\
              </tr>\
              <tr>\
              <th scope=\"row\">\
                Level\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "level\"></td>\
              <th scope=\"row\">\
                Experience\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "xp\"></td>\
              </tr>\
              <tr>\
              <th scope=\"row\">\
                Hit Points\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "hp\"></td>\
              <th scope=\"row\">\
                Psychic Points\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "pp\"></td>\
            </tr>\
          </tbody>"
          }
          for(let i = 0; i < 3; i++)
            if (document.getElementById("save" + i).style.opacity != 0.3)
                saves[i].displayData();
        
    }
    else if (document.getElementsByClassName("largeTable").length == 0 && window.innerWidth > 992) {
        document.getElementById("generalInfoTable").innerHTML = "<tbody class=\"largeTable\">\
        <tr>\
          <th scope=\"row\">\
            Hand Money\
          </th>\
          <td>:</td>\
          <td id=\"handMoneyValue\"></td>\
          <th scope=\"row\">\
            Favorite Food\
          </th>\
          <td>:</td>\
          <td id=\"favFoodValue\"></td>\
          <th scope=\"row\">\
            Pet Name\
          </th>\
          <td>:</td>\
          <td id=\"petNameValue\"></td>\
        </tr>\
        <tr>\
          <th scope=\"row\">\
            ATM Money\
          </th>\
          <td>:</td>\
          <td id=\"ATMMoneyValue\"></td>\
          <th scope=\"row\">\
            Favorite Thing\
          </th>\
          <td>:</td>\
          <td id=\"favThingValue\"></td>\
          <th id=\"playerNameHeader\" scope=\"row\"></th>\
          <td id=\"playerNameColon\"></td>\
          <td id=\"playerNameValue\"></td>\
        </tr>\
      </tbody>"
        document.getElementById("escargoTable").innerHTML = "<tbody style=\"display: table !important; width:100% !important\">\
            <tr>\
              <td id=\"esc0\">(Nothing)</td>\
              <td id=\"esc1\">(Nothing)</td>\
              <td id=\"esc2\">(Nothing)</td>\
              <td id=\"esc3\">(Nothing)</td>\
              <td id=\"esc4\">(Nothing)</td>\
            </tr>\
            <tr>\
              <td id=\"esc5\">(Nothing)</td>\
              <td id=\"esc6\">(Nothing)</td>\
              <td id=\"esc7\">(Nothing)</td>\
              <td id=\"esc8\">(Nothing)</td>\
              <td id=\"esc9\">(Nothing)</td>\
            </tr>\
            <tr>\
              <td id=\"esc10\">(Nothing)</td>\
              <td id=\"esc11\">(Nothing)</td>\
              <td id=\"esc12\">(Nothing)</td>\
              <td id=\"esc13\">(Nothing)</td>\
              <td id=\"esc14\">(Nothing)</td>\
            </tr>\
            <tr>\
              <td id=\"esc15\">(Nothing)</td>\
              <td id=\"esc16\">(Nothing)</td>\
              <td id=\"esc17\">(Nothing)</td>\
              <td id=\"esc18\">(Nothing)</td>\
              <td id=\"esc19\">(Nothing)</td>\
            </tr>\
            <tr>\
              <td id=\"esc20\">(Nothing)</td>\
              <td id=\"esc21\">(Nothing)</td>\
              <td id=\"esc22\">(Nothing)</td>\
              <td id=\"esc23\">(Nothing)</td>\
              <td id=\"esc24\">(Nothing)</td>\
            </tr>\
            <tr>\
              <td id=\"esc25\">(Nothing)</td>\
              <td id=\"esc26\">(Nothing)</td>\
              <td id=\"esc27\">(Nothing)</td>\
              <td id=\"esc28\">(Nothing)</td>\
              <td id=\"esc29\">(Nothing)</td>\
            </tr>\
            <tr>\
              <td id=\"esc30\">(Nothing)</td>\
              <td id=\"esc31\">(Nothing)</td>\
              <td id=\"esc32\">(Nothing)</td>\
              <td id=\"esc33\">(Nothing)</td>\
              <td id=\"esc34\">(Nothing)</td>\
            </tr>\
          </tbody>";
        for (let i = 0; i < 4; i++) {
            document.getElementById("c" + i + "statsTable").innerHTML = "<tbody>\
            <tr>\
              <th scope=\"row\">\
                Offense\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "stat0\"></td>\
              <th scope=\"row\">\
                Defense\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "stat1\"></td>\
              <th scope=\"row\">\
                Speed\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "stat2\"></td>\
            </tr>\
            <tr>\
              <th scope=\"row\">\
                Guts\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "stat3\"></td>\
              <th scope=\"row\">\
                Luck\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "stat4\"></td>\
              <th scope=\"row\">\
                Vitality\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "stat5\"></td>\
            </tr>\
            <tr>\
              <th scope=\"row\">\
                IQ\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "stat6\"></td>\
              <th scope=\"row\">\
                Error Rate\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "errorRate\"></td>\
              <th scope=\"row\">\
                Level\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "level\"></td>\
            </tr>\
            <tr>\
              <th scope=\"row\">\
                Experience\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "xp\"></td>\
              <th scope=\"row\">\
                Hit Points\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "hp\"></td>\
              <th scope=\"row\">\
                Psychic Points\
              </th>\
              <td>:</td>\
              <td id=\"c" + i + "pp\"></td>\
            </tr>\
          </tbody>"
        }
        for(let i = 0; i < 3; i++)
            if (document.getElementById("save" + i).style.opacity != 0.3)
                saves[i].displayData();
        
    }
}