class RandomDice {
    constructor(numSides) {
        this.numSides = numSides;
    }

    rollOne() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }

    role({numRolls}) {
        var output = [];
        for (var i = 0; i < numRolls; i++) {
            output.push(this.rollOne())
        }
        return output;
    }
}

module.exports = RandomDice;