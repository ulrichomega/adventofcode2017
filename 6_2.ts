import fs = require("fs");
import _ = require("lodash");

function bucketIndexInSeenCombinations(currentBucket: number[], combinations: number[][]): number {
    // The bucket will always exist in the combinations, but if it is at the end, then it was just added and is ignored
    return _.findIndex(combinations, (combination: number[]): boolean => {
        // Return true if combination matches currentBucket
        return _.every(combination, (value: number, index: number, collection: number[]): boolean => {
            return value === currentBucket[index];
        });
    });
}

const fileContents: string = fs.readFileSync("inputs/6_1", {encoding: "utf8"}).trim();

const buckets: number[] = _.map(_.split(fileContents, "\t"), _.parseInt);

const seenCombinations: number[][] = [buckets.slice()];

let numberOfCycles: number = 0;
while (bucketIndexInSeenCombinations(buckets, seenCombinations) === (seenCombinations.length - 1)) {
    let largestBucket: number = _.max(buckets);
    let largestBucketIndex: number = _.indexOf(buckets, largestBucket);

    buckets[largestBucketIndex] = 0;

    while (largestBucket > 0) {
        largestBucketIndex = (largestBucketIndex + 1) % buckets.length;
        buckets[largestBucketIndex]++;

        largestBucket--;
    }

    numberOfCycles++;
    seenCombinations.push(buckets.slice()); // Have to make a copy of the array
}

console.log(numberOfCycles - bucketIndexInSeenCombinations(buckets, seenCombinations));
