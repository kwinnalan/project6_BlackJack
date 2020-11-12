"use strict";

class Player {

    constructor(name, coins) {
console.log('player created');
this.name = name;
this.coins = coins;
    }
    takeCoins(numCoins){
        this.coins = (this.coins - numCoins);
    }

}

module.exports = Player;