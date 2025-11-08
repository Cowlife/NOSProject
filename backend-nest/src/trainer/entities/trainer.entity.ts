
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("trainer_data")
export class Trainer {

    @PrimaryGeneratedColumn("uuid", {name: "id"})
    nameId: string;

    @Column({name: "first_name", nullable: false})
    firstName: string;

    @Column({name: "email", nullable: false})
    email: string;

    @Column({name: "password", nullable: false})
    password: string;

    @Column({name: "rank", nullable: false})
    rank: string;
}
