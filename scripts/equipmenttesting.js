window.onload = async function () {
    showSurveyToast();
    let data = await getData("stats");
    let list = document.getElementById("dataList");
}