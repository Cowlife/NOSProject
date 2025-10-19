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
public class MetaData {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer metaId;

    @OneToOne
    private NamedAPIResource ailment;

    @OneToOne
    private NamedAPIResource category;

    private Integer min_hits;
    private Integer max_hits;
    private Integer min_turns;
    private Integer max_turns;
    private Integer drain;
    private Integer healing;
    private Integer crit_rate;
    private Integer ailment_chance;
    private Integer flinch_chance;
    private Integer stat_chance;
}
