const MAX_POKEMON = 151;
const limit = 20; // Anzahl der Pokémon pro Seite
let offset = 0;
let allPokemon = []; // Hier speicherst du alle geladenen Pokémon
let currentDetailIndex = 0;