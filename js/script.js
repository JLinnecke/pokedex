const MAX_POKEMON = 151;
const limit = 20; // Anzahl der Pokémon pro Seite
let offset = 0;
let allPokemon = []; // Hier speicherst du alle geladenen Pokémon
let currentDetailIndex = 0;

window.onload = function () {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const container = document.getElementById("pokemon_container");

    // Button ein-/ausblenden
    if (searchTerm.length > 0) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }

    // Nur Pokémon filtern, die mit dem Suchbegriff anfangen
    const filtered = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm)
    );

    container.innerHTML = "";
    filtered.forEach((data) => showPokemonCard(data));
  });

  // Beim ersten Laden:
  loadPokemonBatch();
};


async function loadPokemonBatch() {
  const container = document.getElementById("pokemon_container");

  // Prüfe, ob noch Pokémon zu laden sind
  if (offset >= MAX_POKEMON) return;

  // Berechne, wie viele Pokémon noch geladen werden dürfen
  const actualLimit = Math.min(limit, MAX_POKEMON - offset);
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${actualLimit}`;

  const response = await fetch(url);
  const data = await response.json();

  // Detaildaten holen
  const detailPromises = data.results.map((pokemon) =>
    fetch(pokemon.url).then((res) => res.json())
  );
  const detailsArray = await Promise.all(detailPromises);

  // Karten anzeigen und allPokemon befüllen
  detailsArray.forEach((data) => {
    showPokemonCard(data);
    allPokemon.push(data); // alle geladenen Pokémon sammeln
  });

  // Offset für den nächsten Schwung erhöhen
  offset += actualLimit;
}


function showPreviousPokemon() {
  if (currentDetailIndex > 0) {
    currentDetailIndex--;
    showPokemonDetails(allPokemon[currentDetailIndex]);
  }
}


function showNextPokemon() {
  if (currentDetailIndex < allPokemon.length - 1) {
    currentDetailIndex++;
    showPokemonDetails(allPokemon[currentDetailIndex]);
  }
}