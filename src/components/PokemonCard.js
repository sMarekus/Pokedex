import React from 'react';
import pokemonColors from '../utils/pokemonColors';

function PokemonCard({ pokemon, index }) {
    const pokemonColor = pokemonColors[pokemon.color] || "grey";

    // const pokemonColor = pokemon.color;

    const extraStyle = {
        backgroundColor: pokemonColor
    };

    return (
        <div className="bg-red-500 flex w-full px-4 py-4 rounded-xl" style={extraStyle}>
            <div className="w-3/4 flex justify-center flex-col">
                <span>#{ index }</span>
                <h1 className="text-white font-orbitron">{ pokemon.name }</h1>
            </div>
            <div className="w-1/4 flex items-center">
                <img src={pokemon.image} alt={pokemon.name} />
            </div>
        </div>
    )
}

export default PokemonCard;
