"use client";

import React, { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";

import Image from "next/image";
import Team from "./sub-components/team";

import { v4 as uuidv4 } from "uuid";
import { Pokemon } from "@/types/pokemon";
import TypeBox from "./sub-components/typeBox";

type PokemonProps = {
  pokemon: Pokemon[];
};

const Teambuilder = ({ pokemon }: PokemonProps) => {
  const [links, setLinks] = React.useState<[string, Pokemon, Pokemon][]>([]);

  const [currentTeam, setCurrentTeam] = React.useState<
    [string, Pokemon, Pokemon][]
  >([]);

  useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem("allLinks") || "[]");
    const team = JSON.parse(localStorage.getItem("currentTeam") || "[]");
    setLinks(savedLinks);
    setCurrentTeam(team);
  }, []);

  useEffect(() => {
    if (links.length >= 0) {
      localStorage.setItem("allLinks", JSON.stringify(links));
    }
  }, [links]);

  useEffect(() => {
    localStorage.setItem("currentTeam", JSON.stringify(currentTeam));
  }, [currentTeam]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Pokemon | null>(null);

  const [open2, setOpen2] = React.useState(false);
  const [value2, setValue2] = React.useState<Pokemon | null>(null);

  function addLink() {
    if (value && value2) {
      const newLink: [string, Pokemon, Pokemon] = [uuidv4(), value, value2];
      setLinks((prevLinks) => [...prevLinks, newLink]);
      setValue(null);
      setValue2(null);
    }
  }

  function deleteLink(link: [string, Pokemon, Pokemon]) {
    const newLinks = links.filter((l) => l != link);
    setLinks(newLinks);
    removeLinkFromTeam(link);
  }

  function addLinkToTeam(link: [string, Pokemon, Pokemon]): void {
    if (currentTeam.some((l) => l === link)) {
      return;
    }

    setCurrentTeam((prevTeam) => {
      if (prevTeam.length >= 6) {
        return prevTeam;
      }

      return [...prevTeam, link];
    });
  }

  function removeLinkFromTeam(link: [string, Pokemon, Pokemon]): void {
    const myNewTeam = currentTeam.filter((l) => l[0] !== link[0]);
    setCurrentTeam(myNewTeam);
  }

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

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p>Create Link</p>
            <div className="flex flex-col md:flex-row gap-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value
                      ? pokemon.find((p) => p.name === value.name)?.name
                      : "Select your pokemon..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search pokemon..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No pokemon found.</CommandEmpty>
                      <CommandGroup>
                        {pokemon.map((p) => (
                          <CommandItem
                            key={p.id}
                            value={p.name}
                            onSelect={(currentValue) => {
                              const selectedPokemon = pokemon.find(
                                (p) => p.name === currentValue
                              );
                              if (selectedPokemon) {
                                setValue(selectedPokemon);
                              }
                              setOpen(false);
                            }}
                          >
                            {p.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                value?.name === p.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Popover open={open2} onOpenChange={setOpen2}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open2}
                    className="w-[200px] justify-between"
                  >
                    {value2
                      ? pokemon.find((p) => p.name === value2.name)?.name
                      : "Select friends pokemon..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search pokemon..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No pokemon found.</CommandEmpty>
                      <CommandGroup>
                        {pokemon.map((p) => (
                          <CommandItem
                            key={p.id}
                            value={p.name}
                            onSelect={(currentValue) => {
                              const selectedPokemon = pokemon.find(
                                (p) => p.name === currentValue
                              );
                              if (selectedPokemon) {
                                setValue2(selectedPokemon);
                              }
                              setOpen2(false);
                            }}
                          >
                            {p.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                value2?.name === p.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button onClick={addLink} className="w-fit">
                Add link
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Current Primary Types In Teams</p>
            <TypeBox currentTeam={currentTeam} />
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:w-1/2">
          <p>Soullink Box</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-[300px] bg-card rounded-3xl w-full overflow-auto no-scrollbar p-2">
            {links.map((link, i) => (
              <div
                key={i}
                className={`flex flex-col justify-between h-25 gap-1 border-3 border-card ring ring-foreground ring-offset-1 p-2 rounded-2xl bg-gradient-to-br ${getFromTypeColor(
                  link[1].types[0]
                )} from-50% ${getToTypeColor(link[2].types[0])} to-50%`}
              >
                <div className="flex flex-row justify-between gap-1 items-center">
                  <div>
                    <Image
                      src={link[1].sprite}
                      alt="First Pokemon"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] text-shadow-md/80">
                      {link[1].name}
                    </p>
                    <p className="text-[10px] text-shadow-md/80">
                      {link[2].name}
                    </p>
                  </div>
                  <div>
                    <Image
                      src={link[2].sprite}
                      alt="Second Pokemon"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-2 justify-between">
                  <Button
                    className="shadow-md shadow-card"
                    size={"sm"}
                    variant={"destructive"}
                    onClick={() => deleteLink(link)}
                  >
                    Delete
                  </Button>
                  {currentTeam.some((l) => l[0] === link[0]) ? (
                    <Button
                      className="shadow-md shadow-card"
                      size={"sm"}
                      variant={"default"}
                      onClick={() => removeLinkFromTeam(link)}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      className="shadow-md shadow-card"
                      size={"sm"}
                      variant={"default"}
                      onClick={() => addLinkToTeam(link)}
                    >
                      Add
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full justify-between gap-4">
        <div className="flex flex-col w-full gap-2">
          <p>My Team</p>
          <Team team={currentTeam} user={1} />
        </div>
        <div className="flex flex-col w-full gap-2">
          <p>Friends Team</p>
          <Team team={currentTeam} user={2} />
        </div>
      </div>
    </div>
  );
};

export default Teambuilder;
