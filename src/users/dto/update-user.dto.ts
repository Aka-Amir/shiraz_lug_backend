import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, Max, Min } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class VerficationDto {
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    {
      message: 'code_is_NaN',
    },
  )
  @Min(100, {
    message: 'code_is_invalid',
  })
  @Max(9999, {
    message: 'code_is_invalid',
  })
  code: number;
}
