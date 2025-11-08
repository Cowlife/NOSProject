import { Module } from '@nestjs/common';
import { TrainerModule } from './trainer/trainer.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteModule } from './favorite/favorite.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      schema: 'nos_schema',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      autoLoadEntities: true,
      database: 'postgres',
      synchronize: false, // true for dev, false for prod
      logging: true,
    }),
    TrainerModule, 
    FavoriteModule, 
    PokemonModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
