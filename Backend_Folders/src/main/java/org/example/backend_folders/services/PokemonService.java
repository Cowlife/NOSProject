package org.example.backend_folders.services;

import org.example.backend_folders.pokemonEntities.*;

import org.example.backend_folders.repositories.PokeVariableDescRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;
import java.util.UUID;

@Service
public class PokemonService {


    String uri = "https://pokeapi.co/api/v2/";

    public PokemonService() {

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


    public Pokedex getAllTypes() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Pokedex> forEntity = restTemplate.getForEntity(uri + "type", Pokedex.class);
        return forEntity.getBody();
    }


    public AllPokemonTypeRef getAllPokemonByType(String type) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<AllPokemonTypeRef> forEntity = restTemplate.getForEntity(uri + "type/" + type, AllPokemonTypeRef.class);
        return forEntity.getBody();
    }

    public MoveLong getMoveInfo(String move){
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<MoveLong> forEntity = restTemplate.getForEntity(uri + "move/" + move, MoveLong.class);
        return forEntity.getBody();
    }
}
