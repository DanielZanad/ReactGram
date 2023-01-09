import { IsNotEmpty, IsString, Length } from 'class-validator';

export class registerPhotoBody {
  @IsString()
  @Length(3)
  @IsNotEmpty()
  title: string;
}
