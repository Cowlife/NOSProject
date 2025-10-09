package org.example.backend_folders.remainderEntities;

import com.fasterxml.jackson.databind.ser.impl.StringArraySerializer;
import io.hypersistence.utils.hibernate.type.array.IntArrayType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import java.util.List;
import java.util.UUID;

@Data // getter, setter, required args constructor
@NoArgsConstructor // removing empty constructor
@AllArgsConstructor // removing this.id = id inside constructor
@Entity
@Table(name = "favorite_table")
@Builder
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "individual_id", nullable = false)
    private UUID individualId;

    @Column(name = "trainer_email", nullable = false)
    private String trainerEmail;

    @Column(name="favorite_pokemon_name", nullable = false)
    private String favoritePokemonName;

    @Column(name = "pokemon_held_item")
    private String heldItem;

    @Column(name="pokemon_moves")
    private String pokemonMoves;

    @Column(name="pokemon_image")
    private String pokemonImage;

    @Column(name="pokemon_types")
    private String pokemonTypes;

    @Type(IntArrayType.class)
    @Column(name = "pokemon_stats", columnDefinition = "integer[]")
    private int[] pokemonStats;



}
