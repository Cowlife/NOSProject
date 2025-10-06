package org.example.backend_folders.pokemonEntities;


import jakarta.persistence.*;
import lombok.*;

@Data // getter, setter, required args constructor
@NoArgsConstructor // removing empty constructor
@AllArgsConstructor // removing this.id = id inside constructor
@Entity
@Builder
public class PokeVariableDesc {

    private String name;

    private String url;

    @Id
    @Column(insertable = false, updatable = false)
    @GeneratedValue
    private Long pokeVar_id;


}
