import './App.css';
import React, { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import { fetchPokemons } from './services/pokemonService';

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const initFetch = async () => {
      const results = await fetchPokemons();
      setPokemons(results);
    };

    initFetch();
  }, []);

  return (
    <div className="flex">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-4">
          {pokemons.map((pokemon, index) => (
            <PokemonCard key={index + 1} index={index + 1} pokemon={pokemon} />
          ))}
        </div>  
      </div>
    </div>
  );
}

export default App;
