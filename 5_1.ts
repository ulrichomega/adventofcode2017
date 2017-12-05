import fs = require("fs");
import _ = require("lodash");

const fileContents: string = fs.readFileSync("./input_5_1.txt", {encoding: "utf8"}).trim();

const instructionStrings: string[] = _.split(fileContents, "\n");
const instructions: number[] = _.map(instructionStrings, _.toInteger);

let numberOfInstructions: number = 0;
let instructionLocation: number = 0;

while (instructionLocation < instructions.length) {
    instructions[instructionLocation]++;
    instructionLocation += instructions[instructionLocation] - 1;
    numberOfInstructions++;
}

console.log(numberOfInstructions);
