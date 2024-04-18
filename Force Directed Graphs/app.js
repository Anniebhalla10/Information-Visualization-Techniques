"use strict";

function getTutorialInfo() {
    return {
        description: "Graphs are often visualized using node-link diagrams. The position of the graph nodes is usually determined by a layout algorithm. Force-based layout algorithms are based on attracting and repelling forces. Generally, nodes repel from each other and additionally related nodes are attracted to each other.",
        isAnimated: true
    }
}

function draw(two) {
    // get graph data
    let graph = getData().dataEx5;
    // This is where the outermost for-loop of the algorithm is implicitly implemented.
    two.bind('update',
        frameCount => {
            const iteration = frameCount % totalIterations;
            // reset the graph
            if (iteration === 0) {
                graph = getData().dataEx5;
            }

            fdl(graph, iteration);

            // Removes the current graph from the instance's scene
            two.clear();

            // draws the graph
            makeGraph(two, graph)
        });
}

function fdl(graph, iteration) {
    // Task 3: Insert your code.

    var t = cool(iteration)
    // Initialise repulsive forces for all the nodes
    graph.nodes.forEach(v => {
        v.displacement = new Two.Vector(0, 0);
        for (const u of graph.nodes) {
            if (v.nodeID != u.nodeID) {
                var delta = v.position.clone().subtract(u.position);
                var delta_norm = delta.length();
                v.displacement.add(delta.clone().divide(delta_norm).multiply(fr(delta_norm)));
            }
        }
    });

    // Compute attractive forces for the adjacentNodes
    graph.nodes.forEach(v => {
        for (const u of v.adjacentNodes) {
            var delta = v.position.clone().subtract(u.position);
            var delta_norm = delta.length();
            v.displacement.subtract(delta.clone().divide(delta_norm).multiply(fa(delta_norm)));
            u.displacement.add(delta.clone().divide(delta_norm).multiply(fa(delta_norm)));
        }
    });

    graph.nodes.forEach(v => {
        const offset = 10;
        v.position.add(v.displacement.clone().divide(v.displacement.length()).multiply(Math.min(v.displacement.length(), t)));
        v.position.x = Math.min(drawingArea.width - offset, Math.max(offset, v.position.x));
        v.position.y = Math.min(drawingArea.height - offset, Math.max(offset, v.position.y));
    });

}

