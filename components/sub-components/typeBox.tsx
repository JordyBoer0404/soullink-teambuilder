import { Pokemon } from "@/types/pokemon";
import React from "react";
import TypeBadge from "./typeBadge";

const typeBox = (props: { currentTeam: [string, Pokemon, Pokemon][] }) => {
  const duplicateTypes = getDuplicatePrimaryTypes(props.currentTeam);

  function getDuplicatePrimaryTypes(team: [string, Pokemon, Pokemon][]) {
    const primaryTypes = team.flatMap(([, p1, p2]) => [
      p1.types[0],
      p2.types[0],
    ]);

    const count: Record<string, number> = {};

    for (const type of primaryTypes) {
      count[type] = (count[type] || 0) + 1;
    }

    const duplicates = Object.entries(count)
      .filter(([, num]) => num > 1)
      .map(([type]) => type);

    return duplicates;
  }

  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-4 place-items-center gap-2 bg-card p-4 rounded-2xl">
        {props.currentTeam.map((p, i) => (
          <TypeBadge key={i} type={p[1].types[0]} />
        ))}
        {props.currentTeam.map((p, i) => (
          <TypeBadge key={i} type={p[2].types[0]} />
        ))}
      </div>
      {duplicateTypes.length > 0 && (
        <p className="text-red-500">
          Duplicate primary types in team: {duplicateTypes.join(" / ")}
        </p>
      )}
    </div>
  );
};

export default typeBox;
