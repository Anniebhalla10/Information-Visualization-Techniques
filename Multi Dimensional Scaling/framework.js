"use strict";

let metaInfo;
let main;

// Total number of iterations
const totalIterations = 1000;

// Drawing area
const drawingArea = {
  width: 600,
  height: 600
};

function initPage() {
  //populate page with required elements, e.g., header for title and drawing area

  main = document.getElementById("main");
  metaInfo = getTutorialInfo(); //should be provided in app.js
  if (!metaInfo)
    metaInfo = { description: "ERROR" };

  const mainTitle = document.createElement("h1");
  mainTitle.style.fontFamily = "sans-serif";
  mainTitle.style.margin = "1rem auto";
  mainTitle.style.textAlign = "center";
  mainTitle.textContent = "Information Visualization - MDS ";
  main.appendChild(mainTitle);

  document.title = "Information Visualization - MDS ";

  const groupBlock = document.createElement("h2");
  groupBlock.style.fontFamily = "sans-serif";
  groupBlock.style.margin = "1rem auto";
  groupBlock.style.textAlign = "center";
  groupBlock.style.color = "gray";
  groupBlock.textContent = metaInfo.description;
  main.appendChild(groupBlock);

  const drawingAreaContainer = document.createElement("div");
  drawingAreaContainer.id = "mainCanvas";
  drawingAreaContainer.style.width = drawingArea.width + "px";
  drawingAreaContainer.style.height = drawingArea.height + "px";
  drawingAreaContainer.style.margin = "4rem auto";
  main.appendChild(drawingAreaContainer);

  return drawingAreaContainer;
}

function start() {
  if (document.getElementById("mainCanvas"))
    return; //already initialized

  const drawingAreaContainer = initPage();

  const two = new Two(drawingArea);
  two.appendTo(drawingAreaContainer);

  //perform drawing instructions, this is defined in app.js
  draw(two);

  // render content, either once or 60 times per second for animated/changeable shapes
  if (metaInfo.isAnimated)
    two.play();
  else
    two.update();
}

/**
 * This method returns the data items of the iris data set.
 * Each data item consists of 4 attributes (i.e. data set is 4-dimensional).
 * The data item getData().data[i] has the label getData().labels[i] which
 * denotes the iris flower species.
 * @return 
 */
