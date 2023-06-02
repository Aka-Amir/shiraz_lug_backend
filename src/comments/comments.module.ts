import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentDocumentManager } from './entities/comment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CommentDocumentManager.collectionName,
        schema: CommentDocumentManager.createModel(),
      },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
