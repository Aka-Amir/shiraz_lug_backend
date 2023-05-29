import { IsEmail, IsNotEmpty, IsEnum, IsPhoneNumber } from 'class-validator'
import { UsersGender } from '../../enums/users-gender.enum';

export class CreateUserDto {
    @IsNotEmpty({
        message: 'firstName_is_empty'
    })
    firstName: string;

    @IsNotEmpty({
        message: 'lastName_is_empty'
    })
    lastName: string;

    @IsEmail({}, {
        message: 'invalid_email'
    })
    email: string;

    @IsEnum(UsersGender, {
        message: 'invalid_gender'
    })
    gender: UsersGender

    @IsPhoneNumber('IR', {
        message: 'invalid_phoneNumber'
    })
    phoneNumber: string;

    @IsNotEmpty({
        message: 'city_is_empty'
    })
    city: string;

}
