function showPokemonCard(data) {
  const container = document.getElementById("pokemon_container");

  // Karte als Element erstellen
  const card = document.createElement("div");
  card.className = "pokemon_card";
  card.innerHTML = `
    <img class="pokemon_image" src="${
      data.sprites.other.dream_world.front_default
    }" alt="${data.name}">
    <h2>${data.name}</h2>
    <div class="pokemon_info">
      <p>Height: ${data.height}</p>
      <p>Weight: ${data.weight}</p>
      <p>Types: ${data.types.map((type) => type.type.name).join(", ")}</p>
    </div>
  `;

  // Click-Handler setzen
  card.onclick = () => showPokemonDetails(data);

  // Karte einfügen
  container.appendChild(card);
}

function showPokemonDetails(data) {
  currentDetailIndex = allPokemon.findIndex(p => p.name === data.name);
  const container = document.getElementById("popup");
  container.innerHTML = `
  <div class="arrow_left" onclick="showPreviousPokemon()"><span class="arrow">&lt;</span></div>
    <div class="pokemon_details">
    <button id="closeDetails">&times;</button>
      <h2>${data.name}</h2>
      <img src="${data.sprites.other.dream_world.front_default}" alt="${data.name}">
      <p>Height: ${data.height}</p>
      <p>Weight: ${data.weight}</p>
      <p>Base Experience: ${data.base_experience}</p>
      <p>Types: ${data.types.map((type) => type.type.name).join(", ")}</p>
      <h3>Abilities:</h3>
      <ul>
        ${data.abilities
          .map((ability) => `<li>${ability.ability.name}</li>`)
          .join("")}
      </ul>
    </div>
  <div class="arrow_right" onclick="showNextPokemon()"><span class="arrow">&gt;</span></div>
  `;
  container.classList.add("active");

  // Schließen-Button
  document.getElementById("closeDetails").onclick = () => {
    container.classList.remove("active");
  };
}