import * as _ from "lodash";

const inputValue: number = _.parseInt(process.argv[2]);

// The bottom right corner of the square is always a square of an odd number
// We can determine the ring number by squaring odd numbers
let ringCounter: number = 1;
while (ringCounter * ringCounter < inputValue) {
    ringCounter = ringCounter + 2;
}

// The ring number tells us how far we are from the center along some axis
const ringNumber: number = _.floor(ringCounter / 2);

const ringStart: number = (ringCounter - 2) * (ringCounter - 2);
const ringEnd: number = ringCounter * ringCounter;

// The other value we need is how far we are from the axis defined by ringNumber
// Rings start at the bottom right corner and the axis are found at 1/8, 3/8, 5/8 and 7/8 of the way to the next square
// So our distance to an axis is the lowest distance to one of those values!

const distanceAlongRing: number = inputValue - ringStart;
const oneEighthOfRing: number = (ringEnd - ringStart) / 8;
const axisDistancesAlongRing: number[] = [oneEighthOfRing,
                                          3 * oneEighthOfRing,
                                          5 * oneEighthOfRing,
                                          7 * oneEighthOfRing];
const distanceFromAxis: number = _.min(_.map(axisDistancesAlongRing, (axis: number): number => {
    return Math.abs(axis - distanceAlongRing);
}));

console.log(distanceFromAxis + ringNumber);
