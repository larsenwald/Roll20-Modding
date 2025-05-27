/* Abilities */
const ABILITY_NAMES = [
  "Strength", "Dexterity", "Constitution",
  "Intelligence", "Wisdom", "Charisma"
];

const abilityScoreBase = 10;

const makeAbility = name => ({
  name,
  score: abilityScoreBase,
  modifiers: [], //each element of the array will be an object with a modifier name and value, and the value could be positive or negative. Maybe it should also hold a source?
  saveProficiency: false
});

const abilityScores = ABILITY_NAMES.map(makeAbility); //creates an array of ability objects that have name, score, and modifiers key-value pairs


/* Skills */
const SKILL_DEFS = {
  Acrobatics:       "Dexterity",
  AnimalHandling:   "Wisdom",
  Arcana:           "Intelligence",
  Athletics:        "Strength",
  Deception:        "Charisma",
  History:          "Intelligence",
  Insight:          "Wisdom",
  Intimidation:     "Charisma",
  Investigation:    "Intelligence",
  Medicine:         "Wisdom",
  Nature:           "Intelligence",
  Perception:       "Wisdom",
  Performance:      "Charisma",
  Persuasion:       "Charisma",
  Religion:         "Intelligence",
  SleightOfHand:    "Dexterity",
  Stealth:          "Dexterity",
  Survival:         "Wisdom"
};

// starts as an “empty sheet”
const skillProfs = Object.fromEntries(
  Object.keys(SKILL_DEFS).map(k => [k, "none"])
);





//Helpers
function getIndexBy(arr, key, value) {
    return arr.findIndex(obj => obj[key] === value);
}

// how many × proficiency each category grants
const PROFICIENCY_MULT = {
  none:   0,
  half:   0.5,
  normal: 1,
  expert: 2
};