import { Injectable } from '@nestjs/common';
import { CreateSettlingDto } from './dto/create-settling.dto';
import { UpdateSettlingDto } from './dto/update-settling.dto';

@Injectable()
export class SettlingService {
  create(createSettlingDto: CreateSettlingDto) {
    return 'This action adds a new settling';
  }

  findAll() {
    return `This action returns all settling`;
  }

  findOne(id: number) {
    return `This action returns a #${id} settling`;
  }

  update(id: number, updateSettlingDto: UpdateSettlingDto) {
    return `This action updates a #${id} settling`;
  }

  remove(id: number) {
    return `This action removes a #${id} settling`;
  }
}
