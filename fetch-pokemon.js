const BASE_URL = "https://pokeapi.co/api/v2/";
/*
fetch(BASE_URL + "pokemon/" + 1)
.then((res) => res.json ())
.then((data) => console.log(data));
*/

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedData = await response.json();
        return parsedData;
    } catch (err) {
        console.error(err);
    }
};

const createPokemonCard = (pokemon) => {
    const card = document.createElement("div");
    card.className = "pokemon-card";
    const abilities = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
    card.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Tipo: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        <p>Puntos de Golpe: ${pokemon.stats.find(stat => stat.stat.name === "hp").base_stat}</p>
        <p>Ataque: ${pokemon.stats.find(stat => stat.stat.name === "attack").base_stat}</p>
        <p>Defensa: ${pokemon.stats.find(stat => stat.stat.name === "defense").base_stat}</p>
        <p>Peso: ${pokemon.weight / 10} kg</p>
        <p>Altura: ${pokemon.height / 10} m</p>
        <p>Habilidades: ${abilities}</p> 

    `;

    return card;
};

const displayPokemonCard = (pokemon) => {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = ''; // Clear previous card
    const card = createPokemonCard(pokemon);
    container.appendChild(card);
};


document.getElementById("get-btn").addEventListener("click", async () => {
    const text = document.getElementById("pokemon-name").value.toLowerCase();
    const pokemon = await fetchPokemon(text);
    if (pokemon) {
        localStorage.setItem("currentPokemon", JSON.stringify(pokemon));
        localStorage.setItem("currentPokemonId", pokemon.id);
        displayPokemonCard(pokemon);
    }
});

document.getElementById("prev-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    if (isNaN(currentPokemonId)) return;
    const newId = Math.max(currentPokemonId - 1, 1);
    const pokemon = await fetchPokemon(newId);
    if (pokemon) {
        localStorage.setItem("currentPokemon", JSON.stringify(pokemon));
        localStorage.setItem("currentPokemonId", pokemon.id);
        displayPokemonCard(pokemon);
    }
});

document.getElementById("next-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    if (isNaN(currentPokemonId)) return;
    const newId = (currentPokemonId + 1);
    const pokemon = await fetchPokemon(newId);
    if (pokemon) {
        localStorage.setItem("currentPokemon", JSON.stringify(pokemon));
        localStorage.setItem("currentPokemonId", pokemon.id);
        displayPokemonCard(pokemon);
    }
});

window.addEventListener("load", () => {
    const storedPokemon = JSON.parse(localStorage.getItem("currentPokemon"));
    if (storedPokemon) {
        displayPokemonCard(storedPokemon);
    }
});
