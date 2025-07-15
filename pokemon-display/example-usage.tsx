"use client"

import PokemonDisplay from "./pokemon-display"

// Example of how to use the PokemonDisplay component with static data
export default function ExampleUsage() {
  // This is an example of the data structure expected by the PokemonDisplay component
  const examplePokemon = {
    id: 25,
    name: "pikachu",
    height: 4,
    weight: 60,
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        },
      },
    },
    types: [
      {
        type: {
          name: "electric",
        },
      },
    ],
    stats: [
      {
        base_stat: 35,
        stat: {
          name: "hp",
        },
      },
      {
        base_stat: 55,
        stat: {
          name: "attack",
        },
      },
      {
        base_stat: 40,
        stat: {
          name: "defense",
        },
      },
      {
        base_stat: 50,
        stat: {
          name: "special-attack",
        },
      },
      {
        base_stat: 50,
        stat: {
          name: "special-defense",
        },
      },
      {
        base_stat: 90,
        stat: {
          name: "speed",
        },
      },
    ],
    abilities: [
      {
        ability: {
          name: "static",
        },
        is_hidden: false,
      },
      {
        ability: {
          name: "lightning-rod",
        },
        is_hidden: true,
      },
    ],
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pokemon Display Example</h1>
      <PokemonDisplay pokemon={examplePokemon} />
    </div>
  )
}
