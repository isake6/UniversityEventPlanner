function getDateTime() {
    var now = new Date();
    var datetimeElement = document.getElementById('datetime');
    datetimeElement.innerHTML = now.toLocaleString();
}
// call the `updateDateTime` function every second
setInterval(getDateTime, 1);



