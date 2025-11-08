import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MoveLong } from "./move_long.entity";

@Entity()
export class EffectEntry{
    @PrimaryGeneratedColumn()
    effectEntryId: number;

    effect: string;
    short_effect: string;

    @ManyToOne(() => MoveLong, (movelong) => movelong.effect_entries)
    move_long: MoveLong
}