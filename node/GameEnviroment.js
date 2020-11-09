"use strict";

const DECK = require('../node/Deck');
const PLAYER = require('../node/Player');
const SAVE = require('../node/data/SaveData.js');


class GameEnviroment {
    #deck = [];
    #board = [];
    #players = [];


    constructor(numDecks, hasJokers) {
            this.#createDeck(numDecks, hasJokers);
            this.#setPlayers();
        while(this.#deck.length > 4){
            console.log(this.#deck.length);
            this.#setBoard();
            this.#dealCard();
            // this.#dealCards();
            // this.#play();
            //this.#displayGameData();
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
        const NUM_PLAYERS = 2;
        for (let i = 0; i < NUM_PLAYERS; i++) {
            this.#players.push(new PLAYER());
        }
    }

    #setBoard() {
        console.log(this.#deck);
        for (let i = 0; i < 2; i++) {
            this.#board[i] = (this.#deck[0].shift());
        }
        console.log(this.#board);
        console.log(this.#deck);
    }


    #dealCard() {
        let card = (this.#deck[0].shift());
        let win;

        if (this.#board[0].get('value') === this.#board[1].get('value')) {
            win = 3;
        }else if(this.#board[0].get('value') === card || this.#board[1].get('value') === card){
            win = 0;
        } else if (this.#board[0].get('value') > this.#board[1].get('value') && card > this.#board[1].get('value') && card <  this.#board[0].get('value')) {
            win = 1;
        } else if (this.#board[1].get('value') > this.#board[0].get('value') && card > this.#board[0].get('value') && card <  this.#board[1].get('value')) {
            win = 1;
        }else{
            win = 0;
        }
        console.log('c:', card, 'b:', this.#board, 'w', win);
    }




    // #dealCard() {
    //
    //         this.#board[i].setBoard(this.#deck[0].shift());
    //     }
    // }
    // }
    // async #play() {
    //
    //
    //
    // }

    // #displayGameData() {
    //     SAVE.readGameData();
    // }
//}
}
module.exports = GameEnviroment;