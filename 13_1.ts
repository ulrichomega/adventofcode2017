import * as fs from "fs";
import * as _ from "lodash";

// Shoot, I mixed up terminology here
// depth === layer
// range === depth

const fileContents: string = fs.readFileSync("inputs/13_1", {encoding: "utf8"}).trim();

const layerStrings: string[] = _.split(fileContents, "\n");

// We know exactly where each scanner is when we get to its position based on its position,
// so no need to simulate anything
const numberOfHits: number = _.sum(_.map(layerStrings, (line: string): number => {
    const lineSplit: number[] = _.map(_.split(line, ":"), _.parseInt);

    const layer: number = lineSplit[0];
    const depth: number = lineSplit[1];

    // Each scanner is at the starting location every ${(depth - 1) * 2} ticks
    if ((layer % ((depth - 1) * 2)) === 0) {
        return layer * depth;
    } else {
        return 0;
    }
}));

console.log(numberOfHits);