function getData() {
  const res = {};
  res.data = [
    [5.1, 3.5, 1.4, 0.2],
    [4.9, 3.0, 1.4, 0.2],
    [4.7, 3.2, 1.3, 0.2],
    [4.6, 3.1, 1.5, 0.2],
    [5.0, 3.6, 1.4, 0.2],
    [5.4, 3.9, 1.7, 0.4],
    [4.6, 3.4, 1.4, 0.3],
    [5.0, 3.4, 1.5, 0.2],
    [4.4, 2.9, 1.4, 0.2],
    [4.9, 3.1, 1.5, 0.1],
    [5.4, 3.7, 1.5, 0.2],
    [4.8, 3.4, 1.6, 0.2],
    [4.8, 3.0, 1.4, 0.1],
    [4.3, 3.0, 1.1, 0.1],
    [5.8, 4.0, 1.2, 0.2],
    [5.7, 4.4, 1.5, 0.4],
    [5.4, 3.9, 1.3, 0.4],
    [5.1, 3.5, 1.4, 0.3],
    [5.7, 3.8, 1.7, 0.3],
    [5.1, 3.8, 1.5, 0.3],
    [5.4, 3.4, 1.7, 0.2],
    [5.1, 3.7, 1.5, 0.4],
    [4.6, 3.6, 1.0, 0.2],
    [5.1, 3.3, 1.7, 0.5],
    [4.8, 3.4, 1.9, 0.2],
    [5.0, 3.0, 1.6, 0.2],
    [5.0, 3.4, 1.6, 0.4],
    [5.2, 3.5, 1.5, 0.2],
    [5.2, 3.4, 1.4, 0.2],
    [4.7, 3.2, 1.6, 0.2],
    [4.8, 3.1, 1.6, 0.2],
    [5.4, 3.4, 1.5, 0.4],
    [5.2, 4.1, 1.5, 0.1],
    [5.5, 4.2, 1.4, 0.2],
    [4.9, 3.1, 1.5, 0.1],
    [5.0, 3.2, 1.2, 0.2],
    [5.5, 3.5, 1.3, 0.2],
    [4.9, 3.1, 1.5, 0.1],
    [4.4, 3.0, 1.3, 0.2],
    [5.1, 3.4, 1.5, 0.2],
    [5.0, 3.5, 1.3, 0.3],
    [4.5, 2.3, 1.3, 0.3],
    [4.4, 3.2, 1.3, 0.2],
    [5.0, 3.5, 1.6, 0.6],
    [5.1, 3.8, 1.9, 0.4],
    [4.8, 3.0, 1.4, 0.3],
    [5.1, 3.8, 1.6, 0.2],
    [4.6, 3.2, 1.4, 0.2],
    [5.3, 3.7, 1.5, 0.2],
    [5.0, 3.3, 1.4, 0.2],
    [7.0, 3.2, 4.7, 1.4],
    [6.4, 3.2, 4.5, 1.5],
    [6.9, 3.1, 4.9, 1.5],
    [5.5, 2.3, 4.0, 1.3],
    [6.5, 2.8, 4.6, 1.5],
    [5.7, 2.8, 4.5, 1.3],
    [6.3, 3.3, 4.7, 1.6],
    [4.9, 2.4, 3.3, 1.0],
    [6.6, 2.9, 4.6, 1.3],
    [5.2, 2.7, 3.9, 1.4],
    [5.0, 2.0, 3.5, 1.0],
    [5.9, 3.0, 4.2, 1.5],
    [6.0, 2.2, 4.0, 1.0],
    [6.1, 2.9, 4.7, 1.4],
    [5.6, 2.9, 3.6, 1.3],
    [6.7, 3.1, 4.4, 1.4],
    [5.6, 3.0, 4.5, 1.5],
    [5.8, 2.7, 4.1, 1.0],
    [6.2, 2.2, 4.5, 1.5],
    [5.6, 2.5, 3.9, 1.1],
    [5.9, 3.2, 4.8, 1.8],
    [6.1, 2.8, 4.0, 1.3],
    [6.3, 2.5, 4.9, 1.5],
    [6.1, 2.8, 4.7, 1.2],
    [6.4, 2.9, 4.3, 1.3],
    [6.6, 3.0, 4.4, 1.4],
    [6.8, 2.8, 4.8, 1.4],
    [6.7, 3.0, 5.0, 1.7],
    [6.0, 2.9, 4.5, 1.5],
    [5.7, 2.6, 3.5, 1.0],
    [5.5, 2.4, 3.8, 1.1],
    [5.5, 2.4, 3.7, 1.0],
    [5.8, 2.7, 3.9, 1.2],
    [6.0, 2.7, 5.1, 1.6],
    [5.4, 3.0, 4.5, 1.5],
    [6.0, 3.4, 4.5, 1.6],
    [6.7, 3.1, 4.7, 1.5],
    [6.3, 2.3, 4.4, 1.3],
    [5.6, 3.0, 4.1, 1.3],
    [5.5, 2.5, 4.0, 1.3],
    [5.5, 2.6, 4.4, 1.2],
    [6.1, 3.0, 4.6, 1.4],
    [5.8, 2.6, 4.0, 1.2],
    [5.0, 2.3, 3.3, 1.0],
    [5.6, 2.7, 4.2, 1.3],
    [5.7, 3.0, 4.2, 1.2],
    [5.7, 2.9, 4.2, 1.3],
    [6.2, 2.9, 4.3, 1.3],
    [5.1, 2.5, 3.0, 1.1],
    [5.7, 2.8, 4.1, 1.3],
    [6.3, 3.3, 6.0, 2.5],
    [5.8, 2.7, 5.1, 1.9],
    [7.1, 3.0, 5.9, 2.1],
    [6.3, 2.9, 5.6, 1.8],
    [6.5, 3.0, 5.8, 2.2],
    [7.6, 3.0, 6.6, 2.1],
    [4.9, 2.5, 4.5, 1.7],
    [7.3, 2.9, 6.3, 1.8],
    [6.7, 2.5, 5.8, 1.8],
    [7.2, 3.6, 6.1, 2.5],
    [6.5, 3.2, 5.1, 2.0],
    [6.4, 2.7, 5.3, 1.9],
    [6.8, 3.0, 5.5, 2.1],
    [5.7, 2.5, 5.0, 2.0],
    [5.8, 2.8, 5.1, 2.4],
    [6.4, 3.2, 5.3, 2.3],
    [6.5, 3.0, 5.5, 1.8],
    [7.7, 3.8, 6.7, 2.2],
    [7.7, 2.6, 6.9, 2.3],
    [6.0, 2.2, 5.0, 1.5],
    [6.9, 3.2, 5.7, 2.3],
    [5.6, 2.8, 4.9, 2.0],
    [7.7, 2.8, 6.7, 2.0],
    [6.3, 2.7, 4.9, 1.8],
    [6.7, 3.3, 5.7, 2.1],
    [7.2, 3.2, 6.0, 1.8],
    [6.2, 2.8, 4.8, 1.8],
    [6.1, 3.0, 4.9, 1.8],
    [6.4, 2.8, 5.6, 2.1],
    [7.2, 3.0, 5.8, 1.6],
    [7.4, 2.8, 6.1, 1.9],
    [7.9, 3.8, 6.4, 2.0],
    [6.4, 2.8, 5.6, 2.2],
    [6.3, 2.8, 5.1, 1.5],
    [6.1, 2.6, 5.6, 1.4],
    [7.7, 3.0, 6.1, 2.3],
    [6.3, 3.4, 5.6, 2.4],
    [6.4, 3.1, 5.5, 1.8],
    [6.0, 3.0, 4.8, 1.8],
    [6.9, 3.1, 5.4, 2.1],
    [6.7, 3.1, 5.6, 2.4],
    [6.9, 3.1, 5.1, 2.3],
    [5.8, 2.7, 5.1, 1.9],
    [6.8, 3.2, 5.9, 2.3],
    [6.7, 3.3, 5.7, 2.5],
    [6.7, 3.0, 5.2, 2.3],
    [6.3, 2.5, 5.0, 1.9],
    [6.5, 3.0, 5.2, 2.0],
    [6.2, 3.4, 5.4, 2.3],
    [5.9, 3.0, 5.1, 1.8]
  ];

  res.labels = [
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica'
  ];
  return res;
}

