import * as fs from "fs";
import * as _ from "lodash";

const fileContents: string[] = _.split(fs.readFileSync("inputs/15_1", {encoding: "utf8"}).trim(), "\n");

const generatorAFactor: number = 16807;
const generatorBFactor: number = 48271;
const divisor: number = 2147483647;

let generatorAValue: number = _.parseInt(_.last(_.split(fileContents[0], " ")));
let generatorBValue: number = _.parseInt(_.last(_.split(fileContents[1], " ")));
let matchTotal: number = 0;

_.forEach(_.range(0, 5000000), () => {
    do {
        generatorAValue = (generatorAValue * generatorAFactor) % divisor;
    }
    while (generatorAValue % 4 !== 0);
    do {
        generatorBValue = (generatorBValue * generatorBFactor) % divisor;
    }
    while (generatorBValue % 8 !== 0);

    const generatorABinary: string = _.padStart(generatorAValue.toString(2), 16, "0");
    const generatorBBinary: string = _.padStart(generatorBValue.toString(2), 16, "0");

    const generatorAMatch: string = generatorABinary.substr(generatorABinary.length - 16);
    const generatorBMatch: string = generatorBBinary.substr(generatorBBinary.length - 16);

    if ( generatorAMatch === generatorBMatch) {
        matchTotal++;
    }
});

console.log(matchTotal);
