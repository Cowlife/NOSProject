package org.example.backend_folders.services;

import org.example.backend_folders.pokemonEntities.NamedAPIResource;
import org.example.backend_folders.pokemonEntities.Pokedex;

import org.example.backend_folders.pokemonEntities.Pokemon;
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

    public Pokemon getPokemonElementsByName(String pokemon_name){
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Pokemon> forEntity = restTemplate.getForEntity(uri + "pokemon/" + pokemon_name, Pokemon.class);
        return forEntity.getBody();
    }

    public Optional<NamedAPIResource> getPokemonById(String id) {
        return pokeVariableDescRepository.findById(id);
    }

    public NamedAPIResource savePokemon(NamedAPIResource pokemon) {
        return pokeVariableDescRepository.save(pokemon);
    }

    public void deletePokemon(String id) {
        pokeVariableDescRepository.deleteById(id);
    }


    public Pokedex getAllTypes() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Pokedex> forEntity = restTemplate.getForEntity(uri + "type", Pokedex.class);
        return forEntity.getBody();
    }
}
