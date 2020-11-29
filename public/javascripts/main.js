
/**
 *   @author Danforth, Kwinn (kdanforth@student.ncmich.edu)
 *   @version 0.0.2
 *   @summary Program to play the In Between card game || created: 11.22.2020
 *   @todo Nothing
 */
"use strict";

const GAME_ENVIROMENT = require('../../node/GameEnviroment.js');


class Main {

    constructor(numDecks, hasJokers) {
        new GAME_ENVIROMENT(numDecks, hasJokers);
    }
}

{
    new Main(1, false);
}



