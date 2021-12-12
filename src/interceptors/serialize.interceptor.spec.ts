import { UserDto } from 'src/users/dtos/user.dto';
import { SerializeInterceptor } from './serialize.interceptor';

describe('SerializeInterceptor', () => {
  it('should be defined', () => {
    expect(new SerializeInterceptor(UserDto)).toBeDefined();
  });
});
