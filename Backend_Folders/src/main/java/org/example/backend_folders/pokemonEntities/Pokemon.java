package org.example.backend_folders.pokemonEntities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

    @OneToMany
    private List<Ability> abilities;

    private int base_experience;

    @OneToMany
    private List<PokeVariableDesc> results;

    @Id
    @GeneratedValue
    private Long id;

}
