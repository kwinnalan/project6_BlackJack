"use strict";

const GAME_ENVIROMENT = require('../node/GameEnviroment.js');

class Pot {

    constructor(numPlayers) {
        this.pot = 0;
        for(let i = 0; i < numPlayers; i++){
            GAME_ENVIROMENT.players[i].coins = GAME_ENVIROMENT.players[i].coins - 1;
            this.pot = this.pot + 1;
        }
        console.log(`POT: ${this.pot}`);
    }
}

module.exports = Pot;