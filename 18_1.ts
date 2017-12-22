import * as fs from "fs";
import * as _ from "lodash";

function getValue(value: string, registerMap: { [key: string]: number}): number {
    if (!_.isNaN(_.parseInt(value))) {
        return _.parseInt(value);
    } else {
        return registerMap[value];
    }
}

const fileContents: string = fs.readFileSync("inputs/18_1", {encoding: "utf8"}).trim();
const instructions: string[] = _.split(fileContents, "\n");

const registers: { [key: string]: number} = {};
let lastSound: number = 0;

let instructionLocation: number = 0;
while (instructionLocation < instructions.length) {
    const instruction: string = instructions[instructionLocation];
    const argc: string[] = _.split(instruction, " ");
    if (argc[0] === "set") {
        registers[argc[1]] = getValue(argc[2], registers);
    } else if (argc[0] === "add") {
        registers[argc[1]] += getValue(argc[2], registers);
    } else if (argc[0] === "mul") {
        registers[argc[1]] *= getValue(argc[2], registers);
    } else if (argc[0] === "mod") {
        registers[argc[1]] = getValue(argc[1], registers) % getValue(argc[2], registers);
    } else if (argc[0] === "snd") {
        lastSound = getValue(argc[1], registers);
    } else if (argc[0] === "rcv") {
        if (getValue(argc[1], registers) !== 0) {
            break; // We've found a sound, terminate the program
        }
    } else if (argc[0] === "jgz") {
        if (getValue(argc[1], registers) > 0) {
            // Minus one because we're going to ++ it in a second
            instructionLocation += getValue(argc[2], registers) - 1;
        }
    }

    console.log(`${instructionLocation}: ${instruction}`);

    instructionLocation++;
}

console.log(registers);
console.log(lastSound);
