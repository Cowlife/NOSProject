import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateFavoriteDto {
    
    @IsString()
    trainerEmail: string

    @IsString()
    favoritePokemonName: string

    @IsString()
    @IsOptional()
    heldItem: string

    @IsString()
    @IsOptional()
    pokemonMoves: string

    @IsString()
    @IsOptional()
    pokemonImage: string

    @IsString()
    @IsOptional()
    pokemonTypes: string

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    pokemonStats: number[];

}
