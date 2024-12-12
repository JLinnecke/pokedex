async function initPokedex() {
  for (let i = 1; i <= 25; i++) {
    await loadPokemon(i);
  }
}

async function loadPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  const pokemon = {
    name: data.name,
    id: data.id,
    sprite: data.sprites.other.home.front_default,
    types: data.types.map(type => type.type.name),
  };
  console.log(pokemon);
  displayPokemon(pokemon);
  displayFullData(data);
}

function displayPokemon(pokemon) {
  const pokedex = document.getElementById('pokedex');
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');
  pokemonCard.innerHTML = `
    <h2>${pokemon.id}. ${pokemon.name}</h2>
    <img src="${pokemon.sprite}" alt="${pokemon.name}">
    <div class="pokemon-types">
      ${pokemon.types.join(', ')}
    </div>
  `;
  pokedex.appendChild(pokemonCard);
}

function displayFullData(data) {
  const fullDataElement = console.log(data);
}

document.addEventListener('DOMContentLoaded', initPokedex);