import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  //   ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { Error } from 'mongoose';
import { MongoError } from 'mongodb';
import { AxiosError } from 'axios'


@Injectable()
export class MongooseInterceptor implements NestInterceptor {
  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) throw error;
        if (error instanceof Error) {
          if (error instanceof Error.DocumentNotFoundError)
            throw new NotFoundException();
          if (error instanceof Error.CastError) throw new BadRequestException();
        }
        if (error instanceof MongoError) {
          switch (error.code) {
            case 11000:
              throw new ConflictException();
            default:
              break;
          }
        }

        if(error instanceof AxiosError) {
          throw new HttpException(error.message, (error.status || 412));
        }
        throw new InternalServerErrorException();
      }),
    );
  }
}
