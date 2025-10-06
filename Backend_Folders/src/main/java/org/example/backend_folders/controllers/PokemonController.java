package org.example.backend_folders.controllers;


import org.example.backend_folders.pokemonEntities.PokeVariableDesc;
import org.example.backend_folders.pokemonEntities.Pokedex;
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

    @GetMapping("/{id}")
    public Optional<PokeVariableDesc> getPokemonById(@PathVariable UUID id) {
        return pokemonService.getPokemonById(id);
    }

    @PostMapping
    public PokeVariableDesc createPokemon(@RequestBody PokeVariableDesc pokemon) {
        return pokemonService.savePokemon(pokemon);
    }

    @DeleteMapping("/{id}")
    public void deletePokemon(@PathVariable UUID id) {
        pokemonService.deletePokemon(id);
    }

}
