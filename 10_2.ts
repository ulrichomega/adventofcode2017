import * as fs from "fs";
import * as _ from "lodash";

const fileContents: string = fs.readFileSync("inputs/10_1", {encoding: "utf8"}).trim();

let lengths: number[] = _.map(fileContents, (char: string): number => {
    return char.charCodeAt(0);
});

// Hardcoded from puzzle
lengths = _.concat(lengths, [17, 31, 73, 47, 23]);

let currentPosition: number = 0;
let skip: number = 0;
let knot: number[] = _.range(0, 256);

_.forEach(_.range(0, 64), () => {
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

});

// Array magic to get the xor values

const buckets: number[][] = _.chunk(knot, 16);
const xor: number[] = _.map(buckets, (bucket: number[]): number => {
    return bucket.reduce((sum: number, value: number): number => {
        // tslint
        // tslint:disable-next-line:no-bitwise
        return sum ^ value;
    });
});

const hexValues: string[] = _.map(xor, (value: number): string => {
    return value.toString(16);
});

console.log(hexValues);

const hexOR: string = hexValues.join("");

console.log(hexOR);
