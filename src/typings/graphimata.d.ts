
declare type GraphimataNode = {
    name?: string,
    id: number,
    value: boolean,
    vertices: number[],
    x?: number,
    y?: number
}

declare type GraphimataVertice = {
    id: number,
    description?: string,
    from: number,
    to: number,
    bidirectionoal: boolean
}

declare type GraphimataRuleset = {
    rule: ((currentNode: GraphimataNode, game: GraphimataGame) => GraphimataNode)
}

declare type GraphimataGame = {
    nodes: GraphimataNode[],
    vertices: GraphimataVertice[],
    width?: number,
    height?: number
}