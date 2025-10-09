package org.example.backend_folders.repositories;

import org.example.backend_folders.remainderEntities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, UUID> {
    List<Favorite> findAllByTrainerEmail(String email);

    boolean existsByFavoritePokemonNameAndTrainerEmail(String name, String email);

    Favorite findFirstByTrainerEmailAndFavoritePokemonName(String email, String name);

    void deleteAllByTrainerEmailAndFavoritePokemonName(String email, String name);

}
