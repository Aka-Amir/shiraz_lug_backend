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
import { catchError, from, lastValueFrom, map, mergeMap } from 'rxjs';
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
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    await lastValueFrom(
      this.smsService.sendPatternMessage(
        new SmsPatternBuilder()
          .setNumber(user.phoneNumber)
          .setCode(user.verificationCode),
      ),
    );
    return {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      city: user.city,
      orderedFood: user.orderedFood.toString(),
      needTaxi: user.needTaxi,
      presenceTime: user.presenceTime,
    };
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

  @Get('/pay_status/:id')
  IsPaied(@Param('id') userID: string) {
    return this.paymentService.db.getSuccessPaymentRciepts(userID).pipe(
      map((item) => {
        if (!item.length) return { isPaied: false };
        return { isPaied: true, recipt: item[0] };
      }),
    );
  }

  @Get('/payment_list/:id')
  PaymentList(@Param('id') userID: string) {
    return this.paymentService.db.getPaymentRciepts(userID);
  }

  @Get('/pay/:id')
  Pay(@Param('id') userID: string) {
    return this.paymentService.db.getSuccessPaymentRciepts(userID).pipe(
      map((item) => {
        console.log(item);
        if (!item.length) return item;
        throw new ForbiddenException();
      }),
      mergeMap(() => {
        return this.usersService.pay(userID).pipe(
          mergeMap((price) => {
            return this.paymentService
              .createTransaction(price.total, userID)
              .pipe(
                map((item) => ({
                  ...price,
                  ...item,
                })),
              );
          }),
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
      catchError((e) => {
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
