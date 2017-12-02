import fs = require("fs");
import _ = require("lodash");

const fileContents: string = fs.readFileSync("./input_2_1.txt", {encoding: "utf8"}).trim();

const stringResults: string[][] = _.map(_.split(fileContents, "\n"), (input: string) => {
    return _.split(input, "\t");
});

const intResults: number[][] = _.map(stringResults, (input: string[]) => {
    return _.map(input, _.parseInt);
});

console.log(_.sum(_.map(intResults, (row: number[]): number => {
    let numberToReturn: number = 0;
    _.each(row, (value: number, index: number, others: number[]): any => {
        // The results of dividing value by all other values in the row
        const divisionResults: number[] = _.map(_.without(others, value), _.bind(_.divide, _, value, _));

        // If any resulting values are integers, then they are the valid answer for this row
        const dividedValue: number = _.find(divisionResults, _.isInteger);
        if (dividedValue) {
            numberToReturn = dividedValue;
            return false; // Stop processing
        }
    });
    console.log(numberToReturn);
    return numberToReturn;
})));
