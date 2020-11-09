"use strict";

const CARD = require('./Card.js');

class Deck {
    #deck = [];

    constructor(numDecks, hasJokers) {
        this.#setDeck(numDecks, hasJokers);
    }

    #setDeck(numDecks, hasJokers) {
        const MAX_DECK_SIZE = 52, JOKERS_MAX_DECK_SIZE = 54;
        let deckSize;
        if (hasJokers) {
            deckSize = JOKERS_MAX_DECK_SIZE;
        } else {
            deckSize = MAX_DECK_SIZE;
        }
        for (let i = 0; i < numDecks; i++) {
            let cardExists;
            let count = 0;
            this.#deck[i] = [];
            while (count < deckSize) {
                cardExists = true;
                while (cardExists) {
                    cardExists = false;
                    let tempCard = new CARD(false).getCard();
                    for (let card of this.#deck[i]) {
                        if (tempCard.get('value') === card.get('value')) {
                            cardExists = true;
                            break;
                        }
                    }
                    if (! cardExists) {
                        this.#deck[i].push(tempCard);
                        count++;
                    }
                }
            }
        }
    }

    getDeck() {
        return this.#deck;
    }
}

module.exports = Deck;