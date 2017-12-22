import * as fs from "fs";
import * as _ from "lodash";

function findStart(gridToSearch: string[][]): [number, number] {
    // Search each side for a non-empty string
    let startingPosition: [number, number] = [0, 0];

    // Might be off-by-one here.
    // Grid is a square, so just search each edge with the same iterator
    _.forEach(_.range(gridToSearch.length), (index: number): boolean => {
        if (gridToSearch[0][index] !== " ") {
            startingPosition = [0, index];
            return false;
        } else if (gridToSearch[index][0] !== " ") {
            startingPosition = [index, 0];
            return false;
        } else if (gridToSearch[gridToSearch.length - 1][index] !== " ") {
            startingPosition = [gridToSearch.length, index];
            return false;
        } else if (gridToSearch[index][gridToSearch.length - 1] !== " ") {
            startingPosition = [index, gridToSearch.length];
            return false;
        }

        return true;
    });

    return startingPosition;
}
enum Direction {
    Up = 0,
    Right,
    Down,
    Left,
}

// We can cheat some edge cases since we know our starting point isn't a corner
function getDirectionFromStart(startingPosition: [number, number], gridSize: number): Direction {
    if (startingPosition[0] === 0) {
        return Direction.Down;
    } else if (startingPosition[0] === gridSize) {
        return Direction.Up;
    } else if (startingPosition[1] === 0) {
        return Direction.Right;
    } else {
        return Direction.Left;
    }
}

function move(moveDirection: Direction, oldPosition: [number, number]): [number, number] {
    const positionAdjustment: [number, number] = getDirectionValue(moveDirection);
    const newPosition: [number, number] = [0, 0];
    newPosition[0] = oldPosition[0];
    newPosition[1] = oldPosition[1];
    newPosition[0] += positionAdjustment[0];
    newPosition[1] += positionAdjustment[1];

    return newPosition;
}

function getDirectionValue(travelDirection: Direction): [number, number] {
    switch (travelDirection) {
        case Direction.Up:
            return [-1, 0];
        case Direction.Down:
            return [1, 0];
        case Direction.Left:
            return [0, -1];
        case Direction.Right:
            return [0, 1];
    }
}

function rotate90(oldDirection: Direction): Direction {
    return (oldDirection + 1) % 4;
}
function rotate180(oldDirection: Direction): Direction {
    return (oldDirection + 2) % 4;
}

function changeDirection(oldDirection: Direction, gridValues: string[][], oldPosition: [number, number] ): Direction {
    const rotatedDirection: Direction = rotate90(oldDirection);
    const rotatedNewPosition: [number, number] = move(rotatedDirection, oldPosition);
    if (gridValues[rotatedNewPosition[0]][rotatedNewPosition[1]] === " ") {
        // Wrong way, go back
        return rotate180(rotatedDirection);
    } else {
        // One direction or the other is valid.
        return rotatedDirection;
    }
}

const fileContents: string = fs.readFileSync("inputs/19_1", {encoding: "utf8"});
const grid: string[][] = _.split(fileContents, "\n").map((line: string, index: number, rows: string[]): string[] => {
    return _.map(_.padEnd(line, rows.length), (char: string): string => char);
});

let position: [number, number] = findStart(grid);
let direction: Direction = getDirectionFromStart(position, grid.length - 1);
let notOffEnd: boolean = true;
let numberOfSteps: number = 0;

// Loop forever, we'll break out when we need to
while (notOffEnd) {
    while (grid[position[0]][position[1]] !== "+" && notOffEnd) {
        position = move(direction, position);
        numberOfSteps++;

        // Check if we've run off the edge
        if (grid[position[0]][position[1]] === " ") {
            notOffEnd = false;
        }
    }

    // We've hit a direction change, now what?
    if (notOffEnd) {
        direction = changeDirection(direction, grid, position);
        position = move(direction, position);
        numberOfSteps++;
    }
}

// Minus one because we counted the final step off the end
// Plus one because of the first step onto the board
console.log(numberOfSteps);
