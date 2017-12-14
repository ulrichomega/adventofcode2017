import * as fs from "fs";
import * as _ from "lodash";

class Program {
    public id: string;
    public children: string[];

    public personalWeight: number;
    public overallWeight: number; // calculated after population

    public parentProgram: Program;
    public childPrograms: Program[];

    constructor(line: string) {
        const contents: string[] = _.split(line, " ");

        this.id = contents[0];
        this.personalWeight = _.parseInt(contents[1].substr(1, contents[1].length - 2));

        // If any children
        this.children = _.map(_.slice(contents, 3), (childIdentifier: string): string => {
            return _.trim(childIdentifier, ",");
        });

        this.childPrograms = [];
    }
}

function calculateoverallWeight(program: Program): number {
    program.overallWeight = _.sum(_.map(program.childPrograms, calculateoverallWeight)) + program.personalWeight;
    return program.overallWeight;
}

function findImbalance(program: Program): number {
    const children: object = _.groupBy(program.childPrograms, "overallWeight");

    // Apparently typescript is smart enough to realize that it's [string][array]? Neat.
    // This returns the group that is the smallest, which we can assume will always work
    // given the problem as written (i.e. no programs will be imbalanced with only one other co-child)
    const imbalancedProgram: Program = _.minBy(_.toPairs(children), (pair: any[][]): number => {
        return pair[1].length;
    })[1][0];

    // Check to see if its children are all balanced
    // We should refactor this to only calculate each program's children weights once
    const imbalancedProgramChildren: object = _.groupBy(imbalancedProgram.childPrograms, "overallWeight");
    if (_.keys(imbalancedProgramChildren).length === 1) {
        // If it is completely balanced, we simply need to math a bit

        // Find how much the other co-children weigh
        // Typescript gets less than readable at these lengths
        const otherChildrenWeight: number = _.parseInt(_.maxBy(_.toPairs(children), (pair: any[][]): number => {
            return pair[1].length;
        })[0]);

        return otherChildrenWeight - imbalancedProgram.overallWeight + imbalancedProgram.personalWeight;
    } else {
        return findImbalance(imbalancedProgram);
    }
}

const fileContents: string[] = _.split(fs.readFileSync("inputs/7_1", {encoding: "utf8"}).trim(), "\n");

const programs: Program[] = _.map(fileContents, (line: string): Program => {
    return new Program(line);
});

// With that list of programs, create the tree structure
_.forEach(programs, (program: Program): void => {

    // We only need to find the parents of any given node, because that will populate all connections
    _.forEach(programs, (otherProgram: Program): void => {
        if (_.some(otherProgram.children, _.matches(program.id))) {
            program.parentProgram = otherProgram;
        }

        if (_.some(program.children, _.matches(otherProgram.id))) {
            program.childPrograms.push(otherProgram);
        }
    });
});

const ultimateParent: Program = _.find(programs, (program: Program): boolean => {
    return program.parentProgram === undefined;
});

calculateoverallWeight(ultimateParent);

// We now have a complete tree structure with accurate weights
// Everything is completely balanced except for a single program
// So simply follow the chain of imbalance until we get to a program with balanced children

console.log(findImbalance(ultimateParent));
