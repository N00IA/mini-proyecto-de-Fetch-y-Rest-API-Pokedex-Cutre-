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

    card.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Type: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        <p>HP: ${pokemon.stats.find(stat => stat.stat.name === "hp").base_stat}</p>
        <p>Attack: ${pokemon.stats.find(stat => stat.stat.name === "attack").base_stat}</p>
        <p>Defense: ${pokemon.stats.find(stat => stat.stat.name === "defense").base_stat}</p>
    `;

    return card;
};


document.getElementById("get-btn").addEventListener("click", async () => {
    const text = document.getElementById("pokemon-name").value.toLowerCase();
    const pokemon = await fetchPokemon(text);
    localStorage.setItem("crrentPokemonId", pokemon.id);
    console.log(pokemon.name);
});

document.getElementById("prev-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    const newId = Math.max(currentPokemonId - 1, 1);
    const pokemon = await fetchPokemon(newId);
    console.log(pokemon.name);
});

document.getElementById("next-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    const newId = (currentPokemonId + 1);
    const pokemon = await fetchPokemon(newId);
    console.log(pokemon.name);
});


fetch("https://jsonplaceholder.typicode.com/posts", {
    method: 'POST',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
        title: "title 1",
        body: "lorem ipsum",
        userId: 1,
    }),
}).then(res => res.json())
.then((data)=> console.log(data));