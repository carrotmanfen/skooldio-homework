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
    
    const result = {
      playerCards,
      dealerCards,
      playerHandValue,
      dealerHandValue,
      bet,
    };
  
    if (playerHandValue > dealerHandValue) {
      result.message = `You win ${bet} chips`;
    } else if (playerHandValue < dealerHandValue) {
      result.message = `You lose ${bet} chips`;
    } else {
      result.message = "Tie";
    }
  
    deck.push(...playerCards, ...dealerCards); 
    return result;
  }

module.exports = {
    createDeck,
    shuffle,
    drawCard,
    calculateHandValue,
    playRound,
  };