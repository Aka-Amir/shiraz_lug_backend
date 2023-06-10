import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { catchError, map, mergeMap } from 'rxjs';
import { SmsPatternBuilder, SmsService } from '../@utils';
import { PaymentService } from '../@utils/Payment';
import { RandomNumber } from '../@utils/RandomNumber';
import { CreateUserDto } from './dto/create-user.dto';
import { ResendCodeDTO } from './dto/resend-code.dto';
import { UpdateUserDto, VerficationDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly paymentService: PaymentService,
    private readonly smsService: SmsService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto).pipe(
      mergeMap((item) => {
        return this.smsService
          .sendPatternMessage(
            new SmsPatternBuilder()
              .setNumber(item.phoneNumber)
              .setCode(item.verificationCode),
          )
          .pipe(
            map(() => {
              return { ID: item._id.toString() };
            }),
          );
      }),
    );
  }

  @Post('resend_code')
  resendCode(@Body() dto: ResendCodeDTO) {
    const newCode = RandomNumber();
    return this.usersService.updateVerficationCode(dto.id, newCode).pipe(
      map((result) => {
        if (!result) throw new ForbiddenException();
        return result;
      }),
      mergeMap((result) => {
        if (!result) throw new ForbiddenException();
        return this.smsService
          .sendPatternMessage(
            new SmsPatternBuilder()
              .setNumber(result.phoneNumber)
              .setCode(newCode),
          )
          .pipe(map(() => ({ message: 'sent' })));
      }),
    );
  }

  @Get('/pay/:id')
  Pay(@Param('id') userID: string) {
    return this.usersService.pay(userID).pipe(
      mergeMap((price) => {
        return this.paymentService.createTransaction(price.total, userID).pipe(
          map((item) => ({
            ...price,
            ...item,
          })),
        );
      }),
    );
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id).pipe(
      map((item) => {
        delete item.verificationCode;
        return item;
      }),
      catchError(e => {
        console.log(e);
        throw new InternalServerErrorException();
      }),
    );
  }

  @Get('is_verified/:id')
  isVerfied(@Param('id') id: string) {
    return this.usersService.findOne(id).pipe(
      map((item) => {
        return {
          verified: item.verificationCode === 0,
        };
      }),
    );
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Put('verify/:id')
  verfiyUser(@Param('id') id: string, @Body() updateUserDto: VerficationDto) {
    return this.usersService.verify(id, updateUserDto.code).pipe(
      map((result) => {
        return {
          found: Boolean(result.matchedCount),
          verified: Boolean(result.modifiedCount),
        };
      }),
    );
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }
}
