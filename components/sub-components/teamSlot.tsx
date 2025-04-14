import React from "react";

import Image from "next/image";
import { Pokemon } from "@/types/pokemon";

type TeamSlotProps = {
  pokemon: Pokemon | null;
  index: number;
};

const fromTypeColors: Record<string, string> = {
  normal: "from-normal",
  fire: "from-fire",
  water: "from-water",
  grass: "from-grass",
  electric: "from-electric",
  ice: "from-ice",
  psychic: "from-psychic",
  dark: "from-dark",
  fairy: "from-fairy",
  dragon: "from-dragon",
  rock: "from-rock",
  ground: "from-ground",
  poison: "from-poison",
  fighting: "from-fighting",
  bug: "from-bug",
  ghost: "from-ghost",
  steel: "from-steel",
  flying: "from-flying",
};

const getFromTypeColor = (type: string) =>
  fromTypeColors[type.toLowerCase()] || "from-card";

const toTypeColors: Record<string, string> = {
  normal: "to-normal",
  fire: "to-fire",
  water: "to-water",
  grass: "to-grass",
  electric: "to-electric",
  ice: "to-ice",
  psychic: "to-psychic",
  dark: "to-dark",
  fairy: "to-fairy",
  dragon: "to-dragon",
  rock: "to-rock",
  ground: "to-ground",
  poison: "to-poison",
  fighting: "to-fighting",
  bug: "to-bug",
  ghost: "to-ghost",
  steel: "to-steel",
  flying: "to-flying",
};

const getToTypeColor = (type: string) =>
  toTypeColors[type.toLowerCase()] || "to-card";

const TeamSlot = ({ pokemon, index }: TeamSlotProps) => {
  return (
    <div>
      {pokemon ? (
        <div
          className={`flex flex-row border-3 border-card ring ring-foreground ring-offset-1 rounded-2xl w-full h-25 gap-1 justify-between bg-gradient-to-br ${getFromTypeColor(
            pokemon.types[0]
          )} from-70% ${getToTypeColor(pokemon.types[1] || "")} to-70%`}
        >
          <div>
            <Image
              className="h-20 w-20"
              src={pokemon.sprite}
              alt="Team Pokemon"
              width={75}
              height={75}
            />
          </div>
          <div className="flex flex-col p-2 text-right text-xs justify-between">
            <p className="text-shadow-md/80">{index + 1}</p>
            <p className="text-shadow-md/80">{pokemon.name}</p>
            <p className="text-shadow-md/80">{pokemon.types.join("/")}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col border-3 border-card ring ring-foreground ring-offset-1 rounded-2xl w-full h-25 p-2 text-xs text-right">
          <p>{index + 1}</p>
        </div>
      )}
    </div>
  );
};

export default TeamSlot;
