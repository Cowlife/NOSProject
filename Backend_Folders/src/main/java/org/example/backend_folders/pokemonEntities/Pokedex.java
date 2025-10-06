package org.example.backend_folders.pokemonEntities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data // getter, setter, required args constructor
@NoArgsConstructor // removing empty constructor
@AllArgsConstructor // removing this.id = id inside constructor
@Entity
@Builder
public class Pokedex {
    @Id
    @GeneratedValue
    private Long id;

    private int count;
    private String previous;
    private String next;

    @OneToMany
    private List<PokeVariableDesc> results;



}
