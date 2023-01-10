import { IsNotEmpty } from 'class-validator';

export class deletePhotoParam {
  @IsNotEmpty()
  id: string;
}
