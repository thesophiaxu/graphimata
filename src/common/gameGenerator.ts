function randomGameGenerator (nodes: number, vertices: number) {
    let newGame: GraphimataGame = {
        nodes: [],
        vertices: []
    }
    for (let i = 0; i < nodes; ++i) {
        newGame.nodes.push({
            id: i,
            vertices: [],
            value: Math.random() <= 0.5 ? true : false
        });
    }

    for (let i = 0; i < vertices; ++i) {
        newGame.vertices.push({
            id: i,
            from: Math.round(Math.random() * nodes),
            to: Math.round(Math.random() * nodes),
            bidirectionoal: true
        })
    }

    return newGame;

}

function conwayGenerator (height: number, width: number) {
    let newGame: GraphimataGame = {
        nodes: [],
        vertices: [],
        width: width,
        height: height
    }
    for (let i = 0; i < height * width; ++i) {
        newGame.nodes.push({
            id: i,
            vertices: [],
            value: Math.random() <= 0.03 ? true : false,
            x: (Math.floor(i / width)) * 50 + 50,
            y: (i - Math.floor(i / width) * width) * 50 + 50
        });
    }
    let idHead = 0
    for (let i = 0; i < height * width - 1; ++i) {

        let S: GraphimataVertice = {
            id: -1,
            from: i,
            to: i + width,
            bidirectionoal: true
        };

        let E: GraphimataVertice = {
            id: -1,
            from: i,
            to: i + 1,
            bidirectionoal: true
        };

        let SE: GraphimataVertice = {
            id: -1,
            from: i,
            to: i + width + 1,
            bidirectionoal: true
        };

        let SW: GraphimataVertice = {
            id: -1,
            from: i,
            to: i + width - 1,
            bidirectionoal: true
        };
        
        if (i + width >= width * height) {
            E.id = idHead++; newGame.vertices.push(E);
            newGame.nodes[i].vertices.push(E.id); newGame.nodes[i+1].vertices.push(E.id); 
        } else if (Math.round(i / width) === i / width) {
            console.log(newGame.nodes, i)
            S.id = idHead++; newGame.vertices.push(S);
            newGame.nodes[i].vertices.push(S.id); newGame.nodes[i+width].vertices.push(S.id); 
            E.id = idHead++; newGame.vertices.push(E);
            newGame.nodes[i].vertices.push(E.id); newGame.nodes[i+1].vertices.push(E.id); 
            SE.id = idHead++; newGame.vertices.push(SE);
            newGame.nodes[i].vertices.push(SE.id); newGame.nodes[i+1+width].vertices.push(SE.id); 
        } else if (Math.round((i+1)/width) === (i+1)/width) {
            S.id = idHead++; newGame.vertices.push(S);
            newGame.nodes[i].vertices.push(S.id); newGame.nodes[i+width].vertices.push(S.id); 
            SW.id = idHead++; newGame.vertices.push(SW);
            newGame.nodes[i].vertices.push(SW.id); newGame.nodes[i-1+width].vertices.push(SW.id); 
        } else {
            S.id = idHead++; newGame.vertices.push(S);
            newGame.nodes[i].vertices.push(S.id); newGame.nodes[i+width].vertices.push(S.id); 
            E.id = idHead++; newGame.vertices.push(E);
            newGame.nodes[i].vertices.push(E.id); newGame.nodes[i+1].vertices.push(E.id); 
            SE.id = idHead++; newGame.vertices.push(SE);
            newGame.nodes[i].vertices.push(SE.id); newGame.nodes[i+1+width].vertices.push(SE.id); 
            SW.id = idHead++; newGame.vertices.push(SW);
            newGame.nodes[i].vertices.push(SW.id); newGame.nodes[i-1+width].vertices.push(SW.id); 
        }

    }
    return newGame;
}

export const gameGenerator = {
    randomGameGenerator,
    conwayGenerator
}