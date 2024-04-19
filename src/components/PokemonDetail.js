import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PokemonDetail() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const { data } = response;
            setPokemon(data);
        }

        fetchPokemonDetails();
    }, [name]);

    if (!pokemon) return <div>Loading...</div>;

    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
    )
}

export default PokemonDetail;
