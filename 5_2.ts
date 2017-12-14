import * as fs from "fs";
import * as _ from "lodash";

const fileContents: string = fs.readFileSync("inputs/5_1", {encoding: "utf8"}).trim();

const instructionStrings: string[] = _.split(fileContents, "\n");
const instructions: number[] = _.map(instructionStrings, _.toInteger);

let numberOfInstructions: number = 0;
let instructionLocation: number = 0;

while (instructionLocation < instructions.length) {
    // Modify the instruction first to avoid storing a temporary copy of it
    if (instructions[instructionLocation] < 3) {
        instructions[instructionLocation]++;
        instructionLocation += instructions[instructionLocation] - 1;
    } else {
        instructions[instructionLocation]--;
        instructionLocation += instructions[instructionLocation] + 1;
    }
    numberOfInstructions++;
}

console.log(numberOfInstructions);
