import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtService {

  constructor() { }


  getPokemonCardType(type1: string, type2: string) {
    const gradient_map: Record<string, string>  = {
      normal: "rgba(125, 155, 171, 1) 50%", // Done
      fighting: "rgba(181, 33, 33, 1) 50%", // Done
      flying: "rgba(119, 223, 237, 1) 50%", //Done
      poison: "rgba(142, 50, 199, 1) 50%", //Done
      ground: "rgba(207, 150, 93, 1) 50%", //Done
      rock: "rgba(99, 61, 22, 0.89) 50%", //Done
      bug: "rgba(17, 143, 46, 1) 50%", //Done
      ghost: "rgba(79, 48, 150, 1) 50%", //Done
      steel: "rgba(135, 135, 135, 1) 50%", //Done
      fire: "rgba(247, 118, 20, 1) 50%", // Done
      water: "rgba(0, 223, 252, 1) 50%", // Done
      grass: "rgba(27, 222, 72, 1) 50%", //Done
      electric: "rgba(250, 244, 122, 1) 50%", //Done
      psychic: "rgba(237, 55, 140, 1) 50%", //Done
      ice: "rgba(141, 240, 240, 1) 50%", //Done
      dragon: "rgba(38, 50, 181, 1) 50%", // Done
      dark: "rgba(13, 11, 11, 0.81) 50%", // Done
      fairy: "rgba(250, 122, 182, 0.59) 50%", // Done
      stellar: "rgba(125, 155, 171, 1) 50%", // Done
      unknown: "rgba(125, 155, 171, 1) 50%", // Done
    }
    let type2_check = type2 == "" ? type1 : type2
    let final_gradient_result = "linear-gradient(90deg," + gradient_map[type1] + ","
      + gradient_map[type2_check]
    return {
      background: final_gradient_result,
    };
  }
}
