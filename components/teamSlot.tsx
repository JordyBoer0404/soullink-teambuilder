import React from "react";

import Image from "next/image";

type Pokemon = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
};

type TeamSlotProps = {
  pokemon: Pokemon | null;
  index: number;
};

const TeamSlot = ({ pokemon, index }: TeamSlotProps) => {
  return (
    <div className="w-full h-25 ring-2 ring-foreground rounded-2xl">
      {pokemon ? (
        <div className="flex flex-row w-full gap-1 h-full justify-between">
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
            <p>{index + 1}</p>
            <p>{pokemon.name}</p>
            <p>{pokemon.types.join("/")}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-2 text-xs text-right">
          <p>{index + 1}</p>
        </div>
      )}
    </div>
  );
};

export default TeamSlot;
