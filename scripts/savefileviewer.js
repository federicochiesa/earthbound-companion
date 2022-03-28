Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

window.onload = function () {
    showSurveyToast();
    initThumbnail(false);
}

function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
    document.getElementById("fileUploader").classList.add("drop-zone--over")

    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        thumbnailElement.innerText = "Uploaded file: " + file.name;
        dropZoneElement.appendChild(thumbnailElement);
    }
    var old_element = document.getElementById("fileUploader");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);

    document.getElementById("fileToUpload").remove();
    document.getElementById("fileUploader").style.cursor = "auto";
    var reader = new FileReader();
    reader.onload = function () {
        console.log(reader.result);
      }
    reader.readAsBinaryString(file);


}

function initThumbnail(){
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