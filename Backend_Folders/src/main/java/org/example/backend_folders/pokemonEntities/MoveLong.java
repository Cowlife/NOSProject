package org.example.backend_folders.pokemonEntities;

import jakarta.persistence.*;
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
public class MoveLong {

    @Id
    private Integer id;

    private Integer accuracy;

    @OneToOne
    private NamedAPIResource damage_class;

    @OneToMany
    private List<EffectEntry> effect_entries;

    @OneToOne
    private MetaData meta;

    private Integer power;
    private Integer pp;

    @OneToOne
    private NamedAPIResource target;

    @OneToOne
    private NamedAPIResource type;



}
