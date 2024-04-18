"use strict";

let metaInfo;

function initPage() {
  //populate page with required elements, e.g., header for title and drawing area
  const main = document.getElementById("main");

  metaInfo = getPracticalInfo(); //should be provided in app.js
  if (!metaInfo)
    metaInfo = { description: "ERROR" };


  const mainTitle = document.createElement("h1");
  mainTitle.style.fontFamily = "sans-serif";
  mainTitle.style.margin = "1rem auto";
  mainTitle.style.textAlign = "center";
  mainTitle.textContent = "Information Visualization "
  main.appendChild(mainTitle);

  document.title = "Information Visualization "


  const groupBlock = document.createElement("h2");
  groupBlock.style.fontFamily = "sans-serif";
  groupBlock.style.margin = "1rem auto";
  groupBlock.style.textAlign = "center";
  groupBlock.style.color = "gray";
  groupBlock.textContent = metaInfo.description;
  main.appendChild(groupBlock);

  const drawingArea = document.createElement("div");
  drawingArea.id = "mainCanvas";
  drawingArea.style.width = "1125px";
  drawingArea.style.height = "1100px";
  drawingArea.style.margin = "4rem auto";
  drawingArea.style.margin = "auto";
  main.appendChild(drawingArea);

  return drawingArea;
}

function start() {
  if (document.getElementById("mainCanvas"))
    return; //already initialized

  const drawingArea = initPage();

  const params = {
    width: 1225,
    height: 1500
  };

  const two = new Two(params);
  two.appendTo(drawingArea);

  //perform drawing instructions, this is defined in app.js
  draw(two);

  // render content, either once or 60 times per second for animated/changeable shapes
  if (metaInfo.isAnimated)
    two.play();
  else
    two.update();
}

