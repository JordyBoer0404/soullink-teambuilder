import React from "react";
import Teambuilder from "./teambuilder";
import Error from "./error";

type Pokemon = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
};

const content = async () => {
  let pokemon: Pokemon[] = [];

  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=300&offset=0"
    );
    const data = await res.json();

    pokemon = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();

        const types = details.types.map(
          (t: { type: { name: string } }) => t.type.name
        );

        return {
          id: details.id,
          name: details.name,
          sprite: details.sprites.front_default,
          types,
        } as Pokemon;
      })
    );
  } catch (error) {
    console.log(error);
    return <Error />;
  }

  return (
    <div className="flex flex-col py-8">
      <Teambuilder pokemon={pokemon} />
    </div>
  );
};

export default content;
