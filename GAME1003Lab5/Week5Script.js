var deck = [];
var suitArray = ["Hearts", "Diamonds", "Clubs", "Spades"];
var faceArray = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
var msgBar = document.querySelector("#msg");

buildDeck();
shuffleDeck(5);
printDeck();
var playerHand = deals(1);
var dealerHand = deals(6);
console.log("Player total " + playerHand);
console.log("Dealer total " + dealerHand);

if (playerHand > dealerHand) {
    msgBar.innerHTML = "Player total: " + playerHand + " Dealer total: " + dealerHand + " Player wins!";
} else if (playerHand < dealerHand) {
    msgBar.innerHTML = "Player total: " + playerHand + "<tab> Dealer total: " + dealerHand + "<tab> Dealer wins!";
} else msgBar.innerHTML = "My god sirs...It seems here we gots our selves a prairie pickle, a TIE if you shall indulge ma' fancy"

function buildDeck() {
    // Build the deck...
    for (var row = 0; row < suitArray.length; row++) {
        for (var col = 0; col < faceArray.length; col++) {
            var tempCard = {};
            tempCard.suitName = suitArray[row];
            tempCard.faceName = faceArray[col];
            tempCard.offsetW = (col * -144);
            tempCard.offsetH = (row * -200);
            tempCard.pointVal = col > 8 ? 10 : (col + 1);
            deck.push(tempCard);
        }
    }
}

function shuffleDeck(numTimes) {
    for (var i = 0; i < numTimes; i++) {
        for (var j = 0; j < deck.length; j++) {
            var tempIndex = Math.floor(Math.random() * 52);
            var tempCard = deck[j];
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
    return deck.splice(0, 1)[0];
}

function deals(starts) {
    var card, el, i;
    var total = 0;
    for (i = starts; i < starts + 5; i++) {
        card = dealCards();
        el = document.getElementById("card" + i);
        el.style.background = "url('Deck.gif') " + card.offsetW + "px " + card.offsetH + "px";
        total += card.pointVal
    }
    return total;
}
