import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Pokedex } from "./pokedex.entity";
import { Expose } from "class-transformer";

@Entity()
export class NamedAPIResource{
    @Expose()
    @PrimaryColumn()
    name: string;

    @Expose()
    url: string;

    @Expose()
    @ManyToOne(() => Pokedex, (pokedex) => pokedex.results)
    pokedex: Pokedex;
}