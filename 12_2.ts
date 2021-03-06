import * as fs from "fs";
import * as _ from "lodash";

function exploreNode(nodeList: number[][], nodeToExplore: number, alreadyExplored: number[]): number[] {
    alreadyExplored.push(nodeToExplore);
    _.forEach(_.difference(nodeList[nodeToExplore], alreadyExplored),
              _.bind(exploreNode, _, nodeList, _, alreadyExplored));

    return alreadyExplored;
}

const fileContents: string = fs.readFileSync("inputs/12_1", {encoding: "utf8"}).trim();

const nodeIdentifiers: string[] = _.split(fileContents, "\n");

const nodes: number[][] = _.map(nodeIdentifiers, (nodeLine: string): number[] => {
    const lineContents: string[] = _.split(nodeLine, " ");

    // All node ids are just the line number so we can ignore the first two parts
    // And hte magic of parseInt means we don't need to worry about the commas!
    return _.map(_.slice(lineContents, 2), _.parseInt);
});

const nodesNotExplored: number[] = _.range(0, nodes.length);

// Iteratively explore a group and then pop all of them from the list
let numberOfGroups: number = 0;
while (nodesNotExplored.length > 0) {
    const nodeToExplore: number = _.min(nodesNotExplored);

    const nodesInGroup: number[] = exploreNode(nodes, nodeToExplore, []);

    // Our solution to part one makes this part kind of harder
    // So unless we refactor we're stuck with a dumb list of numbers instead of smarter classes
    _.pullAll(nodesNotExplored, nodesInGroup);

    numberOfGroups++;
}

console.log(numberOfGroups);
