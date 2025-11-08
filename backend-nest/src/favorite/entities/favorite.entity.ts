import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("favorite_table")
export class Favorite {

    @PrimaryGeneratedColumn("uuid", {name: "individual_id"})
    individualId: string;

    @Column({name: "trainer_email", nullable: false})
    trainerEmail: string

    @Column({name:"favorite_pokemon_name", nullable: false})
    favoritePokemonName: string

    @Column({name: "pokemon_held_item"})
    heldItem: string

    @Column({name:"pokemon_moves"})
    pokemonMoves: string

    @Column({name:"pokemon_image"})
    pokemonImage: string

    @Column({name:"pokemon_types"})
    pokemonTypes: string

    @Column({name:"pokemon_stats", array: true, type: "integer"})
    pokemonStats: number[];



}
