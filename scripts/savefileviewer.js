window.onload = function () {
    showSurveyToast();
    let myDropzone = new Dropzone("div#fileUpload", { url: "/file/post" });
}