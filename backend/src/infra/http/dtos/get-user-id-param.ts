import { IsNotEmpty } from 'class-validator';

export class getUserIdParam {
  @IsNotEmpty()
  id: string;
}
