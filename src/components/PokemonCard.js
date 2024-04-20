import React from 'react';
import pokemonColors from '../utils/pokemonColors';
import { useNavigate } from 'react-router-dom';

function PokemonCard({ pokemon, index }) {
    const navigate = useNavigate();
    const pokemonColor = pokemonColors[pokemon.color] || "grey";

    // const pokemonColor = pokemon.color;

    const extraStyle = {
        backgroundColor: pokemonColor
    };

    const navigateToPokemon = () => {
        navigate(`/${pokemon.name}`);
    };

    return (
        <div className="bg-red-500 flex w-full px-4 py-4 rounded-xl" style={extraStyle} onClick={ navigateToPokemon }>
            <div className="w-3/4 flex justify-center flex-col">
                <span className="text-[#0C0C0C] font-mono">#{ index }</span>
                <h1 className="text-white font-orbitron capitalize">{ pokemon.name }</h1>
            </div>
            <div className="w-1/4 flex items-center">
                <img src={pokemon.image} alt={pokemon.name} />
            </div>
        </div>
    )
}

export default PokemonCard;
