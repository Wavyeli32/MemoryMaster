// Variables
const gameBoard = document.getElementById('game-board');
const cardValues = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D'];
let flippedCards = [];
let matchedPairs = 0;

// Shuffle cards (simple example)
cardValues.sort(() => 0.5 - Math.random());

// Generate Cards
cardValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

// Flip Card Function
function flipCard() {
    const card = this;
    card.textContent = card.dataset.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Check for Match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cardValues.length / 2) {
            alert("You win!");
        }
    } else {
        setTimeout(() => {
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}
