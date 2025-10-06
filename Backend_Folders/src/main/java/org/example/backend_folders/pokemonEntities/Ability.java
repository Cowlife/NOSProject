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
public class Ability {

    @Id
    @GeneratedValue
    private Long id;

    @OneToMany
    private List<PokeVariableDesc> ability;
    private boolean is_hidden;
    private int slot;

}
