"use strict";

import CARD from './Card.js';

export default class Player {

    constructor() {
       this.#getPlayerInfo();
    }
    async #getPlayerInfo(){
        this.name = await this.#getName();
        this.coins = this.#getCoins();
        this.startCoins = this.coins;
        this.startCard = new CARD(false).getCard();
        this.startCard = this.startCard.get('value');
        this.currPlayer = false;
        console.log(`player ${this.name} created! `);
        console.log(`Card for whoGoesFirst: ${this.startCard}`);
    }

        #getName() {
            let name;
            let input = 'Player';
            // document.getElementById('').addEventListener("click",function () {
            //     input = document.getElementById('betCoins').value;
            //     console.log("inside promise.." + input);
            name = input;
            return name;
        }



         #getCoins(){
            let coins;
            let input;
            do {
            input = 10;//prompt("Enter the number of coins (5-1000)");
                //input = PROMPT.question(`Player, enter how many coins (must be between 5 and 1,000): `);
            coins = parseInt(input);
            } while (coins < 5 || coins > 1000 || isNaN(input));
            return coins;
        }

        takeCoins(numCoins){
            this.coins = (this.coins - numCoins);
        }
    }

