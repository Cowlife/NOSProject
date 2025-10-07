package org.example.backend_folders.pokemonEntities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import java.util.List;


@Data // getter, setter, required args constructor
@NoArgsConstructor // removing empty constructor
@AllArgsConstructor // removing this.id = id inside constructor
@Entity
@Builder
public class Pokemon {

    @Id
    private Integer id;

    private Integer order;

    private boolean favorite = false;

    @OneToMany
    private List<PokemonType> types;

    @OneToOne
    private Sprites sprites;

}
