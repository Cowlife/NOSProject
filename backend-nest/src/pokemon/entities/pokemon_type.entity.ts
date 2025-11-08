import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { NamedAPIResource } from "./named_api_resource.entity";
import { Expose } from "class-transformer";

@Entity()
export class PokemonType {

    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    slot: number;

    @Expose()
    @OneToOne(()=> NamedAPIResource)
    type: NamedAPIResource;

    @Expose()
    @OneToOne(()=> NamedAPIResource)
    pokemon: NamedAPIResource;
    
}