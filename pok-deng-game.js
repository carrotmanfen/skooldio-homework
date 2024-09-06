const { createDeck, shuffle, drawCard, calculateHandValue, playRound } = require('./pok-deng-function');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let totalChips = 0;

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
        const result = playRound(bet, deck);
        if(result.message.includes('win')) {
            totalChips += bet;
        }else if(result.message.includes('lose')) {
            totalChips -= bet;
        }
        console.log(result)
        console.log(`You have total ${totalChips} chips`);
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