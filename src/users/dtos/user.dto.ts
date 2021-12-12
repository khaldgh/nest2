import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  @IsString()
  email: string;
  
  @IsString()
  password: string;
}
