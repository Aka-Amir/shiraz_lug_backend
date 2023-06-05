import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, VerficationDto } from './dto/update-user.dto';
import { map, mergeMap } from 'rxjs';
import { PaymentService } from '../@utils/Payment';
import { SmsPatternBuilder, SmsService } from '../@utils';

@Controller('users')
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

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id).pipe(
      map((item) => {
        delete item.verificationCode;
        return item;
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