function getData() {
  let text = `
   {
      "Bug": [
        {
          "name": "Caterpie",
          "id": 10,
          "type2": "Bug"
        },
        {
          "name": "Metapod",
          "id": 11,
          "type2": "Bug"
        },
        {
          "name": "Pinsir",
          "id": 127,
          "type2": "Bug"
        },
        {
          "name": "Butterfree",
          "id": 12,
          "type2": "Flying"
        },
        {
          "name": "Scyther",
          "id": 123,
          "type2": "Flying"
        },
        {
          "name": "Paras",
          "id": 46,
          "type2": "Grass"
        },
        {
          "name": "Parasect",
          "id": 47,
          "type2": "Grass"
        },
        {
          "name": "Weedle",
          "id": 13,
          "type2": "Poison"
        },
        {
          "name": "Kakuna",
          "id": 14,
          "type2": "Poison"
        },
        {
          "name": "Beedrill",
          "id": 15,
          "type2": "Poison"
        },
        {
          "name": "Venonat",
          "id": 48,
          "type2": "Poison"
        },
        {
          "name": "Venomoth",
          "id": 49,
          "type2": "Poison"
        }
      ],
      "Dragon": [
        {
          "name": "Dratini",
          "id": 147,
          "type2": "Dragon"
        },
        {
          "name": "Dragonair",
          "id": 148,
          "type2": "Dragon"
        },
        {
          "name": "Dragonite",
          "id": 149,
          "type2": "Flying"
        }
      ],
      "Electric": [
        {
          "name": "Pikachu",
          "id": 25,
          "type2": "Electric"
        },
        {
          "name": "Raichu",
          "id": 26,
          "type2": "Electric"
        },
        {
          "name": "Voltorb",
          "id": 100,
          "type2": "Electric"
        },
        {
          "name": "Electrode",
          "id": 101,
          "type2": "Electric"
        },
        {
          "name": "Electabuzz",
          "id": 125,
          "type2": "Electric"
        },
        {
          "name": "Jolteon",
          "id": 135,
          "type2": "Electric"
        },
        {
          "name": "Zapdos",
          "id": 145,
          "type2": "Flying"
        },
        {
          "name": "Magnemite",
          "id": 81,
          "type2": "Steel"
        },
        {
          "name": "Magneton",
          "id": 82,
          "type2": "Steel"
        }
      ],
      "Fairy": [
        {
          "name": "Clefairy",
          "id": 35,
          "type2": "Fairy"
        },
        {
          "name": "Clefable",
          "id": 36,
          "type2": "Fairy"
        },
        {
          "name": "Jigglypuff",
          "id": 39,
          "type2": "Normal"
        },
        {
          "name": "Wigglytuff",
          "id": 40,
          "type2": "Normal"
        },
        {
          "name": "Mr. Mime",
          "id": 122,
          "type2": "Psychic"
        }
      ],
      "Fighting": [
        {
          "name": "Mankey",
          "id": 56,
          "type2": "Fighting"
        },
        {
          "name": "Primeape",
          "id": 57,
          "type2": "Fighting"
        },
        {
          "name": "Machop",
          "id": 66,
          "type2": "Fighting"
        },
        {
          "name": "Machoke",
          "id": 67,
          "type2": "Fighting"
        },
        {
          "name": "Machamp",
          "id": 68,
          "type2": "Fighting"
        },
        {
          "name": "Hitmonlee",
          "id": 106,
          "type2": "Fighting"
        },
        {
          "name": "Hitmonchan",
          "id": 107,
          "type2": "Fighting"
        },
        {
          "name": "Poliwrath",
          "id": 62,
          "type2": "Water"
        }
      ],
      "Fire": [
        {
          "name": "Charmander",
          "id": 4,
          "type2": "Fire"
        },
        {
          "name": "Charmeleon",
          "id": 5,
          "type2": "Fire"
        },
        {
          "name": "Vulpix",
          "id": 37,
          "type2": "Fire"
        },
        {
          "name": "Ninetales",
          "id": 38,
          "type2": "Fire"
        },
        {
          "name": "Growlithe",
          "id": 58,
          "type2": "Fire"
        },
        {
          "name": "Arcanine",
          "id": 59,
          "type2": "Fire"
        },
        {
          "name": "Ponyta",
          "id": 77,
          "type2": "Fire"
        },
        {
          "name": "Rapidash",
          "id": 78,
          "type2": "Fire"
        },
        {
          "name": "Magmar",
          "id": 126,
          "type2": "Fire"
        },
        {
          "name": "Flareon",
          "id": 136,
          "type2": "Fire"
        },
        {
          "name": "Charizard",
          "id": 6,
          "type2": "Flying"
        },
        {
          "name": "Moltres",
          "id": 146,
          "type2": "Flying"
        }
      ],
      "Flying": [
        {
          "name": "Butterfree",
          "id": 12,
          "type2": "Bug"
        },
        {
          "name": "Scyther",
          "id": 123,
          "type2": "Bug"
        },
        {
          "name": "Dragonite",
          "id": 149,
          "type2": "Dragon"
        },
        {
          "name": "Zapdos",
          "id": 145,
          "type2": "Electric"
        },
        {
          "name": "Charizard",
          "id": 6,
          "type2": "Fire"
        },
        {
          "name": "Moltres",
          "id": 146,
          "type2": "Fire"
        },
        {
          "name": "Articuno",
          "id": 144,
          "type2": "Ice"
        },
        {
          "name": "Pidgey",
          "id": 16,
          "type2": "Normal"
        },
        {
          "name": "Pidgeotto",
          "id": 17,
          "type2": "Normal"
        },
        {
          "name": "Pidgeot",
          "id": 18,
          "type2": "Normal"
        },
        {
          "name": "Spearow",
          "id": 21,
          "type2": "Normal"
        },
        {
          "name": "Fearow",
          "id": 22,
          "type2": "Normal"
        },
        {
          "name": "Farfetch'd",
          "id": 83,
          "type2": "Normal"
        },
        {
          "name": "Doduo",
          "id": 84,
          "type2": "Normal"
        },
        {
          "name": "Dodrio",
          "id": 85,
          "type2": "Normal"
        },
        {
          "name": "Zubat",
          "id": 41,
          "type2": "Poison"
        },
        {
          "name": "Golbat",
          "id": 42,
          "type2": "Poison"
        },
        {
          "name": "Aerodactyl",
          "id": 142,
          "type2": "Rock"
        },
        {
          "name": "Gyarados",
          "id": 130,
          "type2": "Water"
        }
      ],
      "Ghost": [
        {
          "name": "Gastly",
          "id": 92,
          "type2": "Poison"
        },
        {
          "name": "Haunter",
          "id": 93,
          "type2": "Poison"
        },
        {
          "name": "Gengar",
          "id": 94,
          "type2": "Poison"
        }
      ],
      "Grass": [
        {
          "name": "Tangela",
          "id": 114,
          "type2": "Grass"
        },
        {
          "name": "Paras",
          "id": 46,
          "type2": "Bug"
        },
        {
          "name": "Parasect",
          "id": 47,
          "type2": "Bug"
        },
        {
          "name": "Bulbasaur",
          "id": 1,
          "type2": "Poison"
        },
        {
          "name": "Ivysaur",
          "id": 2,
          "type2": "Poison"
        },
        {
          "name": "Venusaur",
          "id": 3,
          "type2": "Poison"
        },
        {
          "name": "Oddish",
          "id": 43,
          "type2": "Poison"
        },
        {
          "name": "Gloom",
          "id": 44,
          "type2": "Poison"
        },
        {
          "name": "Vileplume",
          "id": 45,
          "type2": "Poison"
        },
        {
          "name": "Bellsprout",
          "id": 69,
          "type2": "Poison"
        },
        {
          "name": "Weepinbell",
          "id": 70,
          "type2": "Poison"
        },
        {
          "name": "Victreebel",
          "id": 71,
          "type2": "Poison"
        },
        {
          "name": "Exeggcute",
          "id": 102,
          "type2": "Psychic"
        },
        {
          "name": "Exeggutor",
          "id": 103,
          "type2": "Psychic"
        }
      ],
      "Ground": [
        {
          "name": "Sandshrew",
          "id": 27,
          "type2": "Ground"
        },
        {
          "name": "Sandslash",
          "id": 28,
          "type2": "Ground"
        },
        {
          "name": "Diglett",
          "id": 50,
          "type2": "Ground"
        },
        {
          "name": "Dugtrio",
          "id": 51,
          "type2": "Ground"
        },
        {
          "name": "Cubone",
          "id": 104,
          "type2": "Ground"
        },
        {
          "name": "Marowak",
          "id": 105,
          "type2": "Ground"
        },
        {
          "name": "Nidoqueen",
          "id": 31,
          "type2": "Poison"
        },
        {
          "name": "Nidoking",
          "id": 34,
          "type2": "Poison"
        },
        {
          "name": "Geodude",
          "id": 74,
          "type2": "Rock"
        },
        {
          "name": "Graveler",
          "id": 75,
          "type2": "Rock"
        },
        {
          "name": "Golem",
          "id": 76,
          "type2": "Rock"
        },
        {
          "name": "Onix",
          "id": 95,
          "type2": "Rock"
        },
        {
          "name": "Rhyhorn",
          "id": 111,
          "type2": "Rock"
        },
        {
          "name": "Rhydon",
          "id": 112,
          "type2": "Rock"
        }
      ],
      "Ice": [
        {
          "name": "Articuno",
          "id": 144,
          "type2": "Flying"
        },
        {
          "name": "Jynx",
          "id": 124,
          "type2": "Psychic"
        },
        {
          "name": "Dewgong",
          "id": 87,
          "type2": "Water"
        },
        {
          "name": "Cloyster",
          "id": 91,
          "type2": "Water"
        },
        {
          "name": "Lapras",
          "id": 131,
          "type2": "Water"
        }
      ],
      "Normal": [
        {
          "name": "Rattata",
          "id": 19,
          "type2": "Normal"
        },
        {
          "name": "Raticate",
          "id": 20,
          "type2": "Normal"
        },
        {
          "name": "Meowth",
          "id": 52,
          "type2": "Normal"
        },
        {
          "name": "Persian",
          "id": 53,
          "type2": "Normal"
        },
        {
          "name": "Lickitung",
          "id": 108,
          "type2": "Normal"
        },
        {
          "name": "Chansey",
          "id": 113,
          "type2": "Normal"
        },
        {
          "name": "Kangaskhan",
          "id": 115,
          "type2": "Normal"
        },
        {
          "name": "Tauros",
          "id": 128,
          "type2": "Normal"
        },
        {
          "name": "Ditto",
          "id": 132,
          "type2": "Normal"
        },
        {
          "name": "Eevee",
          "id": 133,
          "type2": "Normal"
        },
        {
          "name": "Porygon",
          "id": 137,
          "type2": "Normal"
        },
        {
          "name": "Snorlax",
          "id": 143,
          "type2": "Normal"
        },
        {
          "name": "Jigglypuff",
          "id": 39,
          "type2": "Fairy"
        },
        {
          "name": "Wigglytuff",
          "id": 40,
          "type2": "Fairy"
        },
        {
          "name": "Pidgey",
          "id": 16,
          "type2": "Flying"
        },
        {
          "name": "Pidgeotto",
          "id": 17,
          "type2": "Flying"
        },
        {
          "name": "Pidgeot",
          "id": 18,
          "type2": "Flying"
        },
        {
          "name": "Spearow",
          "id": 21,
          "type2": "Flying"
        },
        {
          "name": "Fearow",
          "id": 22,
          "type2": "Flying"
        },
        {
          "name": "Farfetch'd",
          "id": 83,
          "type2": "Flying"
        },
        {
          "name": "Doduo",
          "id": 84,
          "type2": "Flying"
        },
        {
          "name": "Dodrio",
          "id": 85,
          "type2": "Flying"
        }
      ],
      "Poison": [
        {
          "name": "Ekans",
          "id": 23,
          "type2": "Poison"
        },
        {
          "name": "Arbok",
          "id": 24,
          "type2": "Poison"
        },
        {
          "name": "Nidoran (female)",
          "id": 29,
          "type2": "Poison"
        },
        {
          "name": "Nidorina",
          "id": 30,
          "type2": "Poison"
        },
        {
          "name": "Nidoran (male)",
          "id": 32,
          "type2": "Poison"
        },
        {
          "name": "Nidorino",
          "id": 33,
          "type2": "Poison"
        },
        {
          "name": "Grimer",
          "id": 88,
          "type2": "Poison"
        },
        {
          "name": "Muk",
          "id": 89,
          "type2": "Poison"
        },
        {
          "name": "Koffing",
          "id": 109,
          "type2": "Poison"
        },
        {
          "name": "Weezing",
          "id": 110,
          "type2": "Poison"
        },
        {
          "name": "Weedle",
          "id": 13,
          "type2": "Bug"
        },
        {
          "name": "Kakuna",
          "id": 14,
          "type2": "Bug"
        },
        {
          "name": "Beedrill",
          "id": 15,
          "type2": "Bug"
        },
        {
          "name": "Venonat",
          "id": 48,
          "type2": "Bug"
        },
        {
          "name": "Venomoth",
          "id": 49,
          "type2": "Bug"
        },
        {
          "name": "Zubat",
          "id": 41,
          "type2": "Flying"
        },
        {
          "name": "Golbat",
          "id": 42,
          "type2": "Flying"
        },
        {
          "name": "Gastly",
          "id": 92,
          "type2": "Ghost"
        },
        {
          "name": "Haunter",
          "id": 93,
          "type2": "Ghost"
        },
        {
          "name": "Gengar",
          "id": 94,
          "type2": "Ghost"
        },
        {
          "name": "Bulbasaur",
          "id": 1,
          "type2": "Grass"
        },
        {
          "name": "Ivysaur",
          "id": 2,
          "type2": "Grass"
        },
        {
          "name": "Venusaur",
          "id": 3,
          "type2": "Grass"
        },
        {
          "name": "Oddish",
          "id": 43,
          "type2": "Grass"
        },
        {
          "name": "Gloom",
          "id": 44,
          "type2": "Grass"
        },
        {
          "name": "Vileplume",
          "id": 45,
          "type2": "Grass"
        },
        {
          "name": "Bellsprout",
          "id": 69,
          "type2": "Grass"
        },
        {
          "name": "Weepinbell",
          "id": 70,
          "type2": "Grass"
        },
        {
          "name": "Victreebel",
          "id": 71,
          "type2": "Grass"
        },
        {
          "name": "Nidoqueen",
          "id": 31,
          "type2": "Ground"
        },
        {
          "name": "Nidoking",
          "id": 34,
          "type2": "Ground"
        },
        {
          "name": "Tentacool",
          "id": 72,
          "type2": "Water"
        },
        {
          "name": "Tentacruel",
          "id": 73,
          "type2": "Water"
        }
      ],
      "Psychic": [
        {
          "name": "Abra",
          "id": 63,
          "type2": "Psychic"
        },
        {
          "name": "Kadabra",
          "id": 64,
          "type2": "Psychic"
        },
        {
          "name": "Alakazam",
          "id": 65,
          "type2": "Psychic"
        },
        {
          "name": "Drowzee",
          "id": 96,
          "type2": "Psychic"
        },
        {
          "name": "Hypno",
          "id": 97,
          "type2": "Psychic"
        },
        {
          "name": "Mewtwo",
          "id": 150,
          "type2": "Psychic"
        },
        {
          "name": "Mew",
          "id": 151,
          "type2": "Psychic"
        },
        {
          "name": "Mr. Mime",
          "id": 122,
          "type2": "Fairy"
        },
        {
          "name": "Exeggcute",
          "id": 102,
          "type2": "Grass"
        },
        {
          "name": "Exeggutor",
          "id": 103,
          "type2": "Grass"
        },
        {
          "name": "Jynx",
          "id": 124,
          "type2": "Ice"
        },
        {
          "name": "Slowpoke",
          "id": 79,
          "type2": "Water"
        },
        {
          "name": "Slowbro",
          "id": 80,
          "type2": "Water"
        },
        {
          "name": "Starmie",
          "id": 121,
          "type2": "Water"
        }
      ],
      "Rock": [
        {
          "name": "Aerodactyl",
          "id": 142,
          "type2": "Flying"
        },
        {
          "name": "Geodude",
          "id": 74,
          "type2": "Ground"
        },
        {
          "name": "Graveler",
          "id": 75,
          "type2": "Ground"
        },
        {
          "name": "Golem",
          "id": 76,
          "type2": "Ground"
        },
        {
          "name": "Onix",
          "id": 95,
          "type2": "Ground"
        },
        {
          "name": "Rhyhorn",
          "id": 111,
          "type2": "Ground"
        },
        {
          "name": "Rhydon",
          "id": 112,
          "type2": "Ground"
        },
        {
          "name": "Omanyte",
          "id": 138,
          "type2": "Water"
        },
        {
          "name": "Omastar",
          "id": 139,
          "type2": "Water"
        },
        {
          "name": "Kabuto",
          "id": 140,
          "type2": "Water"
        },
        {
          "name": "Kabutops",
          "id": 141,
          "type2": "Water"
        }
      ],
      "Steel": [
        {
          "name": "Magnemite",
          "id": 81,
          "type2": "Electric"
        },
        {
          "name": "Magneton",
          "id": 82,
          "type2": "Electric"
        }
      ],
      "Water": [
        {
          "name": "Squirtle",
          "id": 7,
          "type2": "Water"
        },
        {
          "name": "Wartortle",
          "id": 8,
          "type2": "Water"
        },
        {
          "name": "Blastoise",
          "id": 9,
          "type2": "Water"
        },
        {
          "name": "Psyduck",
          "id": 54,
          "type2": "Water"
        },
        {
          "name": "Golduck",
          "id": 55,
          "type2": "Water"
        },
        {
          "name": "Poliwag",
          "id": 60,
          "type2": "Water"
        },
        {
          "name": "Poliwhirl",
          "id": 61,
          "type2": "Water"
        },
        {
          "name": "Seel",
          "id": 86,
          "type2": "Water"
        },
        {
          "name": "Shellder",
          "id": 90,
          "type2": "Water"
        },
        {
          "name": "Krabby",
          "id": 98,
          "type2": "Water"
        },
        {
          "name": "Kingler",
          "id": 99,
          "type2": "Water"
        },
        {
          "name": "Horsea",
          "id": 116,
          "type2": "Water"
        },
        {
          "name": "Seadra",
          "id": 117,
          "type2": "Water"
        },
        {
          "name": "Goldeen",
          "id": 118,
          "type2": "Water"
        },
        {
          "name": "Seaking",
          "id": 119,
          "type2": "Water"
        },
        {
          "name": "Staryu",
          "id": 120,
          "type2": "Water"
        },
        {
          "name": "Magikarp",
          "id": 129,
          "type2": "Water"
        },
        {
          "name": "Vaporeon",
          "id": 134,
          "type2": "Water"
        },
        {
          "name": "Poliwrath",
          "id": 62,
          "type2": "Fighting"
        },
        {
          "name": "Gyarados",
          "id": 130,
          "type2": "Flying"
        },
        {
          "name": "Dewgong",
          "id": 87,
          "type2": "Ice"
        },
        {
          "name": "Cloyster",
          "id": 91,
          "type2": "Ice"
        },
        {
          "name": "Lapras",
          "id": 131,
          "type2": "Ice"
        },
        {
          "name": "Tentacool",
          "id": 72,
          "type2": "Poison"
        },
        {
          "name": "Tentacruel",
          "id": 73,
          "type2": "Poison"
        },
        {
          "name": "Slowpoke",
          "id": 79,
          "type2": "Psychic"
        },
        {
          "name": "Slowbro",
          "id": 80,
          "type2": "Psychic"
        },
        {
          "name": "Starmie",
          "id": 121,
          "type2": "Psychic"
        },
        {
          "name": "Omanyte",
          "id": 138,
          "type2": "Rock"
        },
        {
          "name": "Omastar",
          "id": 139,
          "type2": "Rock"
        },
        {
          "name": "Kabuto",
          "id": 140,
          "type2": "Rock"
        },
        {
          "name": "Kabutops",
          "id": 141,
          "type2": "Rock"
        }
      ]
    }
    
   `
  return JSON.parse(text);
}

