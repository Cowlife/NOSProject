import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { NamedAPIResource } from "./named_api_resource.entity";

@Entity()
export class MetaData{
    @PrimaryGeneratedColumn()
    metaId: number;

    @OneToOne(() => NamedAPIResource)
    ailment: NamedAPIResource;

    @OneToOne(() => NamedAPIResource)
    category: NamedAPIResource;

    min_hits: number;
    max_hits: number;
    min_turns: number;
    max_turns: number;
    drain: number;
    healing: number;
    crit_rate: number;
    ailment_chance: number;
    flinch_chance: number;
    stat_chance: number;
}