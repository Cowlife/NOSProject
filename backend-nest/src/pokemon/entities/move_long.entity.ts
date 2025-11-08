import { Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { NamedAPIResource } from "./named_api_resource.entity";
import { MetaData } from "./meta_data.entity";
import { EffectEntry } from "./effect_entry.entity";

@Entity()
export class MoveLong{
    @PrimaryColumn()
    id: number;

    name: string;

    accuracy: number;

    @OneToOne(() => NamedAPIResource)
    damage_class: NamedAPIResource;

    @OneToMany(() => EffectEntry, (effect_entry) => effect_entry.move_long)
    effect_entries: EffectEntry[];

    @OneToOne(() => MetaData)
    meta: MetaData;

    power: number;
    pp: number;

    @OneToOne(() => NamedAPIResource)
    target: NamedAPIResource;

    @OneToOne(() => NamedAPIResource)
    type: NamedAPIResource;
}