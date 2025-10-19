package org.example.backend_folders.controllers;

import jakarta.transaction.Transactional;
import org.example.backend_folders.remainderEntities.Favorite;
import org.example.backend_folders.services.FavoriteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/favorite")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public ResponseEntity<List<Favorite>> getFavorites(@RequestParam(value = "email", required = false) String email) {
        List<Favorite> favorites_list = favoriteService.getAllFavoritesByEmail(email);
        return new ResponseEntity<>(favorites_list, HttpStatus.OK);
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> checkIfFavoriteExists(
            @RequestParam String email,
            @RequestParam String name) {
        Favorite element = favoriteService.findFavoriteWithNameAndEmail(email, name);
        boolean bool_element = element != null;
        return new ResponseEntity<>(bool_element, HttpStatus.OK);
    }


    @PostMapping
    public Favorite createFavorite(@RequestBody Favorite favorite) {
        return favoriteService.saveFavorite(favorite);
    }

    @Transactional
    @DeleteMapping("/deletion")
    public void deleteFavorite(@RequestParam String email,
                               @RequestParam String name) {
        favoriteService.deleteFavorite(email, name);
    }


}
