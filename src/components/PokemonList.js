import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import { fetchPokemons } from '../services/pokemonService';

// PrimeReact Components
import { Paginator } from 'primereact/paginator';
import { Skeleton } from 'primereact/skeleton';

function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(20);

    useEffect(() => {
        const initFetch = async () => {
            setIsLoading(true);
            const results = await fetchPokemons();
            setPokemons(results);
            setIsLoading(false);
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
                    <h1 className="font-orbitron text-5xl text-[#0C0C0C]">Pokédex</h1>
                </div>
            </div>
            <div className="flex">
                <div className="container mx-auto pb-8">
                    { isLoading ? (
                        <div className="grid grid-cols-4 gap-4">
                            {Array.from({length: rows}).map((_, idx) => (
                                <Skeleton key={idx} shape="rectangle" width="100%" height="117px" className="p-mb-2" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 gap-4">
                            {pokemons.slice(first, first + rows).map((pokemon, index) => (
                                <PokemonCard key={index} index={first + index + 1} pokemon={pokemon} />
                            ))}
                        </div>
                    )}
                    <Paginator className="pt-8" first={first} rows={rows} totalRecords={pokemons.length} onPageChange={onPageChange}
                    pt={{
                        pageButton: "",
                    }}
                    />
                </div>
            </div>
        </>
    );
}

export default PokemonList;
