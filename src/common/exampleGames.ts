let game1_vertice0: GraphimataVertice = {
    id: 0,
    bidirectionoal: true,
    from: 0,
    to: 1
}

let game1_node0: GraphimataNode = {
    id: 0,
    value: true,
    vertices: [0],
}

let game1_node1: GraphimataNode = {
    id: 1,
    value: false,
    vertices: [0],
}

export const exampleGames: {game1: GraphimataGame} = {
    game1: {
        nodes: [
            game1_node0, game1_node1
        ],
        vertices: [
            game1_vertice0
        ],
    }
}

export const exampleRulesets: {ruleset1: GraphimataRuleset, ruleset2: GraphimataRuleset} = {
    ruleset1: {
        rule: (currentNode: GraphimataNode, game: GraphimataGame) => {
            return currentNode;
        }
    },
    ruleset2: {
        rule: (currentNode: GraphimataNode, game: GraphimataGame) => {
            //let neighbors = currentNode.vertices.length;
            let survivingNeighbors = 0;
            let newNode = JSON.parse(JSON.stringify(currentNode));
            try {
                if (game.nodes[currentNode.id-1].value === true) survivingNeighbors ++;
                if (game.nodes[currentNode.id+1].value === true) survivingNeighbors ++;
                if (game.nodes[currentNode.id+1+game.width!].value === true) survivingNeighbors ++;
                if (game.nodes[currentNode.id-1+game.width!].value === true) survivingNeighbors ++;
                if (game.nodes[currentNode.id+game.width!].value === true) survivingNeighbors ++;
                if (game.nodes[currentNode.id+1-game.width!].value === true) survivingNeighbors ++;
                if (game.nodes[currentNode.id-1-game.width!].value === true) survivingNeighbors ++;
                if (game.nodes[currentNode.id-game.width!].value === true) survivingNeighbors ++;
                
            } catch (e) {}
            if (survivingNeighbors === 2 || survivingNeighbors === 3) newNode.value = true; else newNode.value = false;
            return newNode
        }
    },
}