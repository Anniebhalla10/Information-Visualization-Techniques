"use strict";

function getTutorialInfo() {
  return {
    description: "Multidimensional Scaling is a dimensionality reduction method that maps dissimilarity of data items in data space to distance in the projection space (usually 2D space). Each data item is represented by a point pi ∈ R 2 in projection space. ",
    isAnimated: true
  }
}

function draw(two) {
  // get data set
  const dataTable = getData().data;
  const dataLabels = getData().labels;
  const n = dataTable.length;
  // calculate pairwise dissimilarities between data items
  const dissimilarities = calcDissimilarityMatrix(dataTable);
  // get 2D points and show them
  let points = getInitialPoints(n);
  assignPointAppearance(n, dissimilarities, points, dataLabels);
  drawPoints(two, points, 0);
  drawStressText(two, stress_all(n, dissimilarities, points));

  // This is where the outermost for-loop of the algorithm is implicitly implemented.
  two.bind('update',
    frameCount => {
      if (frameCount > totalIterations) {
        two.pause();
        return;
      }
      const iteration = frameCount;

      // reset the points
      if (iteration === 0) {
        points = getInitialPoints(n);
      }

      // assign colors to points
      assignPointAppearance(n, dissimilarities, points, dataLabels);

      // Removes the current drawing from the instance's scene
      two.clear();

      // draws the points
      drawPoints(two, points, iteration)
      drawStressText(two, stress_all(n, dissimilarities, points));

      // calculate gradients and update points
      mdsStep(n, dissimilarities, points);
    });
}

/**
 * Calculates the dissimilarities between data items in dataTable.
 * The resulting matrix contains the distance between dataTable[i] and dataTable[j]
 * at entry matrix[i][j].
 * @param dataTable array of arrays where dataTable[i] is a data point of several dimensions
 * @return dissimilarity matrix
 */
function calcDissimilarityMatrix(dataTable) {
  const n = dataTable.length;
  let matrix = getDummyDissimilarities(n);
  // insert code here (overwrite the dummy values)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = euclideanDistance(dataTable[i], dataTable[j])
    }
  }
  return matrix;
}

/**
 * Calculates the euclidean distance between two high-dimensional vectors
 * @param a array of numbers 
 * @param b other array of numbers
 * @returns distance ||a-b||
 */
function euclideanDistance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += (a[i] - b[i]) ** 2
  }
  return Math.sqrt(sum);
}

/**
 * Computes the pairwise stress for points i and j.
 * @param i index of point
 * @param j index of other point
 * @param dissimilarities dissimilarity matrix D[i][j]
 * @param points array of points (Two.Vector[])
 * @returns pairwise stress (squared difference between dissimilarity and point distance)
 */
function stress_ij(i, j, dissimilarities, points) {
  // insert code here
  var pi = points[i].position;
  var pj = points[j].position;
  var diff = pi.clone().subtract(pj);
  return ((dissimilarities[i][j] - diff.length()) ** 2);
}

/**
 * Computes the overall stress
 * @param n number of points 
 * @param dissimilarities dissimilarity matrix D[i][j]
 * @param points array of points (Two.Vector[])
 * @returns sum of all pairwise stresses
 */
function stress_all(n, dissimilarities, points) {
  var sum = 0;
  // insert code here
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      sum += stress_ij(i, j, dissimilarities, points);
    }
  }
  return sum;
}

/**
 * Computes the gradient of point i.
 * @param i index of the gradient to be calculated
 * @param n number of points 
 * @param dissimilarities dissimilarity matrix D[i][j]
 * @param points array of points (Two.Vector[])
 * @returns the gradient
 */
function gradient_i(i, n, dissimilarities, points) {
  const eps = 1e-8;
  var delta = new Two.Vector(0, 0);
  // insert code here
  var pi = points[i].position;
  for (let j = 0; j < n; j++) {
    if (i != j) {
      var pj = points[j].position;
      var diff = pi.clone().subtract(pj);
      var shift = diff.length() + eps;
      var mul_factor = (1 - (dissimilarities[i][j] / shift));
      delta.add(diff.clone().multiply(mul_factor));
    }
  }

  delta.multiply(2);
  return delta;
}


/**
 * Computes the gradient (according to the MDS stress) for each point
 * and updates the position of each point (in gradient descent fashion).
 * @param n number of points
 * @param dissimilarities dissimilarity matrix D[i][j]
 * @param points array of points 
 */
function mdsStep(n, dissimilarities, points) {
  // insert code here
  var alpha = 0.001;
  for (var i = 0; i < n; i++) {
    var gradient = gradient_i(i, n, dissimilarities, points);
    var pi = points[i].position;
    pi.subtract(gradient.clone().multiply(alpha));
  }
}

/**
 * Assigns a color (and line width) to each point
 * @param n number of points
 * @param dissimilarities dissimilarity matrix D[i][j]
 * @param points array of points
 * @param labels the (class) labels corresponding to the points
 */
function assignPointAppearance(n, dissimilarities, points, labels) {
  // insert code here
  for (let i = 0; i < n; i++) {
    switch (labels[i]) {
      case 'setosa':
        points[i].color = '#e41a1c';
        break;
      case 'virginica':
        points[i].color = '#377eb8';
        break;
      default:
        points[i].color = '#984ea3';
    }
  }
}





