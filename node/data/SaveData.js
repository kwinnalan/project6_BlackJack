"use strict";

const IO = require('fs');  // For file I/O

class SaveData {

    static writeGameData(gameData) {
        if (IO.existsSync('node/data/dataBak.csv')) {
            IO.unlinkSync(`node/data/dataBak.csv`);
        }
        if (IO.existsSync('node/data/game_data.csv')) {
            IO.copyFileSync(`node/data/game_data.csv`, `node/data/dataBak.csv`);
        }
        IO.appendFileSync(`node/data/game_data.csv`, `${gameData[0]},${gameData[1]}\r`);
    }

    static readGameData() {
        console.log('Hello!');
    }
}

module.exports = SaveData;