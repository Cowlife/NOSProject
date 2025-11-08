import { IsString } from "class-validator";


export class CreateTrainerDto {

    @IsString()
    firstName: string;
    
    @IsString()
    email: string;
    
    @IsString()
    password: string;
    
    @IsString()
    rank: string;

}
