import React from "react";

const TypeBadge = (props: { type: string }) => {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "normal":
        return "bg-normal text-black";
      case "fire":
        return "bg-fire text-white";
      case "water":
        return "bg-water text-white";
      case "grass":
        return "bg-grass text-white";
      case "electric":
        return "bg-electric text-black";
      case "ice":
        return "bg-ice text-black";
      case "psychic":
        return "bg-psychic text-white";
      case "dark":
        return "bg-dark text-white";
      case "fairy":
        return "bg-fairy text-white";
      case "dragon":
        return "bg-dragon text-white";
      case "rock":
        return "bg-rock text-white";
      case "ground":
        return "bg-ground text-white";
      case "poison":
        return "bg-poison text-white";
      case "fighting":
        return "bg-fighting text-white";
      case "bug":
        return "bg-bug text-black";
      case "ghost":
        return "bg-ghost text-white";
      case "steel":
        return "bg-steel text-black";
      case "flying":
        return "bg-flying text-black";
      default:
        return "b text-black";
    }
  };

  return (
    <div
      className={`w-25 rounded-md border-4 border-double border-card/50 text-center p-1 ${getTypeColor(
        props.type
      )}`}
    >
      <p>{props.type}</p>
    </div>
  );
};

export default TypeBadge;