function getInitialPoints(n) {
  const points = new Array(n);
  for (let i = 0; i < n; i++) {
    const p = {
      position: new Two.Vector(-10 * Math.sin(i * 9 * Math.PI / n), 10 * Math.cos(i * 9 * Math.PI / n)),
      delta: new Two.Vector(0, 0),
      color: 'rgb(0,255,128)',
      linewidth: 1.0
    }
    points[i] = p;
  }
  return points;
}

function getDummyDissimilarities(n) {
  const matrix = new Array(n);
  for (let i = 0; i < n; i++) {
    matrix[i] = new Array(n).fill(0);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = (Math.sin(i) - Math.sin(j)) ** 2 + (Math.cos(i) - Math.cos(j)) ** 2;
    }
  }
  return matrix;
}

/**
 * This method takes a points object and performs rendering with Two.js
 * @param two Two.js scene instance
 * @param points array of point objects
 * @param iteration the current iteration (of MDS)
 */
function drawPoints(two, points, iteration) {
  const DIAMETER = 4;
  // get min,max,range of the points' coordinates 
  const minx = Math.min(...points.map(p => p.position.x));
  const miny = Math.min(...points.map(p => p.position.y));
  const maxx = Math.max(...points.map(p => p.position.x));
  const maxy = Math.max(...points.map(p => p.position.y));
  const rx = maxx - minx;
  const ry = maxy - miny;
  const maxRange = Math.max(rx, ry);

  points.forEach((p) => {
    let x = p.position.x;
    let y = p.position.y;
    // move and scale coordinates to nicely fit to screen
    x -= minx;
    y -= miny;
    x /= maxRange;
    y /= maxRange;
    x *= drawingArea.width - 20;
    y *= drawingArea.height - 20;
    x += 10;
    y += 10;
    // draw circle
    const circle = two.makeCircle(x, y, DIAMETER);
    circle.fill = p.color;
    //circle.stroke = p.color;
    circle.linewidth = p.linewidth;
  });

  two.makeText('iteration: ' + iteration, 2, 12, { size: 10, alignment: "left", stroke: '#888888' });
}

function drawStressText(two, stress) {
  two.makeText('stress: ' + Number(stress).toFixed(2), 2, 24, { size: 10, alignment: "left", stroke: '#888888' });
}

//make sure that everything is loaded and all functions are ready to call before running framework
window.onload = start;
