"use strict";


function getPracticalInfo() {
    return {
        description: "Icicle plots are a simple and intuitive visualization. They represent hierarchical structures in a clear manner, however readability might not be the best in all situations."
    }
}

/**
 * Calculates and assigns the sum of the children's weights (recursively) to this node.
 * @param {{ name: String, weight: Number|undefined, children Array|undefined }} node - tree node
 */
function sum_weights(node) {
    // TODO: insert code here
    if (node.hasOwnProperty('children')) {
        node.weight = node.children.reduce((sum, childNode) => {
            sum_weights(childNode);
            return sum + childNode.weight;
        }, 0);
    }
    // return node.weight || 0
}


/**
 * Returns the maximum depth of the tree node.
 * @param {{ name: String, weight: Number, children Array|undefined }} node - tree node
 * @returns tree depth
 */
function getTreeDepth(node) {
    let depth = 0;
    node.children?.forEach(child => {
        const tmpDepth = getTreeDepth(child)
        if (tmpDepth > depth) {
            depth = tmpDepth
        }
    });
    return 1 + depth
}

/**
 * Draws a stacked tree with a cartesian layout.
 *
 * @param {Two.js} two - Two.js instance
 * @param {{ name: String, weight: Number, children Array|undefined }} data - root node of the tree
 * @param {Number} width - width of the drawing area
 * @param {Number} height - height of the drawing area
 */
function draw(two, data, width, height) {
    sum_weights(data);
    // TODO: insert code here
    const y = 60;
    const x = width / 2;
    const nodeHeight = height / 5;
    drawIciclePlot(two, data, x, y, width, nodeHeight);
}

function drawIciclePlot(two, node, x, y, width, height) {
    let rectangle = two.makeRectangle(x, y, width, height);

    // check if it is a parent node
    if (node.children) {
        rectangle.fill = 'teal';
    } else {
        rectangle.fill = 'orange';
    }

    let label = two.makeText(node.name, x, y);
    label.rotation = Math.PI / 2;

    // if parent node, recursively call children, changing the width of the children's prorated weight to its parent 
    if (node.children) {
        let currentX = x - width / 2;
        node.children.forEach(child => {
            let childWidth = (child.weight / node.weight) * width;
            drawIciclePlot(two, child, currentX + childWidth / 2, y + height, childWidth, height);
            currentX += childWidth;
        });
    }
}

