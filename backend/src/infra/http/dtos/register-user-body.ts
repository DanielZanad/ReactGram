import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Match } from './match-decorator';

export class registerUserBody {
  @IsString()
  @Length(3)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
