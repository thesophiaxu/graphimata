import React from "react";
// @ts-ignore
import Graph from "react-graph-vis";
import { exampleGames, exampleRulesets } from "../common/exampleGames";
import { gameGenerator } from "../common/gameGenerator";
import { Button } from "@material-ui/core";

export function GraphView () {

    const [initialized, setInitialized] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);
    const isPausedRef = React.useRef(false);

    const [currentTick, setCurrentTick] = React.useState(0);

    const [currentGame, setCurrentGame]: [any, any] = React.useState();
    //const [currentGameToPresent, setCurrentGameToPresent]: [any, any] = React.useState(false);
    const ruleFunc = exampleRulesets.ruleset2.rule;

    const myNetwork: any = React.useRef();

    const nextTick = () => {
        console.log("updating next tick..." + currentTick)
        /* Firstly, update every node in the game */
        let newGame = JSON.parse(JSON.stringify(currentGame));
        newGame.nodes.forEach((currentNode: GraphimataNode, currentIndex: number) => {
            newGame.nodes[currentIndex] = ruleFunc(currentNode, currentGame); 
        });
        setCurrentGame(newGame);
        /* Next, update presents to UI */
        let newGameToPresent: any = {nodes: [], edges: []};
        newGame.nodes.forEach((currentNode: GraphimataNode, currentIndex: number) => {
            newGameToPresent.nodes[currentIndex] = {
                id: currentNode.id,
                label: currentNode.id.toString(),
                color: currentNode.value === true ? "#00FF00" : "#FFFFFF"
            }
            if (currentNode.x && currentNode.y) {
                newGameToPresent.nodes[currentIndex].x = currentNode.x;
                newGameToPresent.nodes[currentIndex].y = currentNode.y;
            }
        });
        newGame.vertices.forEach((currentEdge: GraphimataVertice, currentIndex: number) => {
            newGameToPresent.edges[currentIndex] = {
                from: currentEdge.from,
                to: currentEdge.to,
                arrows: currentEdge.bidirectionoal ? "to, from" : "to"
            }
        });
        if (myNetwork.current) myNetwork.current.setData(newGameToPresent);
        console.log(newGameToPresent);
        setCurrentTick(currentTick + 1);
    }

    React.useEffect(() => {
        if (!initialized) {
            setCurrentGame(gameGenerator.conwayGenerator(20, 20))
            setInitialized(true);
        }
    }, [initialized])

    React.useEffect(() => {
        if (initialized) setTimeout(() => {if (!isPaused && !isPausedRef.current) nextTick()}, 0)
    }, [currentTick, isPaused, initialized])

    return (<React.Fragment>
        <div>t = {currentTick}</div>
        <Button onClick={() => {setIsPaused(!isPaused); isPausedRef.current = !isPaused;}}>Paused: {isPaused.toString()}</Button>
        { 
            currentTick !== 0 ? <Graph
                graph={{nodes: [], edges: []}}
                options={{
                    layout: {
                      hierarchical: false,
                      improvedLayout: false
                    },
                    edges: {
                      color: "#000000"
                    },
                    height: "500px",
                    physics: {
                        enabled: false,
                    }
                  }}
                getNetwork={(network: any) => {myNetwork.current = network;}}
            /> : console.log("1")
        }
    </React.Fragment>)
}