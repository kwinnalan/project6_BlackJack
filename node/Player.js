"use strict";
const PROMPT = require('readline-sync');

class Player {

    constructor() {
        let name, coins;

        this.#getName(name);
        this.#getCoins(coins);

        this.name = name;
        this.coins = coins;
console.log('player created');
    }

    #getName(name){
        name = PROMPT.question (`\nPlayer, please enter you'r name: `);
        return name;
    }

    #getCoins(coins){
        coins = PROMPT.question (`Player, enter how many coins: `);
        return coins;
    }
    takeCoins(numCoins){
        this.coins = (this.coins - numCoins);
    }

}

module.exports = Player;