package org.example.backend_folders.repositories;

import org.example.backend_folders.pokemonEntities.PokeVariableDesc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PokeVariableDescRepository extends JpaRepository<PokeVariableDesc, UUID> {

}
