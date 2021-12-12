import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseInterceptors,
  Session,
  UseGuards
} from '@nestjs/common';
import { parse } from 'path/posix';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { currentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@currentUser() user: User) {
    return user;
  }

  @Get()
  getUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Post('/signup')
  async sendUser(@Body() body: UserDto, @Session() session: any) {
      console.log(body)
      const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    console.log(user)
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: UserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    if (!session.userId) {
      throw new NotFoundException('user not found');
    }
    session.userId = null;
  }

  //   @Get('/colors/:color')
  //   setSession(@Param('color') color: string, @Session() session: any){
  //       session.color = color;
  //   }

  //   @Get('/colors')
  //   getSession(@Session() session: any){
  //       return session.color;
  //   }
}
