var button = document.querySelector("button");
button.addEventListener("click", clickHandler);
button.style.cursor = "pointer";
var input = document.querySelector("#input");
var output = document.querySelector("#output");
var toggled = false;
var randomNumber = Math.floor(Math.random() * 100);
var tries = document.querySelector("#tries");
var triesdec = 4;
var gamewon = false;
console.log(randomNumber);

window.addEventListener("keydown", keydownHandler);

function keydownHandler(event) {
    if (event.keyCode === 13) clickHandler();
}
function clickHandler() {
    var value = parseInt(input.value);
    if (isNaN(value)) {
      output.innerHTML = "That's not a number..."
    } else {
      playGame(value);
    }
}

function playGame(value) {
    var cookieLine = document.querySelector("#cookieline");
    var body = document.querySelector("body");

    if (value < randomNumber) {
        value += " is less than the guessed number";
    } else if (value > randomNumber) {
        value += " is more than the guessed number";
    } else  {
        value += " is exactly it me boy! have a line of perfectly normal, unmolested cookies!";
        output.style.backgroundColor = "white";
        output.style.fontWeight = "bold";
        cookieLine.style.backgroundImage = "url('http://www.recipebits.com/media/food-icons/cookie-icon.jpg')";
        cookieLine.style.height = "64px";
        button.removeEventListener("click", clickHandler);
        window.removeEventListener("keydown", keydownHandler);
        gamewon = true;
    }

    output.innerHTML = value;

    tries.innerHTML = triesdec--;

    if (triesdec === -1 && gamewon === false) {
        cookieLine.innerHTML = "You lose (...and you suck";
        button.removeEventListener("click", clickHandler);
        window.removeEventListener("keydown", keydownHandler);
        output.parentNode.removeChild(output);
    }

    toggled = !toggled;
    body.style.backgroundColor = toggled ? "lightblue" : "white";
}
