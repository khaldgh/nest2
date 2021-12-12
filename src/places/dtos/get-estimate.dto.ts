import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsString,
  Max,
  max,
  Min,
  min,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;
  @Transform(({ value }) => parseInt(value))
  @Min(1930)
  @Max(2050)
  year: number;
  @Transform(({ value }) => parseInt(value))
  @Min(0)
  @Max(1000000)
  milage: number;
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;
  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  long: number;
}
