"use strict";

function getTutorialInfo() {
    return {
        description: "Visualizing Data in the form of Bar Charts or Stacked Bar Charts. In Addition performing different sorting techniques.",
    };
}

// Array that stores the rectangle instances used to draw the bar chart
let BARS = [];



/**
 * Draws the numbers in the data array as a bar chart.
 * Fills the *BARS* array with Two.js rectangle instances.
 *
 * @param {Two} two - Two.js instance
 * @param {Array} data - Array of numbers
 */
function drawStatic(two, data) {
    let posX = 155;
    const posY = 400;
    const barGap = 5;
    const barWidth = (400 - barGap * (data.length - 1)) / data.length;
    for (const elem of data) {
        const rect = two.makeRectangle(posX, posY - yScale(elem) / 2, barWidth, yScale(elem))
        rect.fill = "blue";
        rect.stroke = "blue";
        BARS.push(rect)
        posX += barGap + barWidth
    }

}

/**
 * 
 */

/**
 * Draws the objects in the data array as a bar chart and fills the *BARS*
 * array with arrays of Two.js rectangle instances.
 * Each item in the data array is an array itself, which contains objects
 * with the following structure:
 * {
 *   category: <number>,
 *   value: <number>
 * }
 *
 * @param {Two} two - Two.js instance
 * @param {Array} data - Array of arrays of objects
 */
function drawStaticStacked(two, data) {

    let posX = 155;
    const posY = 400;
    const barGap = 5;
    const barWidth = (400 - barGap * (data.length - 1)) / data.length;

    for (const seg of data) {
        var segment = []
        var i = 0
        let y = posY
        for (const bar_data of seg) {
            y -= yScale(bar_data.value) / 2
            segment[i] = two.makeRectangle(posX, y, barWidth, yScale(bar_data.value))
            segment[i].fill = getColor(bar_data.category)
            segment[i].stroke = getColor(bar_data.category)
            y -= yScale(bar_data.value) / 2
            i += 1
        }
        var segment_bar = two.makeGroup(...segment);
        BARS.push(segment_bar)
        posX += barGap + barWidth
    }
}

//-----------------------------------------------------------------------------
// Animated Task Functions
//-----------------------------------------------------------------------------

/**
 * Draws the numbers in data as a bar chart by updating the
 * respective bars in the *BARS* array.
 * This function is called each iteration of the sorting algorithm
 * until the data is sorted.
 *
 * @param {Array} data - Array of numbers
 * @param {Array} changes - Array of indices where the algorithm changed sth
 * @param {Array} highlights - Array of indices where the algorithm looked
 */
function drawSorting(data, changes, highlights) {

    let posX = 155;
    const posY = 400;
    const barGap = 5;

    for (const bar_id in BARS) {
        if (changes.length !== 0) {
            if (changes.includes(Number(bar_id))) {
                const changed = BARS[bar_id]
                changed.fill = "red"
                changed.stroke = "red"
                changed.height = yScale(data[bar_id])
                changed.position.y = posY - yScale(data[bar_id]) / 2
            }
        }
        if (highlights.length !== 0) {
            if (!highlights.includes(Number(bar_id))) {
                const highlight = BARS[bar_id]
                highlight.opacity = 0.25
            }
        }
    }

}

/**
 * Draws the objects in data as a bar chart by updating the
 * respective bars in the *BARS* array.
 * Each item in the data array is an array itself, which contains objects
 * with the following structure:
 * {
 *   category: <number>,
 *   value: <number>
 * }
 *
 * This function is called each iteration of the sorting algorithm
 * until the data is sorted.
 *
 * @param {Array} data - Array of arrays of objects
 * @param {Array} changes - Array of indices where the algorithm changed sth
 * @param {Array} highlights - Array of indices where the algorithm looked
 */
function drawSortingStacked(data, changes, highlights) {

    let posX = 155;
    var posY = 400;
    const barGap = 5;

    for (const bar_id in BARS) {
        if (changes.length !== 0) {
            if (changes.includes(Number(bar_id))) {
                const changed = BARS[bar_id]
                changed.stroke = "black"
                const new_data = data[bar_id]
                posY = 400
                for (var i = 0; i < 4; i++) {
                    posY -= yScale(new_data[i].value) / 2
                    changed.children[i].height = yScale(new_data[i].value)
                    changed.children[i].position.y = posY
                    posY -= yScale(new_data[i].value) / 2
                }
            }
        }
        if (highlights.length !== 0) {
            if (!highlights.includes(Number(bar_id))) {
                const highlight = BARS[bar_id]
                highlight.opacity = 0.25
            }
        }
    }

}
