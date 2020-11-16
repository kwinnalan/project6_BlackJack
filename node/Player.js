"use strict";
const PROMPT = require('readline-sync');

const CARD = require('./Card.js');

class Player {

    constructor() {
        this.name = this.#getName();
        this.coins = this.#getCoins();
        this.startCard = new CARD(false).getCard();
        this.startCard = this.startCard.get('value');
        this.currPlayer = false;
console.log('player created');
    }

    #getName(){
        let name;
        name = PROMPT.question (`\nPlayer, please enter you'r name: `);
        return name;
    }

    #getCoins(){
        let coins;
        coins = PROMPT.question (`Player, enter how many coins: `);
        return coins;
    }
    takeCoins(numCoins){
        this.coins = (this.coins - numCoins);
    }

}

module.exports = Player;