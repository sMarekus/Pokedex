import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import { fetchPokemons } from '../services/pokemonService';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';

function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(20);

    useEffect(() => {
        const initFetch = async () => {
        const results = await fetchPokemons();
        setPokemons(results);
        };

        initFetch();
    }, []);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    }

    return (
        <>
            <div className="flex">
                <div className="container mx-auto py-12">
                    <h1 className="font-orbitron text-5xl">Pokédex</h1>
                </div>
            </div>
            <div className="flex">
                <div className="container mx-auto pb-8">
                    <div className="grid grid-cols-4 gap-4">
                    {pokemons.slice(first, first + rows).map((pokemon, index) => (
                        <PokemonCard key={index} index={first + index + 1} pokemon={pokemon} />
                    ))}
                    </div>
                    <Paginator className="pt-8" first={first} rows={rows} totalRecords={pokemons.length} onPageChange={onPageChange} />
                </div>
            </div>
        </>
    );
}

export default PokemonList;