function getColorMap() {
  const cmap = {}
  cmap["Normal"] = "#AAAA99"
  cmap["Fire"] = "#FF4422"
  cmap["Water"] = "#3399FF"
  cmap["Electric"] = "#FFCC33"
  cmap["Grass"] = "#77CC55"
  cmap["Ice"] = "#66CCFF"
  cmap["Fighting"] = "#BB5544"
  cmap["Poison"] = "#AA5599"
  cmap["Ground"] = "#DDBB55"
  cmap["Flying"] = "#8899FF"
  cmap["Psychic"] = "#FF5599"
  cmap["Bug"] = "#AABB22"
  cmap["Rock"] = "#BBAA66"
  cmap["Ghost"] = "#6666BB"
  cmap["Dragon"] = "#7766EE"
  cmap["Dark"] = "#775544"
  cmap["Steel"] = "#AAAABB"
  cmap["Fairy"] = "#EE99EE"
  return cmap
}

function getTypeAbbrv() {
  const abbrv = {}
  abbrv["Normal"] = "NRM"
  abbrv["Fire"] = "FIR"
  abbrv["Water"] = "WTR"
  abbrv["Electric"] = "ELE"
  abbrv["Grass"] = "GRS"
  abbrv["Ice"] = "ICE"
  abbrv["Fighting"] = "FGT"
  abbrv["Poison"] = "PSN"
  abbrv["Ground"] = "GND"
  abbrv["Flying"] = "FLY"
  abbrv["Psychic"] = "PSY"
  abbrv["Bug"] = "BUG"
  abbrv["Rock"] = "RCK"
  abbrv["Ghost"] = "GHS"
  abbrv["Dragon"] = "DRG"
  abbrv["Dark"] = "DRK"
  abbrv["Steel"] = "STL"
  abbrv["Fairy"] = "FAI"
  return abbrv
}

//make sure that everything is loaded and all functions are ready to call before running framework
window.onload = start;
