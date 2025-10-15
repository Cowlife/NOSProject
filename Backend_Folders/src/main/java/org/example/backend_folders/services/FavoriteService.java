package org.example.backend_folders.services;

import org.example.backend_folders.pokemonEntities.BaseStat;
import org.example.backend_folders.pokemonEntities.Pokemon;
import org.example.backend_folders.pokemonEntities.PokemonType;
import org.example.backend_folders.remainderEntities.Favorite;
import org.example.backend_folders.repositories.FavoriteRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final PokemonService pokemonService;

    public FavoriteService(FavoriteRepository favoriteRepository, PokemonService pokemonService) {
        this.favoriteRepository = favoriteRepository;
        this.pokemonService = pokemonService;
    }


    public Favorite saveFavorite(Favorite favorite) {
        Pokemon pokemon_element = this.pokemonService.getPokemonElementsByName(favorite.getFavoritePokemonName());
        // Setting base stats
        List<BaseStat> baseStats = pokemon_element.getStats();
        int[] stats_list = new int[baseStats.size()];
        for (int i = 0; i < stats_list.length; i++){
            stats_list[i] = baseStats.get(i).getBase_stat();
        }
        favorite.setPokemonStats(stats_list);
        // Setting image
        String img_ref = pokemon_element.getSprites().getFront_default();
        favorite.setPokemonImage(img_ref);
        // Setting types
        List<PokemonType> types_ref = pokemon_element.getTypes();
        StringBuilder res_string = new StringBuilder();
        for (PokemonType type : types_ref){
            res_string.append(type.getType().getName()).append(",");
        }
        String final_str = res_string.substring(0, res_string.length()-1);
        favorite.setPokemonTypes(final_str);
        return favoriteRepository.save(favorite);
    }

    public void deleteFavorite(String email, String name) {
        favoriteRepository.deleteAllByTrainerEmailAndFavoritePokemonName(email, name);
    }

    public List<Favorite> getAllFavoritesByEmail(String email) {
        if (email == null || email.isEmpty()){
            return this.favoriteRepository.findAll();
        }
        return this.favoriteRepository.findAllByTrainerEmail(email);

    }

    public Favorite findFavoriteWithNameAndEmail(String email, String name){
        return this.favoriteRepository.findFirstByTrainerEmailAndFavoritePokemonName(email, name);
    }



}
