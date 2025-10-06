package org.example.backend_folders.services;

import org.example.backend_folders.pokemonEntities.PokeVariableDesc;
import org.example.backend_folders.pokemonEntities.Pokedex;

import org.example.backend_folders.repositories.PokeVariableDescRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;
import java.util.UUID;

@Service
public class PokemonService {

    private final PokeVariableDescRepository pokeVariableDescRepository;
    String uri = "https://pokeapi.co/api/v2/";

    public PokemonService(PokeVariableDescRepository pokeVariableDescRepository) {
        this.pokeVariableDescRepository = pokeVariableDescRepository;
    }
    public Pokedex getAllPokemon() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Pokedex> forEntity = restTemplate.getForEntity(uri + "pokemon?limit=100000&offset=0", Pokedex.class);
        return forEntity.getBody();
    }

    void getPokemonElementsByName(){

    }

    public Optional<PokeVariableDesc> getPokemonById(UUID id) {
        return pokeVariableDescRepository.findById(id);
    }

    public PokeVariableDesc savePokemon(PokeVariableDesc pokemon) {
        return pokeVariableDescRepository.save(pokemon);
    }

    public void deletePokemon(UUID id) {
        pokeVariableDescRepository.deleteById(id);
    }


}
