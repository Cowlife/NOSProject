import { ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { NamedAPIResource } from "./named_api_resource.entity";
import { Pokemon } from "./pokemon.entity";

export class BaseStat {

    @PrimaryGeneratedColumn()
    baseStatId: number;

    base_stat: number;

    effort: number;

    @OneToOne(()=> NamedAPIResource)
    stat: NamedAPIResource;

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.stats)
    pokemon: Pokemon;

}