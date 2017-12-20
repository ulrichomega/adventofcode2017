import * as _ from "lodash";

const input: number = _.parseInt("348");

let position: number = 0;

// 0 is always at the beginning, so we only care about what's right after it
let afterZero: number = 0;

_.forEach(_.range(50000000), (iteration: number) => {
    // Position points to the previously written value, but we're starting from the *next* one
    position = (position + 1 + input) % (iteration + 1);

    if (position === 0) {
        afterZero = iteration + 1;
    }
});

console.log(afterZero);
