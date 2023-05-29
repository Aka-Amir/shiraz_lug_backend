import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateSettlingDto } from './create-settling.dto';

export class UpdateSettlingDto extends PartialType(
  OmitType(CreateSettlingDto, ['userID']),
) {}
