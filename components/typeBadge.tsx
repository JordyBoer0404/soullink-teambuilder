import React from "react";

const TypeBadge = (props: { type: string }) => {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "normal":
        return "bg-normal border-card/50 text-black";
      case "fire":
        return "bg-fire border-card/50 text-white";
      case "water":
        return "bg-water border-card/50 text-white";
      case "grass":
        return "bg-grass border-card/50 text-white";
      case "electric":
        return "bg-electric border-card/50 text-black";
      case "ice":
        return "bg-ice border-card/50 text-black";
      case "psychic":
        return "bg-psychic border-card/50 text-white";
      case "dark":
        return "bg-dark border-card/50 text-white";
      case "fairy":
        return "bg-fairy border-card/50 text-white";
      case "dragon":
        return "bg-dragon border-card/50 text-white";
      case "rock":
        return "bg-rock border-card/50 text-white";
      case "ground":
        return "bg-ground border-card/50 text-white";
      case "poison":
        return "bg-poison border-card/50 text-white";
      case "fighting":
        return "bg-fighting border-card/50 text-white";
      case "bug":
        return "bg-bug border-card/50 text-black";
      case "ghost":
        return "bg-ghost border-card/50 text-white";
      case "steel":
        return "bg-steel border-card/50 text-black";
      case "flying":
        return "bg-flying border-card/50 text-black";
      default:
        return "bg-card border-card text-black";
    }
  };

  return (
    <div
      className={`w-25 rounded-md border-4 border-double text-center p-1 ${getTypeColor(
        props.type
      )}`}
    >
      <p>{props.type}</p>
    </div>
  );
};

export default TypeBadge;
