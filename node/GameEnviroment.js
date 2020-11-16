"use strict";

const DECK = require('../node/Deck.js');
const PLAYER = require('../node/Player.js');
const PROMPT = require('readline-sync');

const NUM_PLAYERS = 3;

class GameEnviroment {
    #deck = [];
    #board = [];
    #players = [];
    #pot = 0;
    #currBet = 0;
    #card;

    constructor(numDecks, hasJokers) {
        this.#setPlayers();
        this.#createPot();
        this.#whoGosFirst();
        this.#createDeck(numDecks, hasJokers);

        while (this.#deck[0].length > 3) {
            this.#setBoard();
            this.#displayBoard();
            this.#padPot();
            this.#displayPot();
            this.#bet();
            this.#deal();
            let win = this.#calcWin()
            this.#displayCards();
            this.#settleUp(win);
            this.#nextPlayer();
            this.#displayGameData();
        }
    }

    #createDeck(numDecks, hasJokers) {
        this.#deck = new DECK(numDecks, hasJokers).getDeck();
        let count = 1;
        for (let i = 0; i < numDecks; i++) {
            for (let card of this.#deck[i]) {
                card.set('value', Math.trunc(card.get('value'))); //convert decimal number to int
                let cardValue = card.get('value');
                let cardText = card.get('rank') + " of " + card.get('suit');
                // console.log(`Card ${count} value = ${cardValue}, Card = ${cardText}`);
                count++;
            }
        }
    }

    #setPlayers() {
        for (let i = 0; i < NUM_PLAYERS; i++) {
            this.#players.push(new PLAYER());
        }
    }

    #createPot() {
        for (let i = 0; i < this.#players.length; i++) {
            this.#players[i].takeCoins(1);
            this.#pot = this.#pot + 1;
        }
    }

    #whoGosFirst() {
        let array = [];

        for (let i = 0; i < NUM_PLAYERS; i++) {
            array.push(this.#players[i].startCard);
        }
        for (let i = 0; i < NUM_PLAYERS; i++) {
            if (this.#players[i].startCard === (Math.max(...array))) {
                this.#players[i].currPlayer = true;
            }
        }
        console.log(this.#players);
    }

    #setBoard() {
        for (let i = 0; i < 2; i++) {
            this.#board[i] = (this.#deck[0].shift());
        }
    }

    #displayBoard() {
        for (let i = 0; i < 2; i++) {
            console.log(this.#board[i]);
        }
    }

    #displayPot() {
        console.log(`POT= ${this.#pot}`);
    }

    #padPot() {
        if (this.#pot < 1) {
            this.#createPot();
        }
    }

    #bet() {
        let input;
        for (let i = 0; i < NUM_PLAYERS; i++) {
            if (this.#players[i].currPlayer === true) {
                input = (PROMPT.question(`Player ${this.#players[i].name}, enter how many coins to bet (must be between 1 and the total Pot): `));
                this.#currBet = parseInt(input);
            }
        }
    }

    #deal() {
        this.#card = this.#deck[0].shift();
    }

    #calcWin() {
        let win;

        if (this.#board[0].get('value') === this.#board[1].get('value')) {
            win = 3;
        } else if (this.#board[0].get('value') === this.#card.get('value') || this.#board[1].get('value') === this.#card.get('value')) {
            win = 0;
        } else if (this.#board[0].get('value') > this.#board[1].get('value') && this.#card.get('value') > this.#board[1].get('value') && this.#card.get('value') < this.#board[0].get('value')) {
            win = 2;
        } else if (this.#board[1].get('value') > this.#board[0].get('value') && this.#card.get('value') > this.#board[0].get('value') && this.#card.get('value') < this.#board[1].get('value')) {
            win = 2;
        } else {
            win = 0;
        }
        return win;
    }

    #displayCards() {
        for (let i = 0; i < NUM_PLAYERS; i++) {
            if (this.#players[i].currPlayer === true) {
                console.log(`\n${this.#players[i].name}'s card: `);
                console.log(this.#card);
                console.log('Must be inBetween: ');
                this.#displayBoard();
            }
        }
    }

    #settleUp(win) {
        let winAmt;
        for (let i = 0; i < NUM_PLAYERS; i++) {
            if (this.#players[i].currPlayer === true) {
                this.#players[i].takeCoins(this.#currBet);
                this.#pot = this.#pot + this.#currBet;
                winAmt = this.#currBet * win;
                this.#players[i].coins = this.#players[i].coins + winAmt;
                this.#pot = this.#pot - winAmt;
            }
        }
    }

    #nextPlayer() {
        for (let i = 0; i < NUM_PLAYERS; i++) {
            if (this.#players[i].currPlayer === true) {
                this.#players[i].currPlayer = false;
                if (i === 2) {
                    this.#players[0].currPlayer = true;
                    i = 3;
                } else {
                    this.#players[i + 1].currPlayer = true;
                    i = 3;
                }
            }
        }
    }

    #displayGameData() {
        console.log(this.#players)
    }
}
module.exports = GameEnviroment;