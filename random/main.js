var worker = new Worker('worker.js');
worker.addEventListener('message', function(e) {
    document.getElementById("randomPassResult").innerText = e.data;
});

function randomPassGen() {
    let PassLen = document.getElementById("randomPassLen").value;
    worker.postMessage(PassLen);
}

function getRandom(min, max) {
    let min1 = parseInt(min);
    let max1 = parseInt(max)+1;
    let num = Math.random() * (max1 - min1) + min1;

    return Math.floor(num);
};
function randomNumGen() {
    let randomNumMin = parseInt(document.getElementById("randomNumMin").value);
    let randomNumMax = parseInt(document.getElementById("randomNumMax").value)+1;
    let result = getRandom(randomNumMin, randomNumMax);
    document.getElementById("randomNumResult").innerText = result;
}