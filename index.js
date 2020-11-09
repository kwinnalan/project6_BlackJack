
/**
 *   @author Danforth, Kwinn (kdanforth@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Program to play the In Between card game || created: 10.22.2020
 *   @todo Nothing
 */
"use strict";

const GAME_ENVIROMENT = require('./node/GameEnviroment.js');

class Main {

    constructor(numDecks, hasJokers) {
        new GAME_ENVIROMENT(numDecks, hasJokers);
    }
}

{
    new Main(1, false);
}



