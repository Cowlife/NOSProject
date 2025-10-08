package org.example.backend_folders.pokemonEntities;

import com.fasterxml.jackson.databind.util.Named;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data // getter, setter, required args constructor
@NoArgsConstructor // removing empty constructor
@AllArgsConstructor // removing this.id = id inside constructor
@Entity
@Builder
public class PokemonType {

    @Id
    private Integer slot;

    // in case for move type fetching
    @OneToOne
    private NamedAPIResource type;

    // in case for pokemon type fetching
    @OneToOne
    private NamedAPIResource pokemon;
}
