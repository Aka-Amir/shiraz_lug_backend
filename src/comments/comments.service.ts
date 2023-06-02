import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  CommentDocumentManager,
  CommentDocument,
} from './entities/comment.entity';
import { Model } from 'mongoose';
import { from } from 'rxjs';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(CommentDocumentManager.collectionName)
    private model: Model<CommentDocument>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    const newCommentDocument = new this.model({
      message: createCommentDto.message,
    });
    return from(newCommentDocument.save());
  }

  findAll() {
    return from(this.model.find({}, { __v: 0 }).exec());
  }

  findOne(id: string) {
    return from(this.model.findOne({ _id: id }, { __v: 0 }).exec());
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return from(
      this.model
        .updateOne(
          { _id: id },
          { ...JSON.parse(JSON.stringify(updateCommentDto)) },
        )
        .exec(),
    );
  }

  remove(id: string) {
    return from(this.model.deleteOne({ _id: id }).exec());
  }
}
