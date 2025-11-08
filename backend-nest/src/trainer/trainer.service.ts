import { Injectable } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class TrainerService {

  constructor(
    @InjectRepository(Trainer) private readonly trainerRepository: Repository<Trainer>,
  ) {}

  create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const trainer: Trainer = this.trainerRepository.create(createTrainerDto);
    return this.trainerRepository.save(trainer);
  }

  findAll(): Promise<Trainer[]> {
    return this.trainerRepository.find();
  }

  findAllExceptOne(email: string){
    return this.trainerRepository.find({where: {email: Not(email)}});
  }

  findOneByEmail(email: string) : Promise<Trainer | null>{
    return this.trainerRepository.findOneBy({email});
  }

  findOneByID(id: string) : Promise<Trainer | null> {
    return this.trainerRepository.findOneBy({nameId: id});
  }

  update(id: string, updateTrainerDto: UpdateTrainerDto) {
    return this.trainerRepository.update(id ,updateTrainerDto);
  }

  removeByID(id: string) {
    return this.trainerRepository.delete(id);
  }


}
