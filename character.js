// ---------------------------------------------------------------------------
// Static “blueprints” – shared by every character, never mutated
// ---------------------------------------------------------------------------
const ABILITY_NAMES = [
  "Strength", "Dexterity", "Constitution",
  "Intelligence", "Wisdom", "Charisma"
];

const SKILL_DEFS = {             // skill ➜ governing ability
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

const abilityScoreBase = 10;
const makeAbility = () => ({
  score: abilityScoreBase,
  modifiers: [],         // {label, value, source}
  saveProficiency: false
});
const makeAbilities  = () =>
  Object.fromEntries(ABILITY_NAMES.map(n => [n, makeAbility()]));

const makeSkillProfs = () =>
  Object.fromEntries(Object.keys(SKILL_DEFS).map(k => [k, "none"]));

// ---------------------------------------------------------------------------
// Character class
// ---------------------------------------------------------------------------
class Character {
  constructor({
    name       = "Unnamed Adventurer",
    level      = 1,
    abilities  = {},       // allow you to override defaults
    skills     = {},
    profs      = {},
    inventory  = {},
    attune     = {},
  } = {}) {

    // ---- Abilities (new object per character, not shared) ----
    this.abilities = makeAbilities();
    for (const [ability, data] of Object.entries(abilities)) {
      Object.assign(this.abilities[ability], data);
    }

    // ---- Skills ----
    this.skillProfs = makeSkillProfs();
    Object.assign(this.skillProfs, skills);      // e.g. {Stealth:"expert"}

    // ---- Proficiencies ----
    this.proficiencies = {
      weapons:    [],
      armor:      [],
      tools:      [],
      languages:  [],
      ...profs
    };

    // ---- Misc properties ----
    this.name   = name;
    this.level  = level;

    this.actions = { actions: [], bonusActions: [], reactions: [], other: [] };

    this.inventory = {
      items:    [],
      weight:   0,
      capacity: 0,
      ...inventory
    }; //items that go into the array will be objects with the usual stuff like name & weight, but also their own individual functions that will be pushed to designated event arrays (all game related events, like health changes, actions, etc. will have their own arrays of functions)

    this.attunement = { maxSlots: 3, usedSlots: 0, ...attune };
  }
}

// initialize a new character instance
const character = new Character({
  name: "Larsen's Character",
  level: 1,
});