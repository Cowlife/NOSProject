import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NamedAPIResource } from "./named_api_resource.entity";
import { Expose, Type } from "class-transformer";

@Entity()
export class Pokedex {
    @Expose()
    count: number;
    
    @Expose()
    previous: string;
    
    @Expose()
    next: string;

    @Expose()
    @Type(() => NamedAPIResource)
    @OneToMany(() => NamedAPIResource, (apiResource) => apiResource.pokedex)
    results: NamedAPIResource[];

    @Expose()
    @PrimaryGeneratedColumn()
    @JoinColumn({ name: "pokedex_id" })
    pokedex_id: number;
}