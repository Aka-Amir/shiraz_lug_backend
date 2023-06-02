import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty({
        message: 'message_is_empty'
    })
    message: string;
}
