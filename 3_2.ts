import * as _ from "lodash";

// Returns the index of the associated corner in the ring one in from the given one
function findInnerRingCorner(ringCounter: number, cornerIndex: number): number {
    const previousRing: number = ringCounter - 2;
    const prevRingStart: number = (previousRing - 2) * (previousRing - 2);
    const prevRingEnd: number = previousRing * previousRing;
    const quarterOfRing: number = (prevRingEnd - prevRingStart) / 4;

    console.log("cornerIndex " + _.toString(cornerIndex));
    console.log("prevRingStart " + _.toString(prevRingStart));
    console.log("prevRingEnd " + _.toString(prevRingEnd));

    const corners: number[] = [quarterOfRing + prevRingStart,
                              2 * quarterOfRing + prevRingStart,
                              3 * quarterOfRing + prevRingStart];
    console.log("corners " + _.toString(corners));
    return corners[cornerIndex] - 1; // Our math in the previous part was 1-indexed due to the values calculated
}

// Returns single-array indices
function getAdjacencies(index: number): number[] {
    // The bottom right corner of the square is always a square of an odd number
    // We can determine the ring number by squaring odd numbers
    let ringCounter: number = 1;
    while (ringCounter * ringCounter < index) {
        ringCounter = ringCounter + 2;
    }

    console.log("index " + _.toString(index));

    // The ring number tells us how far we are from the center along some axis
    const ringNumber: number = _.floor(ringCounter / 2);

    const ringStart: number = (ringCounter - 2) * (ringCounter - 2);
    const ringEnd: number = ringCounter * ringCounter;
    const distanceAlongRing: number = index - ringStart;
    const quarterOfRing: number = (ringEnd - ringStart) / 4;

    const corners: number[] = [quarterOfRing,
                              2 * quarterOfRing,
                              3 * quarterOfRing];
    const preCorners: number[] = [quarterOfRing - 1,
                                  (2 * quarterOfRing) - 1,
                                  (3 * quarterOfRing) - 1];
    const postCorners: number[] = [quarterOfRing + 1,
                                   (2 * quarterOfRing) + 1,
                                   (3 * quarterOfRing) + 1];

    // First step is to determine where on the ring we are
    // Options are:

    console.log("ringNumber: " + _.toString(ringNumber));
    console.log("ringStart: " + _.toString(ringStart));
    console.log("ringEnd: " + _.toString(ringEnd));
    console.log("distanceAlongRing: " + _.toString(distanceAlongRing));
    console.log("corners: " + _.toString(corners));
    console.log("preCorners: " + _.toString(preCorners));
    console.log("postCorners: " + _.toString(postCorners));

    // First item in ring
    if (distanceAlongRing === 1) {
        console.log("First item");
        // The value right before this one is a square of an odd number
        // So the value right above it is the square of the *previous* odd number, plus one
        return [Math.pow(Math.sqrt(index - 1) - 2, 2)];
    // Right After that item (need to consider the one right after, too, as well as the previous square itself)
    } else if (distanceAlongRing === 2) {
        console.log("Second item");
        const prevSquare: number = Math.pow(Math.sqrt(index - 2) - 2, 2);
        return [prevSquare, prevSquare + 1, index - 3];
    // Right before a corner
    } else if (_.indexOf(preCorners, distanceAlongRing) > -1) {
        console.log("Before corner");
        const innerCorner: number = findInnerRingCorner(ringCounter,
                                                        _.indexOf(preCorners, distanceAlongRing));
        return [innerCorner - 1, innerCorner];
    // On a corner
    } else if (_.indexOf(corners, distanceAlongRing) > -1) {
        console.log("On corner");
        const innerCorner: number = findInnerRingCorner(ringCounter,
                                                        _.indexOf(corners, distanceAlongRing));
        return [innerCorner];
    // Right after a corner
    } else if (_.indexOf(postCorners, distanceAlongRing) > -1) {
        console.log("After corner");
        const innerCorner: number = findInnerRingCorner(ringCounter,
                                                        _.indexOf(postCorners, distanceAlongRing));
        return [innerCorner, innerCorner + 1, index - 3];
    // Right before the final
    } else if (index === ringEnd - 1) {
        console.log("Before final");
        return [ringStart - 2, ringStart - 1, ringStart];
    // The final item in a ring
    } else if (index === ringEnd) {
        console.log("final");
        return [ringStart - 1, ringStart];
    } else {
        console.log("Somewhere");
        // We are just somewhere along the ring
        // Our position is the same as that on the previous (inner) ring for the first leg
        // But corners add further length to the track along the current (outer) ring
        let innerRingIndex: number = distanceAlongRing - 1;
        console.log("innerRingIndex " + _.toString(innerRingIndex));

        // We need to count how many corners we've passed
        const numberOfCornersPassed: number = _.sum(_.map(corners, (cornerIndex: number): number => {
            // Return whether the distanceAlongRing is greater than the corner index
            // The sum of this series is how many corners we've passed
            if (distanceAlongRing > cornerIndex) {
                return 1;
            } else {
                return 0;
            }
        }));

        console.log("numberOfCornersPassed " + _.toString(numberOfCornersPassed));

        innerRingIndex -= numberOfCornersPassed * 2;

        // Indices would be in terms of distance from ring start, need to add it back in
        innerRingIndex += (ringCounter - 4) * (ringCounter - 4) - 1;

        return [innerRingIndex - 1, innerRingIndex, innerRingIndex + 1];
    }
}

const inputValue: number = _.parseInt(process.argv[2]);

// Start with first few values for simplicity
const gridValues: number[] = [ 1, 1, 2, 4, 5, 10, 11, 23, 25 ];

while (_.last(gridValues) <= inputValue) {
    console.log("Considering " + _.toString(gridValues.length + 1) + " which is after " + _.last(gridValues));
    const adjacentIndices: number[] = getAdjacencies(gridValues.length + 1);
    const adjacentValues: number[] = _.map(adjacentIndices, (index: number): number => {
        return gridValues[index];
    });
    // We ALWAYS add the previously added value
    adjacentValues.push(_.last(gridValues));
    console.log("adjacentIndices " + _.toString(adjacentIndices));
    console.log("adjacentValues " + _.toString(adjacentValues));
    gridValues.push(_.sum(adjacentValues));
    console.log("pushed " + _.toString(_.last(gridValues)));
    console.log("gridValues is now: " + _.toString(gridValues));
}

console.log(_.last(gridValues));
