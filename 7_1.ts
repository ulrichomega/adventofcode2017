import * as fs from "fs";
import * as _ from "lodash";

class Program {
    public id: string;
    public children: string[];
    public weight: number;

    public parentProgram: Program;
    public childPrograms: Program[];

    constructor(line: string) {
        const contents: string[] = _.split(line, " ");

        this.id = contents[0];
        this.weight = _.parseInt(contents[1].substr(1, contents[1].length - 2));

        // If any children
        this.children = _.map(_.slice(contents, 3), (childIdentifier: string): string => {
            return _.trim(childIdentifier, ",");
        });
    }
}

const fileContents: string[] = _.split(fs.readFileSync("inputs/7_1", {encoding: "utf8"}).trim(), "\n");

const programs: Program[] = _.map(fileContents, (line: string): Program => {
    return new Program(line);
});

// With that list of programs, create the tree structure
_.forEach(programs, (program: Program): void => {

    // We only need to find the parents of any given node, because that will populate all connections
    _.forEach(programs, (possibleParent: Program): void => {
        if (_.some(possibleParent.children, _.matches(program.id))) {
            program.parentProgram = possibleParent;
        }
    });
});

console.log(_.find(programs, (program: Program): boolean => {
    return program.parentProgram === undefined;
}));

console.log(programs);
