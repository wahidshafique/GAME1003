var deck = [];	// The main deck array.
var suitArray = ["Hearts", "Diamonds", "Clubs", "Spades"];
var faceArray = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

buildDeck();
shuffleDeck(5);
printDeck();

var playerHand = [deals(1), deals(2)];
var dealerHand = deals(3);

//BUTTON TOGGLE & PLAYCARD
var button = document.querySelector("#playCard");
var button2 = document.querySelector("#playCard2");
var card1 = document.querySelector("#card1");
var card2 = document.querySelector("#card2");
card1.addEventListener("click", clickHandler);
card2.addEventListener("click", clickHandler2);
var toggled = false;
clickEnabler = true;
clickEnabler2 = true;

function clickHandler() {
    if (clickEnabler == true) {
        toggled = !toggled;
        card1.style.border = toggled ? "4px solid red" : "";
        button.style.visibility = toggled ? "visible" : "hidden";
        if (toggled) clickEnabler2 = false;
        else clickEnabler2 = true;
    }
}
function clickHandler2() {
    if (clickEnabler2 == true) {
        toggled = !toggled;
        card2.style.border = toggled ? "4px solid red" : "";
        button2.style.visibility = toggled ? "visible" : "hidden";
        if (toggled) clickEnabler = false;
        else clickEnabler = true;

    }
}

button.addEventListener("click", function () { playMyCard(1) });
button2.addEventListener("click", function () { playMyCard(2); });

var message = document.getElementsByTagName("span");
var playerWinsCount = 0;
var dealerWinsCount = 0;

function playMyCard(index) {
    var card = playerHand[index - 1];
    if (card > dealerHand) {
        winMsg.textContent = "Player wins!";
        playerWins.textContent = ++playerWinsCount;
        hit = document.getElementById("hit");
        hit.load();
        hit.play();
        hit.volume = 0.7;

    } else {
        winMsg.textContent = "Dealer wins!";
        dealerWins.textContent = ++dealerWinsCount;
        miss = document.getElementById("miss");
        miss.load();
        miss.play();
        miss.playbackRate = 2;
        miss.volume = 0.7
    }

    var stageEnd = document.querySelector(".stageEnd");
    var endMessage = document.getElementById("endMessage");
    var endWinSound = document.getElementById("end-win");
    var endLoseSound = document.getElementById("end-lose");

    if (playerWinsCount + dealerWinsCount >= 26) {
        stageEnd.style.visibility = "initial";
        if (playerWinsCount < dealerWinsCount) {
            endMessage.innerHTML = "You Lose!";
            endLoseSound.play();
            endLoseSound.volume = 0.4;
        }
        else if (playerWinsCount >= dealerWinsCount) {
            endMessage.innerHTML = "You Win!";
            document.getElementById("endGif").src = "images/giphy.gif"
            endWinSound.play();
            endWinSound.volume = 0.4;
        }
    } else {
        dealerHand = deals(3);
        playerHand[index - 1] = deals(index);
    }
}



function buildDeck() {
    // Create a temporary variable for a card object.
    var tempCard;
    // Build the deck...
    for (var row = 0; row < suitArray.length; row++) {
        for (var col = 0; col < faceArray.length; col++) {
            tempCard = {};
            tempCard.suitName = suitArray[row];
            tempCard.faceName = faceArray[col];
            tempCard.offsetW = (col * -144);
            tempCard.offsetH = (row * -200);
            tempCard.pointVal = col + 1; // Cards now have a unique point value from 2-14.
            deck.push(tempCard);
        }
    }
}

function shuffleDeck(numTimes) {
    // Create temporary variables.
    var tempIndex;
    var tempCard;

    for (var i = 0; i < numTimes; i++) {
        for (var j = 0; j < deck.length; j++) {
            do 	// This do...while loop will ensure that the random index stored into tempIndex does not equal the current j value for the iteration of the loop. So the card doesn't get swapped with itself.
            {
                tempIndex = Math.floor(Math.random() * deck.length);
            } while (tempIndex == j);
            // Swap two card objects in deck[]...
            tempCard = deck[j];
            deck[j] = deck[tempIndex];
            deck[tempIndex] = tempCard;
        }
    }
}

function printDeck() {
    for (var i = 0; i < deck.length; i++) {
        console.log(deck[i].faceName + " of " + deck[i].suitName + " (" + deck[i].pointVal + ")");
    }
}

function dealCards() {
    // Remove a card from the front of the deck and return it from the function.
    return deck.splice(0, 1)[0];
}

function deals(starts) {
    var card, el;
    var total = 0;
    card = dealCards();
    el = document.getElementById("card" + starts);

    // Spaghetti code FTW!
    if (!card) {
        var id = el.id === "card1" ? "card2" : "card1";
        id === "card1" ? button2.style.display = "none" : button.style.display = "none";
        el.click(); // unselect self
        document.getElementById(id).click(); // select other
        el.parentElement.removeChild(el); // remove self
        return;
    }

    el.style.background = "url('images/Deck.gif') " + card.offsetW + "px " + card.offsetH + "px";
    total += card.pointVal
    return total;
}

var chuck = document.getElementById("chuck");
chuck.volume = 0.04;

var playClick = document.querySelector(".btn1");
var begin = document.getElementById("begin");
playClick.addEventListener("click", mainClicker);

function mainClicker() {
    var stageMenu = document.querySelector(".stageMenu")
    stageMenu.style.display = "none";

    begin.volume = 0.4;
    begin.playbackRate = 1.5;
    begin.play();
}

var audioButton = document.getElementById("audio-icon");
audioButton.addEventListener("click", clickHandler1);
function clickHandler1() {
    if (!toggled) {
        toggled = true;
        chuck.pause();
        audioButton.src = "images/no_sound.png";
    } else {
        chuck.play();
        audioButton.src = "images/sound.png";
        toggled = false;
    }
};
