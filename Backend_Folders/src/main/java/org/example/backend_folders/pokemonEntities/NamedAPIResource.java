package org.example.backend_folders.pokemonEntities;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data // getter, setter, required args constructor
@NoArgsConstructor // removing empty constructor
@AllArgsConstructor // removing this.id = id inside constructor
@Entity
@Builder
public class NamedAPIResource {
    @Id
    private String name;

    private String url;

}
