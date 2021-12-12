import { IsBoolean } from 'class-validator';

export class ApprovePlaceDto{

    @IsBoolean()
    approved: boolean;
}