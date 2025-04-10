import React from "react";
import TeamSlot from "./teamSlot";

type Pokemon = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
};

type TeamProps = {
  team: [string, Pokemon, Pokemon][];
  user: number;
};

const team = ({ team, user }: TeamProps) => {
  return (
    <div className="w-full grid grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, index) =>
        team[index] ? (
          <TeamSlot
            key={index}
            pokemon={user == 1 ? team[index][1] : team[index][2]}
            index={index}
          />
        ) : (
          <TeamSlot key={index} pokemon={null} index={index} />
        )
      )}
    </div>
  );
};

export default team;
