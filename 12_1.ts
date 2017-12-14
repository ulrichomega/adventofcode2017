import * as fs from "fs";
import * as _ from "lodash";

function exploreNode(nodeList: number[][], nodeToExplore: number, alreadyExplored: number[]): number {
    alreadyExplored.push(nodeToExplore);
    _.forEach(_.difference(nodeList[nodeToExplore], alreadyExplored),
              _.bind(exploreNode, _, nodeList, _, alreadyExplored));

    return alreadyExplored.length;
}

const fileContents: string = fs.readFileSync("inputs/12_1", {encoding: "utf8"}).trim();

const nodeIdentifiers: string[] = _.split(fileContents, "\n");

const nodes: number[][] = _.map(nodeIdentifiers, (nodeLine: string): number[] => {
    const lineContents: string[] = _.split(nodeLine, " ");

    // All node ids are just the line number so we can ignore the first two parts
    // And hte magic of parseInt means we don't need to worry about the commas!
    return _.map(_.slice(lineContents, 2), _.parseInt);
});

console.log(exploreNode(nodes, 0, []));
