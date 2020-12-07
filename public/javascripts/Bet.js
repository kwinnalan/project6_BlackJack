"use strict"

export default class Bet {
    constructor(name) {
        this.bet = this.#getBet(name);
    }

    #getBet(name){
    this.bet = 1;//window.prompt(`${name}, Enter your bet (must be between 1 and the pot)`);
}
}
