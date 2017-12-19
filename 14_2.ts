import * as _ from "lodash";

function knotHash(valueToHash: string): string {

    let lengths: number[] = _.map(valueToHash, (char: string): number => {
        return char.charCodeAt(0);
    });

    // IT HELPS IF YOU READ THE ORIGINAL PROBLEM
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
         // We didn't pad in the other and still got the right answer...
         // It doesn't change the answer here because the 0 doesn't change the sum though
        return _.padStart(value.toString(16), 2, "0");
    });

    const hexOR: string = hexValues.join("");

    return hexOR;
}

function toBitArray(value: string): boolean[] {
    // Frustrating that our hash outputs a hex string as opposed to raw binary, but oh well
    const output: boolean[][] = _.map(value, (char: string): boolean[] => {
        const hexValue: number = _.parseInt(char, 16);
        const binaryString: string = _.padStart(hexValue.toString(2), 4, "0");

        return _.map(binaryString, (binaryChar: string): boolean => {
            return binaryChar === "1";
        });
    });

    // Turn each char into a set of booleans, then flatten the array
    return _.flatten(output);
}

function recursiveDestruction(grid: boolean[][], rowIndex: number, columnIndex: number) {
    if (grid[rowIndex][columnIndex]) {
        grid[rowIndex][columnIndex] = false;
        if (rowIndex > 0) {
            recursiveDestruction(grid, rowIndex - 1, columnIndex);
        }
        if (rowIndex < grid.length - 1) {
            recursiveDestruction(grid, rowIndex + 1, columnIndex);
        }
        if (columnIndex > 0) {
            recursiveDestruction(grid, rowIndex, columnIndex - 1);
        }
        if (columnIndex < grid[rowIndex].length - 1) {
            recursiveDestruction(grid, rowIndex, columnIndex + 1);
        }
    }
}

// Returns true if there are more groups to remove (i.e. hasn't reached the end without findind anything)
function removeGroup(grid: boolean[][]): number {
    let groupCount: number = 0;

    let groupFound: boolean = true;

    do {
        groupFound = false;
        _.forEach(grid, (row: boolean[], rowIndex: number) => {

            _.forEach(row, (block: boolean, columnIndex: number): boolean => {
                if (block) {
                    // Destroy the group, then incrememnt groupCount

                    recursiveDestruction(grid, rowIndex, columnIndex);
                    groupFound = true;
                    groupCount++;
                    return false; // Terminate early
                }

                // Else nothing is wrong. Live your life without worries.
                return true;
            });

            if (groupFound) {
                return false; // Terminate the loop early to avoid operating on a modified row
            } else {
                return true;
            }
        });
    }
    while (groupFound);

    return groupCount;
}

const input: string = "hxtvlmkl";

const inputGridStrings: string[] = _.map(_.range(0, 128), (value: number): string => {
    return input + "-" + value.toString();
});

const hashes: string[] = _.map(inputGridStrings, knotHash);

const booleanGrid: boolean[][] = _.map(hashes, toBitArray);

console.log(removeGroup(booleanGrid));
