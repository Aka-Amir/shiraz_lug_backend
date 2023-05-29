import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelDto } from './create-hotels.dto';

export class UpdateHotelDto extends PartialType(CreateHotelDto) {}
