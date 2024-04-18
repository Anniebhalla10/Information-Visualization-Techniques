"use strict";

const spacing = 10;
const radius = 15;
const labelHeight = 30;
const labelWidth = 50;
const numCircles = 6;
const rectWidth = numCircles * 2 * radius + (numCircles + 1) * spacing;
const rectHeight = numCircles * 2 * radius + (numCircles) * spacing + labelHeight;

function getPracticalInfo() {
  return {
    description: "Implementing a DOT MATRIX CHART. to visualize a Pokemon data set. In the games, Pokemon are assigned to types, such as Grass or Fire, or mixtures of two types (dual type) such as Bug/Poison 2. We visualize what kind of type pairings exist and how common they are within the 1st Pokemon generation consisting of 151 Pokemon. For example Bulbasaur, with type Grass/Poison appears in the group for Grass types and will be shown as a dot with second type Poison, and also vice versa (Poison group with a second type Grass). A single type Pokemon such as Charmander only appears in the group for Fire Pokemon where its second type is the same as its first type. The data set already contains the information in this way, which you can find in framework.js file.",
  };
}

function draw(two) {
  // get data
  const pokemons_per_type = getData();
  const pokemon_types = Object.keys(pokemons_per_type);
  console.log('NUMBER OF TYPES: ' + pokemon_types.length);
  const numCols = 4;
  let typeCount = 0;
  let x = 0;
  let y = 0;

  // draw a background grid (not neccesarily needed)
  // makeBGDots(two);

  // visualizing the data
  /* put your code for part e) here, you can also call and test your functions here */
  for (const type of pokemon_types) {
    const typeRect = makeRectForType(two, type);
    typeRect.translation.set(x, y);
    const mons = pokemons_per_type[type];
    const typeMons = makeCirclesForMons(two, mons);
    typeMons.translation.set(x, y);

    typeCount++;
    if (typeCount % numCols === 0) {
      y += rectHeight;
      x = 0;
    } else {
      x += rectWidth;
    }
  }
}


/**
 * Creates a group that contains a Rectangle and a label in the lower right corner that tells the type.
 * @param {Two} two 
 *    the two.js object to create shapes with
 * @param {String} type 
 *    the pokemon type 
 * @returns a group containing the shapes created by this method
 */
function makeRectForType(two, type) {
  /* put your code for part d) here */
  const rectGroup = two.makeGroup();

  const rect = two.makeRectangle(rectWidth / 2, rectHeight / 2, rectWidth, rectHeight);
  rect.stroke = "black"
  rectGroup.add(rect);

  const labelRect = two.makeRectangle(rectWidth - (labelWidth / 2), rectHeight - (labelHeight / 2), labelWidth, labelHeight);
  labelRect.fill = getColorMap()[type];
  labelRect.stroke = getColorMap()[type];
  rectGroup.add(labelRect);

  const labelText = two.makeText(getTypeAbbrv()[type], rectWidth - (labelWidth / 2), rectHeight - (labelHeight / 2));
  rectGroup.add(labelText);

  return rectGroup;
}


/**
 * Creates a group that contains a circle for each pokemon in the array.
 * The circles are arranged in a 6x6 grid and colored according to the 
 * type2 of the corresponding pokemon.
 * @param {Two} two 
 *    the two.js object to create shapes with
 * @param {Array.<{name: String, id: int, type2: String}>} mons 
 *    the array of pokemons to create circles for
 * @returns a group containing the shapes created by this method
 */
function makeCirclesForMons(two, mons) {
  /* put your code for part c) here */

  const numRows = 6;
  const numColumns = 6;
  const start_x = 15 + spacing;
  const start_y = 15 + spacing;

  const circleGroup = two.makeGroup();

  let x = start_x;
  let y = start_y;
  let circleCount = 0;

  for (const mon of mons) {
    const circle = makeCircleForMon(two, mon);
    circle.translation.set(x, y);
    circleGroup.add(circle);
    x = x + 2 * radius + spacing;
    circleCount++;

    if (circleCount % numColumns === 0) {
      x = start_x;
      y = y + 2 * radius + spacing;
    }
  }
  return circleGroup;
}


/**
 * Creates a group containing a circle that is colored according to the type2 of the pokemon.
 * @param {Two} two
 *    the two.js object to create shapes with
 * @param {{name: String, id: int, type2: String}} mon
 *    the pokemon for which a circle is generated
 * @returns a group containing the shapes created by this method 
 */
function makeCircleForMon(two, mon) {
  /* put your code for part b) here */
  const radius = 15
  const mon_circle = two.makeCircle(0, 0, radius);
  mon_circle.fill = getColorMap()[mon.type2]
  mon_circle.stroke = getColorMap()[mon.type2]
  return mon_circle
}


/**
 * Creates a grid consisting of small dots.
 * @param {Two} two
 *    the two.js object to create shapes with
 * @returns a group containing the shapes created by this method
 */
function makeBGDots(two) {
  const group = two.makeGroup();
  for (var row = 0; row < 50; row++) {
    for (var col = 0; col < 50; col++) {
      const rect = two.makeRectangle(col * 22, row * 22, 1, 1);
      rect.stroke = rect.fill = '#778899'
      group.add(rect);
    }
  }
  group.translation.set(13, 13);
  return group;
}


