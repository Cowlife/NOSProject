import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Controller('api/trainers')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  create(@Body(ValidationPipe) createTrainerDto: CreateTrainerDto) {
    return this.trainerService.create(createTrainerDto);
  }

  @Get()
  findAll() {
    return this.trainerService.findAll();
  }

  @Get('excludes/:email')
  getAllTrainersExceptOne(@Param('email') email: string) {
    return this.trainerService.findAllExceptOne(email);
  }

  @Get(':id')
  findOneByID(@Param('id') id: string) {
    return this.trainerService.findOneByID(id);
  }

  @Get('search/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.trainerService.findOneByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateTrainerDto: UpdateTrainerDto) {
    return this.trainerService.update(id, updateTrainerDto);
  }

  @Delete(':id')
  removeByID(@Param('id') id: string) {
    return this.trainerService.removeByID(id);
  }

}
