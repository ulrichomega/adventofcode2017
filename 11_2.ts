import * as fs from "fs";
import * as _ from "lodash";

const fileContents: string = fs.readFileSync("inputs/11_1", {encoding: "utf8"}).trim();

const instructions: string[] = _.split(fileContents, ",");

// The hex grid can be mapped to simple X,Y coordinates

/*
    http://devmag.org.za/2013/08/31/geometry-with-hex-coordinates/
    This is a bit strange, but the coordinate system has three variables
    The y-axis is where you'd expect, but X is offset to one of the diagonals
    This has certain mathemetical properties that are nice, such as making distance trivial

    The "z" (third) coordinate is actually derived from X and Y, but keeping it to match the math simpler
*/

const location: [number, number, number] = [0, 0, 0];
const distances: number[] = [];

// When we travel in a direction, the change in coordinates must always equal 0
// North corresponds to position y
// North East corresponds to positive X
_.forEach(instructions, (instruction: string) => {
    if ( instruction === "n" ) {
        location[1]++;
        location[2]--;
    } else if (instruction === "ne") {
        location[0]++;
        location[2]--;
    } else if (instruction === "se") {
        location[0]++;
        location[1]--;
    } else if (instruction === "s") {
        location[1]--;
        location[2]++;
    } else if (instruction === "sw") {
        location[0]--;
        location[2]++;
    } else if (instruction === "nw") {
        location[0]--;
        location[1]++;
    }
    distances.push((Math.abs(location[0]) + Math.abs(location[1]) + Math.abs(location[2])) / 2);
});

// And now distance is simple!
console.log(_.max(distances));

/*  The following is just an explanation for myself
    This works because hexes are also cubes (but on their side!)
    Thus, they are 3D objects as well, and need a third coordinate to represent their location
    All of the cubes in the grid are along a plane, and so their coordinates must add up to 0
    This is because the plane is literally "x + y + z = 0"
    If you move along one axis, you must move along the others to stay along the plane
*/
