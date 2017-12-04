import fs = require("fs");
import _ = require("lodash");

const fileContents: string = fs.readFileSync("./input_4_1.txt", {encoding: "utf8"}).trim();

const words: string[][] = _.map(_.split(fileContents, "\n"), (input: string) => {
    return _.split(input, " ");
});

const output: number = _.sum(_.map(words, (line: string[]): number => {
    const valid: boolean = _.isEqual(line, _.uniq(line));

    return valid ? 1 : 0;
}));

console.log(output);
