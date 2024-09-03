import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guards';
import { User } from 'src/users/user.interface';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    // This route will redirect the user to GitHub's OAuth page
  }
  @Get('github/callback')
  @UseGuards(AuthGuard('github'), RolesGuard)  // Ensure RolesGuard is applied after AuthGuard
  async githubLoginCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;  // Type the user object

    // Log the user object for debugging
    console.log('User from callback:', user);

    // Fetch the full user details by ID if needed
    const fullUserDetails = await this.authService.findById(user.id);

    // Log full user details for debugging
    console.log('Full user details from findById:', fullUserDetails);

    // Return the full user info as JSON for testing
    return res.json(fullUserDetails);
  }
}
