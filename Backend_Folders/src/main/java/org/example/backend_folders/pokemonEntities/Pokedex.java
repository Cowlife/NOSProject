package org.example.backend_folders.pokemonEntities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data // getter, setter, required args constructor
@NoArgsConstructor // removing empty constructor
@AllArgsConstructor // removing this.id = id inside constructor
@Entity
@Builder
public class Pokedex {

    private int count;
    private String previous;
    private String next;

    @OneToMany
    private List<NamedAPIResource> results;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer pokedex_id;


}
