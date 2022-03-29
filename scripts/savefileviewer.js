Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
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
"Cup of Lifenoodles", "Carrot key", "-", "-" ];

window.onload = function () {
    showSurveyToast();
    initThumbnail(false);
}

function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
    document.getElementById("fileUploader").classList.add("drop-zone--over")

    if (dropZoneElement.querySelector(".drop-zone__prompt"))
        dropZoneElement.querySelector(".drop-zone__prompt").remove();

    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.innerHTML = "<div class=\"drop-zone__thumb\" style=\"text-align:center;line-height:70px;width:100%;height:70px;font-size:40px;\">Uploaded file: " + file.name + " <span onclick=\"initThumbnail()\">Reset?</span></div>"
        dropZoneElement.appendChild(thumbnailElement);
    }
    var old_element = document.getElementById("fileUploader");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);

    document.getElementById("fileToUpload").remove();
    document.getElementById("fileUploader").style.cursor = "auto";
    var reader = new FileReader();
    var fileByteArray = [];
    reader.readAsArrayBuffer(file);
    reader.onloadend = function (evt) {
        if (evt.target.readyState == FileReader.DONE) {
            var arrayBuffer = evt.target.result,
                array = new Uint8Array(arrayBuffer);
            for (var i = 0; i < array.length; i++) {
                fileByteArray.push(array[i]);
            }
        }
        for (var i = 0; i < 3; i++){
            let dataStart = i * hexToDec("A00");
            saves[i] = new GameSave(fileByteArray.slice(dataStart, dataStart + hexToDec("500")));
        }
    }
}

function initThumbnail() {
    document.getElementById("fileUploader").classList.remove("drop-zone--over")
    document.getElementById("fileUploader").innerHTML = "<span class=\"drop-zone__prompt\">Drop file here or click to upload</span>\
        <input type=\"file\" id=\"fileToUpload\" name=\"myFile\" class=\"drop-zone__input\">";
    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
        const dropZoneElement = inputElement.closest(".drop-zone");
        dropZoneElement.addEventListener("click", (e) => {
            inputElement.click();
        });

        inputElement.addEventListener("change", (e) => {
            if (inputElement.files.length) {
                updateThumbnail(dropZoneElement, inputElement.files[0]);
            }
        });

        dropZoneElement.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZoneElement.classList.add("drop-zone--over");
        });

        ["dragleave", "dragend"].forEach((type) => {
            dropZoneElement.addEventListener(type, (e) => {
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
        for (i = 0; i < 205; i++) {
            for (j = 0; j < 8; j++) {
                this.flags[flagCounter++] = ((data[i + hexToDec("433")] & (1 << j)) == 0) ? false : true;
            }
        }

        for (i = 0; i < 36; i++)
                this.escargoItems[i] = itemsLUT[data[i + hexToDec("76")]];
    }
    getData(){
        console.log(this);
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

        for (i = 0; i < 4; i++){
            let index = data[i + 49];
            if(index != 0){
                this.equip.push(this.items[index - 1]);
            }
            else this.equip.push("(Nothing)");
        }

        this.currHP = (data[70] << 8) + data[69];
        this.currPP = (data[76] << 8) + data[75];

        //statsBefore are the ones without counting equipment, statsAfter are the ones with the equipment
        this.statsBefore = [];
        this.statsAfter = [];
        for (i = 0; i < 7; i++) {
            this.statsAfter.push(data[21 + i]);
            this.statsBefore.push(data[28 + i]);
        }
    }
    getData() {
        console.log(this);
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

