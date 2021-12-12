import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './users/auth.service';
import { UsersService } from './users/users.service';
import { APP_PIPE } from '@nestjs/core';
// import cookieSession from 'cookie-session';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { PlacesModule } from './places/places.module';
import { Place } from './places/place.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   database: 'new_schema',
    //   username: 'root',
    //   password: 'Password',
    //   port: 3306,
    //   autoLoadEntities: true,
    //   host: 'localhost',
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot(),
    UsersModule,
    PlacesModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true
      })
    }
  ],
})
export class AppModule {
  constructor( private configService: ConfigService){}
  configure(consumer: MiddlewareConsumer){
    consumer.apply(cookieSession({
      keys: [this.configService.get('COOKIE-SESSION')]
    })).forRoutes('*');
  }
}
