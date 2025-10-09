package org.example.backend_folders.pokemonEntities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // getter, setter, required args constructor
@NoArgsConstructor // removing empty constructor
@AllArgsConstructor // removing this.id = id inside constructor
@Entity
@Builder
public class MoveShort {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer move_id;

    @OneToOne
    private NamedAPIResource move;
}
