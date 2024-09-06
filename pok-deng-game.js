const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let totalChips = 0;

function createDeck() {
    const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    const card = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 1];
    const deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push({ card: suits[i] + "-" + card[j], value: values[j] });
        }
    }
    console.log('...Deck created...');
    return deck;
}

function shuffle(array) {
    console.log('...Shuffling cards...');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function drawCard(deck) {
    return deck.pop();
}

function calculateHandValue(cards) {
    const total = cards.reduce((total, card) => total + card.value, 0);
    return total % 10;
}

function playRound(bet, deck) {
    shuffle(deck);
    const playerCards = [];
    const dealerCards = [];

    const totalEachPlayerCards = 2;
    console.log('...Drawing cards...');
    for (let i = 0; i < totalEachPlayerCards; i++) {
        playerCards.push(drawCard(deck));
        dealerCards.push(drawCard(deck));
    }

    const playerHandValue = calculateHandValue(playerCards);
    const dealerHandValue = calculateHandValue(dealerCards);
    console.log(`You got ${playerCards.map(card => card.card).join(', ')} with total value of ${playerHandValue}`);
    console.log(`The dealer got ${dealerCards.map(card => card.card).join(', ')} with total value of ${dealerHandValue}`);
    if (playerHandValue > dealerHandValue) {
        console.log(`You win ${bet} chips`);
        totalChips += bet;
    } else if (playerHandValue < dealerHandValue) {
        console.log(`You lose ${bet} chips`);
        totalChips -= bet;
    } else {
        console.log("Tie");
    }

    deck.push(...playerCards);
    deck.push(...dealerCards);
    console.log(`...Return cards to Deck...`);
}

function startGame(deck) {
    rl.question('Please put your bet: ', (betInput) => {
        const checkDecimal = betInput.split('.');
        if (checkDecimal.length > 1) {
            console.log('Invalid bet. Please enter a positive integer number.');
            return startGame(deck);
        }
        const bet = Number(betInput);

        if (isNaN(bet) || bet <= 0) {
            console.log('Invalid bet. Please enter a positive integer number.');
            return startGame(deck);
        }
        console.log(`You bet ${bet} chips`);
        playRound(bet, deck);

        rl.question('Wanna play more (Yes/No)? ', (answer) => {
            if (answer.toLowerCase() === 'yes'|| answer.toLowerCase() === 'y') {
                startGame(deck);
            } else {
                console.log(`You got total ${totalChips} chips`);
                rl.close();
            }
        });
    });
}

console.log('---Welcome to Pok Deng Game---');
const deck = createDeck();
startGame(deck);