import { Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Sprites } from "./sprites.entity";
import { MoveLong } from "./move_long.entity";
import { MoveShort } from "./move_short.entity";
import { PokemonType } from "./pokemon_type.entity";
import { BaseStat } from "./base_stat.entity";


@Entity()
export class Pokemon {

    @PrimaryColumn()
    id: number;

    name: string;

    order: number;

    favorite: boolean = false;

    @ManyToMany(() => PokemonType)
    @JoinTable()
    types: PokemonType[];

    @OneToMany(() => BaseStat, (stat) => stat.pokemon)
    stats: BaseStat[];

    @OneToOne(() => Sprites)
    sprites: Sprites;

    @ManyToMany(() => MoveShort)
    @JoinTable()
    moves: MoveShort[];

    @ManyToMany(() => MoveLong)
    @JoinTable()
    moveLongList: MoveLong[];
    
}
