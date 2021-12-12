import { Expose, Transform } from 'class-transformer';

export class PlaceDto {
  @Expose()
  id: number;
  @Expose()
  model: string;
  @Expose()
  make: string;
  @Expose()
  year: number;
  @Expose()
  milage: number;
  @Expose()
  price: number;
  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
