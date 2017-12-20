import * as fs from "fs";
import * as _ from "lodash";

const fileContents: string[] = _.split(fs.readFileSync("inputs/16_1", {encoding: "utf8"}).trim(), ",");

let programs: string[] = _.map(_.range(65, 65 + 16), (value: number): string => {
    return String.fromCharCode(value);
});

_.forEach(fileContents, (instruction: string) => {
    if (_.first(instruction) === "s") {
        const sliceLength: number = _.parseInt(instruction.substring(1));
        programs = _.concat(_.slice(programs, programs.length - sliceLength),
                            _.slice(programs, 0, programs.length - sliceLength));
    } else if (_.first(instruction) === "x") {
        const programsToSwap: string[] = _.split(instruction.substr(1), "/");
        const firstPosition: number = _.parseInt(programsToSwap[0]);
        const secondPosition: number = _.parseInt(programsToSwap[1]);
        const swapTemp: string = programs[firstPosition];
        programs[firstPosition] = programs[secondPosition];
        programs[secondPosition] = swapTemp;
    } else if (_.first(instruction) === "p") {
        const programsToSwap: string[] = _.split(instruction.substr(1), "/");
        const firstProgram: string = programsToSwap[0].toUpperCase();
        const secondProgram: string = programsToSwap[1].toUpperCase();
        const firstIndex: number = _.indexOf(programs, firstProgram);
        const secondIndex: number = _.indexOf(programs, secondProgram);

        const swapTemp: string = programs[firstIndex];
        programs[firstIndex] = programs[secondIndex];
        programs[secondIndex] = swapTemp;
        return;
    }
});

console.log(_.join(programs, ""));
