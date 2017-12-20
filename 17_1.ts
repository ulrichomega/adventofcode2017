import * as _ from "lodash";

const input: number = _.parseInt("348");

let buffer: number[] = [0];
let position: number = 0;

_.forEach(_.range(2017), (iteration: number) => {
    // Position points to the previously written value, but we're starting from the *next* one
    position = (position + 1 + input) % buffer.length;
    buffer = _.concat(_.slice(buffer, 0, position + 1), [iteration + 1], _.slice(buffer, position + 1));
});

console.log(buffer[position + 2] % buffer.length);
