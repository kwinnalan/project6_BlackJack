"use strict";

class Card {
    #card = new Map();

    constructor(hasJokers) {
        this.#setCard(hasJokers);
    }

    #setCard(hasJokers) {
        const SUITS = ['CLUBS', 'DIAMONDS', 'HEARTS', 'SPADES'];
        const RANKS = ['ACE', 'DEUCE', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'JACK', 'QUEEN', 'KING'];
        const JOKER_RANKS = ['ACE', 'DEUCE', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'JACK', 'QUEEN', 'KING', 'JOKER1', 'JOKER2'];
        let suit = Math.floor((Math.random() * SUITS.length));
        let rank;
        if (hasJokers) {
            rank = Math.floor((Math.random() * JOKER_RANKS.length));
        } else {
            rank = Math.floor((Math.random() * RANKS.length));
        }
        let value = Number(`${rank + 1}.${suit + 1}`);
        this.#card.set('suit', SUITS[suit]).set('rank', RANKS[rank]).set('value', value);
    }

    getCard() {
        return this.#card;
    }
}

module.exports = Card;