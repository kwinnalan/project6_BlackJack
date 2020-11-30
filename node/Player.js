"use strict";
const PROMPT = require('readline-sync');

const CARD = require('./Card.js');

class Player {

    constructor() {
        this.name = this.#getName();
        this.coins = this.#getCoins();
        this.startCoins = this.coins;
        this.startCard = new CARD(false).getCard();
        this.startCard = this.startCard.get('value');
        this.currPlayer = false;
console.log(`player created! `);
        console.log(`Card for whoGoesFirst: ${this.startCard}`);
    }

    #getName(){
        let name;
        name = Player;
            //name = PROMPT.question (`\nPlayer, please enter you'r name: `);
        return name;
    }

    #getCoins(){
        let coins;
        let input;
        do{
            input=10;
            //input = PROMPT.question(`Player, enter how many coins (must be between 5 and 1,000): `);
            coins = parseInt(input);
        }while(coins < 5 || coins > 1000 || isNaN(input));
        return coins;
    }
    takeCoins(numCoins){
        this.coins = (this.coins - numCoins);
    }

}

module.exports = Player;