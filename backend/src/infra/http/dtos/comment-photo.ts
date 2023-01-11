import { IsNotEmpty, IsString, Length } from 'class-validator';

export class commentPhotoBody {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  comment: string;
}

export class commentPhotoParam {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  id: string;
}
