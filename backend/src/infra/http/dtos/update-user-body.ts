import { IsOptional, IsString, Length } from 'class-validator';

export class updateUserBody {
  @IsOptional()
  @IsString()
  @Length(3)
  name: string;

  @IsOptional()
  bio: string;

  @IsOptional()
  @IsString()
  password: string;
}
