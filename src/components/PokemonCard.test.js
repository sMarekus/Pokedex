import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import PokemonCard from "./PokemonCard";

const testPokemon = {
    name: "bulbasaur",
    color: "green",
    image: "https://example.com/bulbasaur.png"
}

describe('PokemonCard', () => { 
    test('renders PokemonCard component with data', () => {
        render(<PokemonCard pokemon={testPokemon} index={1} />, {wrapper: MemoryRouter});

        expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /bulbasaur/i })).toHaveAttribute('src', 'https://example.com/bulbasaur.png');
        expect(screen.getByText('#1')).toBeInTheDocument();
    });
})
