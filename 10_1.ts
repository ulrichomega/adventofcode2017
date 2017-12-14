import * as fs from "fs";
import * as _ from "lodash";

const fileContents: string = fs.readFileSync("inputs/10_1", {encoding: "utf8"}).trim();

const lengths: number[] = _.map(_.split(fileContents, ","), _.parseInt);

let currentPosition: number = 0;
let skip: number = 0;
let knot: number[] = _.range(0, 256);

_.forEach(lengths, (length: number) => {
    // Unless we figure out how to reverse a slice in place, just reconstruct the knot

    let section1: number[];
    let section2: number[];
    let section3: number[];
    const endPosition: number = currentPosition + length;

    // The length could be beyond the end of the array, this is a special case
    if (currentPosition + length > knot.length) {
        const reversedSection: number[] = _.reverse(_.concat(_.slice(knot, currentPosition),
                                                              _.slice(knot, 0, endPosition - knot.length)));

        section1 = _.slice(reversedSection, reversedSection.length - (endPosition - knot.length));
        section2 = _.slice(knot, endPosition - knot.length, currentPosition);
        section3 = _.slice(reversedSection, 0, reversedSection.length - (endPosition - knot.length));
    } else {
        section1 = _.slice(knot, 0, currentPosition);
        section2 = _.reverse(_.slice(knot, currentPosition, endPosition));
        section3 = _.slice(knot, endPosition);
    }

    knot = _.concat(section1, section2, section3);

    currentPosition += (length + skip);
    currentPosition = currentPosition % knot.length;
    skip++;
});

console.log(knot);
console.log(knot[0] * knot[1]);
