import * as fs from "fs";
import * as _ from "lodash";

const fileContents: string = fs.readFileSync("inputs/4_1", {encoding: "utf8"}).trim();

const words: string[][] = _.map(_.split(fileContents, "\n"), (input: string) => {
    return _.split(input, " ");
});

const output: number = _.sum(_.map(words, (line: string[]): number => {
    // Sort every word, and then compare them
    // Two words that sort into the same string are anagrams, and thus not valid
    // Since they're the same, they'll also disappear from uniq
    const originalCounts: string[] = _.map(line, (word: string): string => {
        // Surely there's a way to sort strings, but javascript doesn't need one
        // And typescript doesn't seem to have one. So...
        return _.toString(_.toArray(word).sort());
    });
    const valid: boolean = _.isEqual(originalCounts, _.uniq(originalCounts));

    return valid ? 1 : 0;
}));

console.log(output);
