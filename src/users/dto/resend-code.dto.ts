import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class ResendCodeDTO {
  @IsNotEmpty({
    message: 'id_is_empty'
  })
  id: string;
}
