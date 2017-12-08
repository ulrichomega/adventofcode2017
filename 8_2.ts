import fs = require("fs");
import _ = require("lodash");

function evalIf(register: string, operator: string, value: number, registers: { [key: string]: number}): boolean {
    let registerValue = registers[register];
    if (registerValue === undefined) {
        registerValue = 0;
    }

    switch (operator) {
        case "<":
            return registerValue < value;
        case ">":
            return registerValue > value;
        case "<=":
            return registerValue <= value;
        case ">=":
            return registerValue >= value;
        case "==":
            return registerValue === value;
        case "!=":
            return registerValue !== value;
        default:
            // Todo: Throw?
            return false;
    }
}

function runLine(line: string, registers: { [key: string]: number}): number {
    const lineParts: string[] = _.split(line, " ");

    const register: string = lineParts[0];
    const command: string = lineParts[1];
    const commandValue: number = _.parseInt(lineParts[2]);
    const checkRegister: string = lineParts[4];
    const operator: string = lineParts[5];
    const checkValue: number = _.parseInt(lineParts[6]);

    if (evalIf(checkRegister, operator, checkValue, registers)) {
        if (registers[register] === undefined) {
            registers[register] = 0;
        }

        if (command === "inc") {
            registers[register] += commandValue;
        } else if (command === "dec") {
            registers[register] -= commandValue;
        }
    }

    return registers[register];
}

const fileContents: string[] = _.split(fs.readFileSync("inputs/8_1", {encoding: "utf8"}).trim(), "\n");

// This is a strange syntax
const allRegisters: { [key: string]: number } = {};

const returnValues: number[] = [];
_.forEach(fileContents, (line: string) => {
    returnValues.push(runLine(line, allRegisters));
});

console.log(_.max(returnValues));
