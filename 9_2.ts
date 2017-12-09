import fs = require("fs");
import _ = require("lodash");

// Returns the point value of the group (sum of all children)
function parseGroup(group: string): number {
    let pointValue: number = 0;
    let overallPoints: number = 0;
    let garbage: boolean = false;
    let garbageTotal: number = 0;
    _.forEach(group, (char: string, index: number, overall: string) => {
        if (char === ">") {
            garbage = false;
        }
        console.log(char);
        if (!garbage) {
            if (char === "{") {
                pointValue++;
            } else if (char === "}") {
                overallPoints += pointValue;
                pointValue--;
            } else if (char === "<") {
                garbage = true;
            }
        } else {
            garbageTotal++;
        }
        console.log(overallPoints);
    });

    return garbageTotal;
}

const fileContents: string = fs.readFileSync("inputs/9_1", {encoding: "utf8"}).trim();

// Purge all characters that follow '!'
const purgedFileContents: string[] = [];

// There has to be a better way to do this.
_.forEach(fileContents, (char: string) => {
    if (_.last(purgedFileContents) === "!") {
        purgedFileContents.pop();
    } else {
        purgedFileContents.push(char);
    }
});

const purgedFile: string = _.join(purgedFileContents, "");

console.log(parseGroup(purgedFile));
