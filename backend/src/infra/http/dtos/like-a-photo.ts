import { IsOptional, IsString, Length } from 'class-validator';

export class LikePhotoParam {
  @IsString()
  @Length(3)
  id: string;
}

export class LikePhotoBody {
  @IsOptional()
  @IsString()
  @Length(3)
  title: string;
}
