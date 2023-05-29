import { PartialType } from '@nestjs/mapped-types';
import { CreateHotleDto } from './create-hotels.dto';

export class UpdateHotelDto extends PartialType(CreateHotleDto) {}
