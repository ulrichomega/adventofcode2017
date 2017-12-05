import fs = require("fs");
import _ = require("lodash");

const fileContents: string = fs.readFileSync("inputs/2_1", {encoding: "utf8"}).trim();

const stringResults: string[][] = _.map(_.split(fileContents, "\n"), (input: string) => {
    return _.split(input, "\t");
});

const intResults: number[][] = _.map(stringResults, (input: string[]) => {
    return _.map(input, _.parseInt);
});

console.log(_.sum(_.map(intResults, (input: number[]) => {
    return Math.abs(_.min(input) - _.max(input));
})));
