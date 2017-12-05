import fs = require("fs");
import _ = require("lodash");

const fileContents: string = fs.readFileSync("inputs/4_1", {encoding: "utf8"}).trim();

const words: string[][] = _.map(_.split(fileContents, "\n"), (input: string) => {
    return _.split(input, " ");
});

const output: number = _.sum(_.map(words, (line: string[]): number => {
    const valid: boolean = _.isEqual(line, _.uniq(line));

    return valid ? 1 : 0;
}));

console.log(output);
