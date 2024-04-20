import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import pokemonColors from '../utils/pokemonColors';
import { useNavigate } from 'react-router-dom';

import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';

function PokemonDetail() {
    const navigate = useNavigate();
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [originalColorName, setOriginalColorName] = useState("");
    const [color, setColor] = useState("grey");
    const [flavorText, setFlavorText] = useState('');

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                const { data } = response;
                setPokemon(data);

                const speciesResponse = await axios.get(data.species.url);
                const speciesData = speciesResponse.data;

                const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en' && entry.version.name === 'ruby').flavor_text;

                setFlavorText(flavorText.replace(/[\n\f]/g, ' '));

                const fetchedColor = speciesData.color.name;
                setOriginalColorName(fetchedColor);
                setColor(pokemonColors[fetchedColor] || "grey");
            } catch (error) {
                console.error("Failed to fetch pokemon details: ", error);
                setPokemon(null);
                setColor("grey");
                setFlavorText('');
            }
        };

        fetchPokemonDetails();
    }, [name]);

    if (!pokemon) return <div>Loading...</div>;

    const backgroundColor = {
        backgroundColor: color
    };

    const borderColor = {
        borderColor: color
    }

    const navigateToHome = () => {
        navigate('/');
    };

    return (
        <>
            <div className="flex h-64" style={backgroundColor}>
                <div className="container mx-auto pt-8">
                    <Button icon="pi pi-arrow-left"
                    pt={{
                        root: "bg-white border-none rounded-full focus:border-none focus:shadow-none",
                    }}
                    style={{ color: color }}
                    onClick={ navigateToHome }
                    />
                </div>
            </div>
            <div className="flex bg-white rounded-t-3xl -mt-7 pb-20">
                <div className="container mx-auto">
                    <div className="flex justify-center">
                        <div className="h-40 w-40 bg-white flex justify-center items-center -mt-20 rounded-full border-4" style={borderColor}>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        </div>
                    </div>
                    <div className="flex pt-16 gap-x-20">
                        <div className="w-1/2 flex flex-col gap-4">
                            <h1 className="text-5xl font-orbitron capitalize text-[#0C0C0C]">{pokemon.name}</h1>
                            <p className="font-sans text-gray-600">{flavorText}</p>
                        </div>
                        <div className="w-1/2 grid grid-cols-2 gap-8 flex-wrap">
                            <div className="bg-gray-100 flex flex-col justify-center items-center h-32 rounded-3xl p-8">
                                <h5 className="text-center uppercase text-gray-600">Weight</h5>
                                <p className="text-center text-3xl text-[#0C0C0C]">{pokemon.weight}kg</p>
                            </div>
                            <div className="bg-gray-100 flex flex-col justify-center items-center h-32 rounded-3xl p-8">
                                <h5 className="text-center uppercase text-gray-600">Height</h5>
                                <p className="text-center text-3xl text-[#0C0C0C]">{pokemon.height}m</p>
                            </div>
                            <div className="bg-gray-100 flex flex-col justify-center items-center h-32 rounded-3xl p-8">
                                <h5 className="text-center uppercase text-gray-600">Base exp</h5>
                                <p className="text-center text-3xl text-[#0C0C0C]">{pokemon.base_experience}</p>
                            </div>
                            <div className="bg-gray-100 flex flex-col justify-center items-center h-32 rounded-3xl p-8">
                                <h5 className="text-center uppercase text-gray-600">Color</h5>
                                <p className="text-center text-3xl text-[#0C0C0C] capitalize">{originalColorName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 pt-8">
                        {pokemon.stats.map((stat) => {
                            const statValue = Math.round((stat.base_stat / 255) * 100);

                            return (
                                <div key={stat.stat.name} className="p-mb-2">
                                    <h5 className="text-gray-600">{stat.stat.name.toUpperCase()}</h5>
                                    <ProgressBar value={statValue} showValue={true} color={color} className="bg-gray-100" />
                                </div>
                            );
                        })} 
                    </div>
                </div>
            </div>
        </>
    )
}

export default PokemonDetail;
