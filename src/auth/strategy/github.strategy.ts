import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: 'Ov23liLSMmqlxlF7dzVi',
      clientSecret: '044ecb4980c544cb4c6bdc51b228ed3364d198df',
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const { id, username, emails, photos } = profile;
    const email = emails[0].value;
    const avatar = photos[0].value;
    
    const user = await this.authService.validateOAuthLogin({
      githubId: id,
      username,
      email,
      avatar,
    });
    console.log(user,"user...")
    return user;
  }
}
