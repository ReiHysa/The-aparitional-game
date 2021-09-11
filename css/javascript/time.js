var today = new Date();
var hourNow = today.getHours();

if (hourNow > 18) {
    document.querySelector('body').style.backgroundColor = '#221d2b'
} else if (hourNow > 12) {
    document.querySelector('body').style.backgroundColor = '#0b57ba'
} else if (hourNow > 0) {
    document.querySelector('body').style.backgroundColor = 'blanchedalmond'
} else {
    document.querySelector('body').style.backgroundColor = 'blanchedalmond'
}
