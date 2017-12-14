import * as fs from "fs";
import * as _ from "lodash";

// Shoot, I mixed up terminology here
// depth === layer
// range === depth

function calcNumberOfHits(layers: string[], delay: number): number {
    const val: number = _.sum(_.map(layerStrings, (line: string): number => {
        // Maybe next time don't parse the strings repeatedly every iteration
        const lineSplit: number[] = _.map(_.split(line, ":"), _.parseInt);

        const layer: number = lineSplit[0];
        const depth: number = lineSplit[1];

        // Each scanner is at the starting location every ${(depth - 1) * 2} ticks
        if (((layer + delay) % ((depth - 1) * 2)) === 0) {
            return 1;
        } else {
            return 0;
        }
    }));

    // console.log(`number of hits for ${delay} delays: ${val}`);

    return val;
}

const fileContents: string = fs.readFileSync("inputs/13_1", {encoding: "utf8"}).trim();

const layerStrings: string[] = _.split(fileContents, "\n");

let numberOfDelays: number = 0;

while (calcNumberOfHits(layerStrings, numberOfDelays) !== 0 && numberOfDelays < 100000000) {
    numberOfDelays++;
}

console.log(numberOfDelays);
