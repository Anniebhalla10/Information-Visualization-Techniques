"use strict";


function getTutorialInfo() {
  return {
    description: "An exemplary application for magic lenses is to show additional information about data close to the mouse cursor when moving it over a visualization. For this to work, we need to be able to query which data is within a specified radius r of the cursor position.",
  }
}

// feel free to tweak this DURING TESTING
const quadtreeMaxDepth = 10;

/**
 * Initialize the quadtree.
 *
 * @param circles: Array<Two.Circle>: The array of data to add to the quadtree.
 *                                    Each datum is a `Two.Circle` object. Its
 *                                    position is stored in its `position`
 *                                    property, which is a `Two.Vector` with an
 *                                    `x` and `y` value.
 * @param x0: number:                 left boundary
 * @param x1: number:                 right boundary
 * @param y0: number:                 upper boundary
 * @param y1: number:                 lower boundary
 *
 * @return: any:                      The quadtree root node. The shape of this
 *                                    object is up to you. This is the same
 *                                    object that will be passed to
 *                                    `getQuadtreeAreas` and
 *                                    `getClosestCircles`.
 */
function initQuadtree(circles, x0, x1, y0, y1) {
  // TODO:
  const bounds = { x0, x1, y0, y1 };
  return buildQuadtree(circles, bounds, 0);
}

function isCircleInBounds(circle, bounds) {
  const { x, y } = circle.position;
  return x >= bounds.x0 && x <= bounds.x1 && y >= bounds.y0 && y <= bounds.y1;
}


function splitBounds(b) {
  const xMid = (b.x0 + b.x1) / 2;
  const yMid = (b.y0 + b.y1) / 2;

  const topLeft = { x0: b.x0, x1: xMid, y0: b.y0, y1: yMid };
  const topRight = { x0: xMid, x1: b.x1, y0: b.y0, y1: yMid };
  const bottomLeft = { x0: b.x0, x1: xMid, y0: yMid, y1: b.y1 };
  const bottomRight = { x0: xMid, x1: b.x1, y0: yMid, y1: b.y1 };

  return [topLeft, topRight, bottomLeft, bottomRight];
}

function buildQuadtree(data, bounds, depth) {
  if (depth === quadtreeMaxDepth || data.length <= 1) {
    return { type: 'leaf', data, bounds };
  }

  const childrenBounds = splitBounds(bounds);
  const childrenNodes = childrenBounds.map(childBounds => {
    const childData = data.filter(circle => isCircleInBounds(circle, childBounds));
    return buildQuadtree(childData, childBounds, depth + 1);
  });

  return { type: 'node', children: childrenNodes, bounds };
}

/**
 * Get all quadtree boundary squares.
 *
 * @param quadtreeRoot: any:  The root of the quadtree, as returned by
 *                            `initQuadtree`
 *
 * @return: Array<{ x0: number, x1: number, y0: number, y1: number }>:
 *                            An array of objects with the minimal and maximal
 *                            x and y values for each node of the quadtree (not
 *                            only the leaves!). The return value will be used
 *                            to draw the squares.
 */
function getQuadtreeAreas(quadtreeRoot) {
  const areas = [];

  function traverse(node) {
    areas.push(node.bounds);

    if (node.type === 'node') {
      for (const child of node.children) {
        traverse(child);
      }
    }
  }

  traverse(quadtreeRoot);
  return areas;
}

/**
 * Find candidates for data (`Two.Circle` objects) within `radius` of (`x`,`y`).
 *
 * @param quadtreeRoot: any:    The root of the quadtree, as returned by
 *                              `initQuadtree`
 * @param x: number:            The x coordinate component
 * @param y: number:            The y coordinate component
 * @param radius: number:       The radius within which to return results.
 *
 * @return: Array<Two.Circle>:  An array of the data which *could be* within that
 *                              radius. Specifically, all data from all
 *                              quadtree leaves that at least partially lie
 *                              within the radius.
 */
function quadtreeSearchAround(quadtreeRoot, x, y, radius) {
  // TODO: implement search in quadtree
  const candidates = [];

  function search(node) {
    if (node.type === 'leaf') {
      for (const circle of node.data) {
        const distanceSquared = (circle.position.x - x) ** 2 + (circle.position.y - y) ** 2;
        // if the circle is inside the square ABCD that has a side 2r
        if (distanceSquared <= (2 * radius) ** 2) {
          candidates.push(circle);
        }
      }
    } else {
      for (const child of node.children) {
        search(child);
      }

    }
  }

  search(quadtreeRoot);
  return candidates;
}