package org.example.backend_folders.controllers;


import org.example.backend_folders.pokemonEntities.*;
import org.example.backend_folders.services.PokemonService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/pokemon")
public class PokemonController {


    private final PokemonService pokemonService;

    public PokemonController(PokemonService pokemonService) {
        this.pokemonService = pokemonService;
    }

    @GetMapping
    public Pokedex getPokemon() {
        return pokemonService.getAllPokemon();
    }

    @GetMapping("/name/{name}")
    public Pokemon getPokemonByName(@PathVariable String name) {
        return pokemonService.getPokemonElementsByName(name);
    }

    @GetMapping("/types")
    public Pokedex getAllTypes(){
        return pokemonService.getAllTypes();
    }

    @GetMapping("/type/{type}")
    public AllPokemonTypeRef getAllPokemonByType(@PathVariable String type){
        return pokemonService.getAllPokemonByType(type);
    }

    @GetMapping("/moves/{name}")
    public MoveLong getPokemonMoveInfo(@PathVariable String name){
        return pokemonService.getMoveInfo(name);
    }

}
