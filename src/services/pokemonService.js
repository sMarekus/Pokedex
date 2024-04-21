import axios from 'axios';

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemons = async (limit = 100) => {
    try {
        const response = await axios.get(`${BASE_URL}?limit=${limit}`);
        const pokemonPromises = response.data.results.map(async (pokemon) => {
            const pokemonRecord = await axios.get(pokemon.url);
            const speciesRecord = await axios.get(pokemonRecord.data.species.url);
            return {
                name: pokemonRecord.data.name,
                image: pokemonRecord.data.sprites.front_default,
                color: speciesRecord.data.color.name
            };
        });
        return await Promise.all(pokemonPromises);
    } catch (error) {
        console.log('Failed to fetch pokemons: ', error);
        return [];
    }
}
