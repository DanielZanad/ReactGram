import { IsOptional, IsString, Length } from 'class-validator';

export class updatePhotoParam {
  @IsString()
  @Length(3)
  id: string;
}

export class updatePhotoBody {
  @IsOptional()
  @IsString()
  @Length(3)
  title: string;
}
