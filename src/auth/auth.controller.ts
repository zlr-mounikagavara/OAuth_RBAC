

// import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Controller('auth')
// export class AuthController {
//   @Get('github')
//   @UseGuards(AuthGuard('github'))
//   async githubLogin(@Req() req) {
//     // Initiates the GitHub OAuth flow
//   }

//   @Get('github/callback')
//   @UseGuards(AuthGuard('github'))
//   async githubLoginCallback(@Req() req, @Res() res) {
//     // Handles the GitHub OAuth callback
//     // Send tokens or redirect user
//     const { accessToken, refreshToken } = req.user;
//     res.redirect(`/profile?access_token=${accessToken}`); // Example redirect with access token
//   }
// }
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    // This route will redirect the user to GitHub's OAuth page
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @UseGuards(RolesGuard)
  async githubLoginCallback(@Req() req: Request, @Res() res: Response) {
    // GitHub will redirect to this route after successful authentication
    const user = req.user;
    console.log(user,"user......")
    // Optionally, you can generate a JWT or start a session here
    // Redirect the user to the client application or return the user info
    return res.json(user);  // For testing, return the user info as JSON
  }
}

