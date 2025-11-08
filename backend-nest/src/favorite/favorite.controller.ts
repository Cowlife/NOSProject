import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, Logger } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('/api/favorite')
export class FavoriteController {
  logger = new Logger(FavoriteService.name);

  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  createFavorite(@Body(ValidationPipe) createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.createFavorite(createFavoriteDto);
  }

  @Get()
  findFavorites(@Query('email') email: string) {
    return this.favoriteService.findAllFavoritesByEmail(email);
  }

  @Get('/exists')
  async verifyIfFavoriteExists(@Query('email') email: string, @Query('name') name: string) {
    const element = await this.favoriteService.findFavoriteWithEmailAndName(email, name);
    return element != null;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoriteService.update(id, updateFavoriteDto);
  }

  @Delete('/deletion')
  removeFavorite(@Query('email') email: string, @Query('name') name: string) {
    return this.favoriteService.remove(email, name);
  }
}

/* @GetMapping("/exists")
    public ResponseEntity<Boolean> checkIfFavoriteExists(
            @RequestParam String email,
            @RequestParam String name) {
        Favorite element = favoriteService.findFavoriteWithNameAndEmail(email, name);
        boolean bool_element = element != null;
        return new ResponseEntity<>(bool_element, HttpStatus.OK);
    }


    @PostMapping
    public Favorite createFavorite(@RequestBody Favorite favorite) {
        return favoriteService.saveFavorite(favorite);
    }

 */