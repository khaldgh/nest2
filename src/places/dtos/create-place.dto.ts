import { IsLatitude, IsLongitude, IsString, Max, max, Min, min } from "class-validator";


export class CreatePlaceDto{

    @IsString()
    make: string;

    @IsString()
    model: string;

    @Min(1930)
    @Max(2050)
    year: number;
    
    @Min(0)
    @Max(1000000)
    price: number;

    @Min(0)
    @Max(1000000)   
    milage: number;
    
    
    @IsLatitude()
    lat: number;

    @IsLongitude()
    long: number;

}