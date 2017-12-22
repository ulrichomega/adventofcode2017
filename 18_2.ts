import * as fs from "fs";
import * as _ from "lodash";

class Program {
    public registers: { [key: string]: number} = {};
    public queue: number[] = [];
    public paused: boolean = false; // this seems safe
    public instructions: string[] = [];
    public instructionLocation: number = 0;
    public numberOfSends: number = 0;

    constructor(initialPValue: number, newInstructions: string[]) {
        this.registers.p = initialPValue;
        this.instructions = newInstructions;
    }

    public receive(targetRegister: string) {
        if (_.isEmpty(this.queue)) {
            this.paused = true;
        } else {
            this.registers[targetRegister] = _.first(this.queue);
            this.queue = _.drop(this.queue, 1);
            this.paused = false;
        }
    }

    // Returns if a snd is the instruction, else NaN
    public handleInstruction(): number {
        let sentValue: number = NaN;
        if (!_.inRange(this.instructionLocation, 0, this.instructions.length)) {
            // If we're out of range, just pause us.
            // Should probably refactor to include a this.terminated value, but for now paused works the same way
            this.paused = true;
            return sentValue;
        }

        const instruction: string = this.instructions[this.instructionLocation];
        const argc: string[] = _.split(instruction, " ");

        if (!this.paused) {
            if (argc[0] === "set") {
                this.registers[argc[1]] = this.getValue(argc[2]);
            } else if (argc[0] === "add") {
                this.registers[argc[1]] += this.getValue(argc[2]);
            } else if (argc[0] === "mul") {
                this.registers[argc[1]] *= this.getValue(argc[2]);
            } else if (argc[0] === "mod") {
                this.registers[argc[1]] = this.getValue(argc[1]) % this.getValue(argc[2]);
            } else if (argc[0] === "snd") {
                this.numberOfSends++;
                sentValue = this.getValue(argc[1]);
            } else if (argc[0] === "rcv") {
                this.receive(argc[1]);
            } else if (argc[0] === "jgz") {
                if (this.getValue(argc[1]) > 0) {
                    // Minus one because we're going to ++ it in a second
                    this.instructionLocation += this.getValue(argc[2]) - 1;
                }
            }
            if (!this.paused) {
                this.instructionLocation++;
            }
        } else { // Else we ARE paused
            // Check if we're trying to receive something (as opposed to being terminated)
            this.receive(argc[1]);
            if (!this.paused) {
                this.instructionLocation++;
            }
        }

        return sentValue;
    }

    public getValue(value: string): number {
        if (!_.isNaN(_.parseInt(value))) {
            return _.parseInt(value);
        } else {
            if ( !_.has(this.registers, value) ) {
                return 0;
            } else {
                return this.registers[value];
            }
        }
    }
}

const fileContents: string = fs.readFileSync("inputs/18_1", {encoding: "utf8"}).trim();
const instructions: string[] = _.split(fileContents, "\n");

const a: Program = new Program(0, instructions);
const b: Program = new Program(1, instructions);

while (!a.paused || !b.paused) {
    const aVal: number = a.handleInstruction();
    const bVal: number = b.handleInstruction();

    if (!_.isNaN(aVal)) {
        b.queue.push(aVal);
    }

    if (!_.isNaN(bVal)) {
        a.queue.push(bVal);
    }
}

console.log(b.numberOfSends);
