async function getData(type) {
    let data = await fetch('../../data/' + type + '.json');
    data = data.json();
    return data;
}

window.onload = async function () {
    showSurveyToast();
    let data = await getData("stats");
    let list = document.getElementById("dataList");
}