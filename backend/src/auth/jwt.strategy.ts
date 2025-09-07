import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET') || 'your-super-secret-jwt-key';
    console.log('🔐 JWT Strategy - Secret loaded:', !!configService.get<string>('JWT_SECRET') ? 'From ENV' : 'Using fallback');
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    console.log('JWT payload received:', payload);
    const user = await this.usersService.findUserById(payload.sub);
    console.log('User found:', user ? 'Yes' : 'No');
    if (!user) {
      throw new UnauthorizedException();
    }
    

    const { password, ...result } = user.toObject();
    console.log('Returning user data:', result);
    return result;
  }
}
