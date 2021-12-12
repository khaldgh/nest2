import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './place.entity';
import { CreatePlaceDto } from './dtos/create-place.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class PlacesService {
  constructor(@InjectRepository(Place) private repo: Repository<Place>) {}

  create(createPlaceDto: CreatePlaceDto, user: User) {
    const place = this.repo.create(createPlaceDto);
    place.user = user;
    return this.repo.save(place);
  }

  async changeApproval(id: string, approved: boolean){
      const place = await this.repo.findOne(id);
      if(!place){
          throw new NotFoundException('place not found');
      }

      place.approved = approved;
      return this.repo.save(place);
  }

  createQuery({ year, make, model, long, lat, milage }: GetEstimateDto ){
      return this.repo.createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('year - :year BETWEEN -3 AND 3',{ year })
    //   .andWhere('make = :make', { make })
    //   .andWhere('model = :model', { model })
    //   .andWhere(':long BETWEEN -5 AND 5',  { long })
    //   .andWhere(':lat BETWEEN -5 AND 5',  { lat })
    //   .andWhere('approved IS TRUE')
      .orderBy('ABS(milage - :milage)', 'DESC')
      .setParameters({ milage })
      .limit(3)
      .getRawOne()
  }
}
