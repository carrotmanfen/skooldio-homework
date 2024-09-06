const { createDeck, shuffle, drawCard, calculateHandValue, playRound } = require('./pok-deng-function');

describe('Pok Deng Game', () => {
    test('should create a deck with 52 cards', () => {
      const deck = createDeck();
      expect(deck).toHaveLength(52);
    });
  
    test('should shuffle the deck and change the order of cards', () => {
      const deck = createDeck();
      const originalDeck = [...deck];
      shuffle(deck);
      expect(deck).not.toEqual(originalDeck); // Deck order should change after shuffling
      expect(deck).toHaveLength(52); // Deck length should remain the same
    });
  
    test('should draw a card from the deck', () => {
      const deck = createDeck();
      const initialDeckLength = deck.length;
      const card = drawCard(deck);
      expect(card).toBeDefined();
      expect(deck).toHaveLength(initialDeckLength - 1);
    });
  
    test('should calculate hand value correctly', () => {
      const cards = [{ card: 'Hearts-2', value: 2 }, { card: 'Diamonds-3', value: 3 }];
      const handValue = calculateHandValue(cards);
      expect(handValue).toBe(5);
    });
  
    test('should return correct game result based on hand values', () => {
      const deck = createDeck();
      shuffle(deck);
      const bet = 10;
      const result = playRound(bet, deck);
  
      expect(result.playerCards).toHaveLength(2);
      expect(result.dealerCards).toHaveLength(2);
      expect(result.playerHandValue).toBeGreaterThanOrEqual(0);
      expect(result.dealerHandValue).toBeGreaterThanOrEqual(0);
  
      if (result.playerHandValue > result.dealerHandValue) {
        expect(result.message).toBe(`You win ${bet} chips`);
      } else if (result.playerHandValue < result.dealerHandValue) {
        expect(result.message).toBe(`You lose ${bet} chips`);
      } else {
        expect(result.message).toBe('Tie');
      }
    });
  });