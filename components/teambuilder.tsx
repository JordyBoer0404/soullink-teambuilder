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
import Team from "./team";

import { v4 as uuidv4 } from "uuid";
import TypeBadge from "./typeBadge";

type Pokemon = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
};

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

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p>Create Link</p>
          <div className="flex flex-row gap-2">
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
            <Button onClick={addLink}>Add link</Button>
          </div>
          <p className="mt-20">Current Primary Types In Teams</p>
          <div className="grid grid-cols-4 gap-2">
            {currentTeam.map((p, i) => (
              <TypeBadge key={i} type={p[1].types[0]} />
            ))}
            {currentTeam.map((p, i) => (
              <TypeBadge key={i} type={p[2].types[0]} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <p>Soullink Box</p>
          <div className="flex flex-col gap-2 h-[300px] bg-card rounded-3xl w-full overflow-auto no-scrollbar p-2">
            {links.map((link, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 ring-2 ring-foreground p-2 rounded-2xl"
              >
                <div className="flex flex-row gap-1 items-center">
                  <Image
                    src={link[1].sprite}
                    alt="First Pokemon"
                    width={100}
                    height={100}
                  />
                  <p>{link[1].name}</p>
                  <p className="text-slate-500">{link[1].types.join("/")}</p>
                  <Image
                    src={link[2].sprite}
                    alt="Second Pokemon"
                    width={100}
                    height={100}
                  />
                  <p>{link[2].name}</p>
                  <p className="text-slate-500">{link[2].types.join("/")}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <Button
                    className="w-fit"
                    variant={"destructive"}
                    onClick={() => deleteLink(link)}
                  >
                    Delete Link
                  </Button>
                  {currentTeam.some((l) => l[0] === link[0]) ? (
                    <Button
                      className="w-fit"
                      variant={"default"}
                      onClick={() => removeLinkFromTeam(link)}
                    >
                      Remove From Team
                    </Button>
                  ) : (
                    <Button
                      className="w-fit"
                      variant={"default"}
                      onClick={() => addLinkToTeam(link)}
                    >
                      Add to team
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full justify-between gap-4">
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
