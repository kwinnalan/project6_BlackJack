"use strict";

import DECK from './Deck.js';
import PLAYER from './Player.js';

const NUM_PLAYERS = 3;

export default class GameEnviroment {


    constructor(numDecks, hasJokers) {
        this.gamePlay(numDecks, hasJokers);
    }

   async gamePlay(numDecks, hasJokers) {

       const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
       

       while (this.#checkGo() === true) {
            this.#padPot();
            this.#displayAllBacks();
            this.#quitOrBet();
            this.#displayGameData();
            this.#setBoard();
            this.#checkBoard();
            this.#displayBoard();
            this.#displayPot();
            await this.getUserBetInput();
            this.#deal();
            let win = this.#calcWin();
            this.#displayCards();
            this.#settleUp(win);
           this.#displayGameData();
            await wait(3000);
            this.#nextPlayer();
            this.#displayGameData();
            this.#newDeck();
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

    setPlayers() {
       document.getElementById(`playerInputs`).style = "dislay: block";
        for(let i = 0; i < NUM_PLAYERS; i++) {
            this.players.push(new PLAYER());
            //console.log(`Player ${i} created`);

            // if(i === 0) {
            //    // document.getElementById("progressBar").style = "width: 33%";
            // }else if (i === 1){
            //     //document.getElementById("progressBar").style = "width: 66%";
            // }else{
            //    // document.getElementById("progressBar").style = "width: 99%";
            // }
        }
       document.getElementById('playerInputs').style = "display: none";
    }
    #displayAllBacks(){
        document.getElementById('boardCard1').src = `/public/images/cards/cardBack.png`;
        document.getElementById('boardCard2').src = `/public/images/cards/cardBack.png`;
        document.getElementById('yourCard').src = `/public/images/cards/cardBack.png`;
    }
    #createPot() {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].coins > 0) {
                this.players[i].takeCoins(1);
                this.#pot = this.#pot + 1;
            }
        }
    }

    #whoGosFirst() {
        let array = [];

        for (let i = 0; i < NUM_PLAYERS; i++) {
            array.push(this.players[i].startCard);
        }
        for (let i = 0; i < NUM_PLAYERS; i++) {
            if (this.players[i].startCard === (Math.max(...array))) {
                this.players[i].currPlayer = true;
            }
        }
    }

    #setBoard() {
        for (let i = 0; i < 2; i++) {
            this.#board[i] = (this.#deck[0].shift());
        }
    }

    #checkBoard() {
        if (this.#board[0].get('value') === this.#board[1].get('value')) {
            this.#displayBoard();
            console.log(`Congrats! Matching Board gets you 2 coins`);
            for (let i = 0; i < NUM_PLAYERS; i++) {
                if (this.players[i].currPlayer === true) {
                    this.players[i].coins = this.players[i].coins + 2;
                    this.#pot = this.#pot - 2;
                }
            }
            this.#nextPlayer();
            this.#padPot();
            this.#quitOrBet();
            this.#setBoard();
            this.#displayGameData()
        } else if (this.#board[0].get('value') === (this.#board[1].get('value')) - 1 || this.#board[0].get('value') === (this.#board[1].get('value')) + 1) {
            this.#displayBoard();
            console.log(`Sorry, Consecutive cards on the board looses you a coin to the Pot`);
            for (let i = 0; i < NUM_PLAYERS; i++) {
                if (this.players[i].currPlayer === true) {
                    this.players[i].takeCoins(1);
                    this.#pot = this.#pot + 1;
                }
            }
            this.#nextPlayer();
            this.#padPot();
            this.#quitOrBet();
            this.#setBoard();
            this.#displayGameData()
        }
    }

    #displayBoard() {
        document.getElementById('boardCard1').src = `/public/images/cards/${this.#board[0].get("rank")}${this.#board[0].get("suit")}.png`;
        document.getElementById('boardCard2').src = `/public/images/cards/${this.#board[1].get("rank")}${this.#board[1].get("suit")}.png`;
        document.getElementById('yourCard').src = `/public/images/cards/cardBack.png`;
        for (let i = 0; i < 2; i++) {
            console.log(this.#board[i]);
            console.log(`/public/images/cards/${this.#board[0].get("rank")}${this.#board[0].get("suit")}.png`);
        }
    }

    #displayPot() {
        console.log(`POT= ${this.#pot}`);
       document.getElementById("greenCardTextBottom").innerText = `Pot = ${this.#pot}`;
    }

    #padPot() {
        if (this.#pot <= 2) {
            console.log(`The pot is too low...`);
            this.#createPot();
            console.log(`The pot has been refilled`);
            this.#displayGameData();
        }
    }

    #quitOrBet() {
        document.getElementById(`enterBet`).style = "display: none"
        document.getElementById(`betOrQuit`).style = "display: block";
        for (let i = 0; i < NUM_PLAYERS; i++) {
            if (this.players[i].currPlayer === true && this.#round > 2) {
                let input;
                input = 1;//(PROMPT.question(`\nPlayer ${this.#players[i].name}, would you like to continue and bet or quit? (enter q to quit or any other key to continue): `));
                if (input === 'q' || input === 'Q') {
                    this.players[i].leftWith = this.players[i].coins;
                    this.players[i].coins = 0;
                    this.#nextPlayer();
                    this.#displayGameData();
                    if (this.#checkGo() === true) {
                        this.#quitOrBet();
                        return;
                    } else {
                        this.#endGame();
                    }
                }
            }
        }
    }

       bet(input) {
        console.log(input+"....");
        let betGood = 0;

        while (betGood !== 1) {
            for (let i = 0; i < NUM_PLAYERS; i++) {
                if (this.players[i].currPlayer === true) {
                    this.betInput = input;    //prompt(`${this.#players[i].name}, Enter your bet (must be between 1 and the pot)`);
                    this.#currBet = parseInt(input);
                    if (this.#currBet <= this.#pot && this.#currBet <= this.players[i].coins && this.#currBet > 0) {
                        betGood = 1;
                        if (this.#currBet === this.#pot) {
                            console.log(`You Bet The Pot! \nGood Luck!!`);
                            this.players[i].leftWith = 0;
                        } else if (this.#currBet === 1 && this.players[i].coins < 2) {
                            this.players[i].leftWith = 0;
                        }
                    } else if (this.players[i].coins < this.#currBet) {
                        console.log(`${this.players[i].name} You Do Not Have Enough Coins! Try Again."`);
                    } else {
                        console.log("Bet must be between 1 and the Pot. Try again.");
                    }
                }
            }
        }
        return this.#currBet;
    }

    #deal() {
        this.#card = this.#deck[0].shift();
    }

    #calcWin() {
        let win;

        if (this.#board[0].get('value') === this.#card.get('value') || this.#board[1].get('value') === this.#card.get('value')) {
            win = 0;
        } else if (this.#board[0].get('value') > this.#board[1].get('value') && this.#card.get('value') > this.#board[1].get('value') && this.#card.get('value') < this.#board[0].get('value')) {
            win = 2;
        } else if (this.#board[1].get('value') > this.#board[0].get('value') && this.#card.get('value') > this.#board[0].get('value') && this.#card.get('value') < this.#board[1].get('value')) {
            win = 2;
        } else {
            win = 0;
        }
        return win;
    }

    #displayCards() {
        document.getElementById('yourCard').src = `/public/images/cards/${this.#card.get("rank")}${this.#card.get("suit")}.png`;
        document.getElementById('boardCard1').src = `/public/images/cards/${this.#board[0].get("rank")}${this.#board[0].get("suit")}.png`;
        document.getElementById('boardCard2').src = `/public/images/cards/${this.#board[1].get("rank")}${this.#board[1].get("suit")}.png`;

            for (let i = 0; i < NUM_PLAYERS; i++) {
                if (this.players[i].currPlayer === true) {
                    console.log(`\n${this.players[i].name}'s card: `);
                    console.log(this.#card);
                    console.log('Must be inBetween: ');
                    //this.#displayBoard();
                }
            }
    }

    #settleUp(win) {
        let winAmt;
        for (let i = 0; i < NUM_PLAYERS; i++) {
            if (this.players[i].currPlayer === true) {
                this.players[i].takeCoins(this.#currBet);
                this.#pot = this.#pot + this.#currBet;
                winAmt = this.#currBet * win;
                this.players[i].coins = this.players[i].coins + winAmt;
                this.#pot = this.#pot - winAmt;
            }
        }
    }

    #nextPlayer() {
        for (let i = 0; i < NUM_PLAYERS; i++) {
            if (this.players[i].currPlayer === true) {
                this.players[i].currPlayer = false;
                this.#round = this.#round + (1 / NUM_PLAYERS);
                if (i === this.players.length - 1) {
                    this.players[0].currPlayer = true;
                    i = NUM_PLAYERS;
                } else {
                    this.players[i + 1].currPlayer = true;
                    i = NUM_PLAYERS;
                }
            }
        }
        for (let i = 0; i < NUM_PLAYERS; i++) {
            if (this.players[i].currPlayer === true && this.players[i].coins < 1) {
                this.#nextPlayer();
            }
        }
    }

    #displayGameData() {
        for (let i = 0; i < NUM_PLAYERS; i++) {
            if (this.players[i].coins > 0) {
                console.log(`\n${i} started with ${this.players[i].startCoins} coins and has ${this.players[i].coins} coins left`);
            } else {
                console.log(`\n${i} started with ${this.players[i].startCoins} coins and left with ${this.players[i].leftWith} `);
            }
        }
        for(let i = 0; i < NUM_PLAYERS; i++) {
            if (this.players[i].currPlayer === true) {
                document.getElementById("greenCardText").innerText = `${this.players[i].name}, you \nStarted with: ${this.players[i].startCoins} coins\n and have: ${this.players[i].coins} coins`;
            }
        }
        this.#displayPot();
    }

    #newDeck() {
        if (this.#deck[0].length < 3) {
            this.#deck[0] = this.#createDeck(1, false);
        }
    }

    #checkGo() {
        let go = false;
        for (let i = 0; i < NUM_PLAYERS; i++) {
            if (this.players[i].coins >= 2) {
                go = true;
                return go;
            }
        }
        this.#endGame();
        return go;
    }

   async getUserBetInput() {
        let input;

    const promise = new Promise((resolve, reject) => {
        document.getElementById('betCoinsBtn').addEventListener("click",function () {
            input = document.getElementById('betCoins').value;
            console.log("inside promise.." + input);

            resolve(input);
        });
        //document.getElementById()
    });
      promise.then(result => {
          this.bet(input);
          console.log("promise.then bet!"+this.#currBet);
       });
      return promise;
    }

    #endGame() {
        console.log(`No one left has any coins! `)
        console.log(`Game is over...`);
        this.#displayGameData();
    }
}

