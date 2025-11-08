import { Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { PokemonType } from "./pokemon_type.entity";
import { Expose, Type } from "class-transformer";

@Entity()
export class AllPokemonTypeRef {

    @Expose()
    @PrimaryColumn()
    id: number;

    @Expose()
    @Type(() => PokemonType)
    @ManyToMany(() => PokemonType)
    @JoinTable()
    pokemon: PokemonType[];
}