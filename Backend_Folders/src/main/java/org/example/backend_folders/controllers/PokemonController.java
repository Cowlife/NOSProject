package org.example.backend_folders.controllers;


import org.example.backend_folders.pokemonEntities.NamedAPIResource;
import org.example.backend_folders.pokemonEntities.Pokedex;
import org.example.backend_folders.pokemonEntities.Pokemon;
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

    @GetMapping("/id/{id}")
    public Optional<NamedAPIResource> getPokemonById(@PathVariable String id) {
        return pokemonService.getPokemonById(id);
    }

    @GetMapping("/types")
    public Pokedex getAllTypes(){
        return pokemonService.getAllTypes();
    }

    @PostMapping
    public NamedAPIResource createPokemon(@RequestBody NamedAPIResource pokemon) {
        return pokemonService.savePokemon(pokemon);
    }

    @DeleteMapping("/{id}")
    public void deletePokemon(@PathVariable String id) {
        pokemonService.deletePokemon(id);
    }

}
