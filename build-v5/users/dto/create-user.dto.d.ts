import { UsersGender } from '../../enums/users-gender.enum';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    gender: UsersGender;
    phoneNumber: string;
    city?: string;
    orderedFood?: string;
    needTaxi?: boolean;
    presenceTime?: string;
}
