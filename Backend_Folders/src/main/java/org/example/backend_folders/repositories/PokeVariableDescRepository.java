package org.example.backend_folders.repositories;

import org.example.backend_folders.pokemonEntities.NamedAPIResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PokeVariableDescRepository extends JpaRepository<NamedAPIResource, String> {

}
