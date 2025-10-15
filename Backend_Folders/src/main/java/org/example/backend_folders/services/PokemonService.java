package org.example.backend_folders.services;

import org.example.backend_folders.pokemonEntities.*;


import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class PokemonService {


    String uri = "https://pokeapi.co/api/v2/";
    private static final RestTemplate restTemplate = new RestTemplate();
    private final CacheService cacheService;

    public PokemonService(CacheService cacheService) {
        this.cacheService = cacheService;
    }

    public Pokedex getAllPokemon() {
        //RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Pokedex> forEntity = restTemplate.getForEntity(uri + "pokemon?limit=100000&offset=0", Pokedex.class);
        return forEntity.getBody();
    }

    public Pokemon getPokemonElementsByName(String pokemon_name){
        //RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Pokemon> forEntity = restTemplate.getForEntity(uri + "pokemon/" + pokemon_name, Pokemon.class);
        // Set all Pokemon Moves to Search their Info
//        List<MoveShort> moveShortList = forEntity.getBody().getMoves();
//        List<MoveLong> moveLongList = new ArrayList<>();
//
//        for (MoveShort moveShort: moveShortList){
//            String move_name = moveShort.getMove().getName();
//            moveLongList.add(getMoveInfo(move_name));
//        }
//        forEntity.getBody().setMoveLongList(moveLongList);
//        // Empty list so that it prioritizes the long list
//        forEntity.getBody().setMoves(new ArrayList<>());

        return forEntity.getBody();
    }


    public Pokedex getAllTypes() {
        ResponseEntity<Pokedex> forEntity = restTemplate.getForEntity(uri + "type", Pokedex.class);
        return forEntity.getBody();
    }


    public AllPokemonTypeRef getAllPokemonByType(String type) {
        ResponseEntity<AllPokemonTypeRef> forEntity = restTemplate.getForEntity(uri + "type/" + type, AllPokemonTypeRef.class);
        return forEntity.getBody();
    }


    @Cacheable(value = "moves_old", key = "#move")
    public MoveLong getMoveInfo(String move){
        ResponseEntity<MoveLong> forEntity = restTemplate.getForEntity(uri + "move/" + move, MoveLong.class);
        return forEntity.getBody();
    }

    public List<MoveLong> getAllMoves() {
        ResponseEntity<Pokedex> compShortEntity = restTemplate.getForEntity(uri + "move?limit=100000&offset=0", Pokedex.class);
        List<NamedAPIResource> apiResources = compShortEntity.getBody().getResults();
        //Move fetching based on https://medium.com/@jadhavsid1101/making-parallel-api-calls-in-spring-boot-the-ultimate-guide-7e01598d71a
        List<String> names = new ArrayList<>();
        for (NamedAPIResource ind_element: apiResources){
            names.add(ind_element.getName());
        }

        List<CompletableFuture<MoveLong>> futures = names.stream()
                .map(name -> CompletableFuture.supplyAsync(() -> cacheService.getMoveInfo(restTemplate, uri + "move/" + name)))
                .toList();
        CompletableFuture<Void> allFutures = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]));
        CompletableFuture<List<MoveLong>> result = allFutures.thenApply(v -> futures.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList()));
        List<MoveLong> resultList = result.join();

        return resultList;
    }



}
