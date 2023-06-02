import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { map, mergeMap } from 'rxjs';
import { PaymentService } from '../@utils/Payment';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly paymentService: PaymentService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto).pipe(
      map((item) => {
        return { ID: item._id.toString() };
      }),
    );
  }

  @Get('/pay/:id')
  Pay(@Param() userID: string) {
    this.usersService.pay(userID).pipe(
      mergeMap((price) => {
        return this.paymentService.createTransaction(price.total).pipe(
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
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
