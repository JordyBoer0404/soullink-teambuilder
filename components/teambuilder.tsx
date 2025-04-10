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
  const [links, setLinks] = React.useState<[Pokemon, Pokemon][]>([]);

  const [myTeam, setMyTeam] = React.useState<Pokemon[]>([]);
  const [friendTeam, setFriendTeam] = React.useState<Pokemon[]>([]);

  useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem("allLinks") || "[]");
    const myteam = JSON.parse(localStorage.getItem("myTeam") || "[]");
    const friendteam = JSON.parse(localStorage.getItem("friendTeam") || "[]");
    setLinks(savedLinks);
    setMyTeam(myteam);
    setFriendTeam(friendteam);
  }, []);

  useEffect(() => {
    if (links.length >= 0) {
      localStorage.setItem("allLinks", JSON.stringify(links));
    }
  }, [links]);

  useEffect(() => {
    localStorage.setItem("myTeam", JSON.stringify(myTeam));
    localStorage.setItem("friendTeam", JSON.stringify(friendTeam));
  }, [myTeam, friendTeam]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Pokemon | null>(null);

  const [open2, setOpen2] = React.useState(false);
  const [value2, setValue2] = React.useState<Pokemon | null>(null);

  function addLink() {
    if (value && value2) {
      setLinks((prevLinks) => [...prevLinks, [value, value2]]);
      setValue(null);
      setValue2(null);
    }
  }

  function deleteLink(link: [Pokemon, Pokemon]) {
    const newLinks = links.filter((l) => l[0] != link[0] && l[1] != link[1]);
    setLinks(newLinks);
    removeLinkFromTeam(link);
  }

  function addLinkToTeam(link: [Pokemon, Pokemon]): void {
    const myPokemon = link[0];
    const friendPokemon = link[1];

    if (
      myTeam.some((p) => p.id === myPokemon.id) ||
      friendTeam.some((p) => p.id === friendPokemon.id)
    ) {
      return;
    }

    setMyTeam((prevTeam) => {
      if (prevTeam.length >= 6) {
        return prevTeam;
      }

      return [...prevTeam, myPokemon];
    });

    setFriendTeam((prevTeam) => {
      if (prevTeam.length >= 6) {
        return prevTeam;
      }

      return [...prevTeam, friendPokemon];
    });
  }

  function removeLinkFromTeam(link: [Pokemon, Pokemon]): void {
    const myNewTeam = myTeam.filter((p) => p.id != link[0].id);
    setMyTeam(myNewTeam);

    const FriendNewTeam = friendTeam.filter((p) => p.id != link[1].id);
    setFriendTeam(FriendNewTeam);
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p>Create Soullink</p>
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
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <p>Soullink Box</p>
          <div className="flex flex-col gap-2 h-[400px] bg-card rounded-3xl w-full overflow-auto no-scrollbar p-2">
            {links.map((link, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 ring-2 ring-foreground p-2 rounded-2xl"
              >
                <div className="flex flex-row gap-1 items-center">
                  <Image
                    src={link[0].sprite}
                    alt="First Pokemon"
                    width={100}
                    height={100}
                  />
                  <p>{link[0].name}</p>
                  <p className="text-slate-500">{link[0].types.join("/")}</p>
                  <Image
                    src={link[1].sprite}
                    alt="Second Pokemon"
                    width={100}
                    height={100}
                  />
                  <p>{link[1].name}</p>
                  <p className="text-slate-500">{link[1].types.join("/")}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <Button
                    className="w-fit"
                    variant={"destructive"}
                    onClick={() => deleteLink(link)}
                  >
                    Delete Link
                  </Button>
                  {myTeam.some((p) => p.id === link[0].id) &&
                  friendTeam.some((p) => p.id === link[1].id) ? (
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

      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row gap-2">
          {Array.from({ length: 6 }).map((_, index) =>
            myTeam[index] ? (
              <div
                key={index}
                className="w-fit h-fit ring-1 ring-foreground p-2 rounded-2xl"
              >
                <Image
                  src={myTeam[index].sprite}
                  alt="Team Pokemon"
                  width={100}
                  height={100}
                />
              </div>
            ) : (
              <div
                key={index}
                className="w-fit h-fit ring-1 ring-foreground p-2 rounded-2xl"
              >
                <p>empty</p>
              </div>
            )
          )}
        </div>
        <div className="flex flex-row gap-2">
          {Array.from({ length: 6 }).map((_, index) =>
            friendTeam[index] ? (
              <div
                key={index}
                className="w-fit h-fit ring-1 ring-foreground p-2 rounded-2xl"
              >
                <Image
                  src={friendTeam[index].sprite}
                  alt="Friend Team pokemon"
                  width={100}
                  height={100}
                />
              </div>
            ) : (
              <div
                key={index}
                className="w-fit h-fit ring-1 ring-foreground p-2 rounded-2xl"
              >
                <p>empty</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Teambuilder;
