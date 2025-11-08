import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { NamedAPIResource } from "./named_api_resource.entity";

@Entity()
export class MoveShort {

    @PrimaryGeneratedColumn()
    move_id: number;

    @OneToOne(() => NamedAPIResource)
    move: NamedAPIResource;
}