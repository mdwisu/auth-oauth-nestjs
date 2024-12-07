import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from '../guard/google-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    // Guard akan menangani login ke Google
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleLoginRedirect(@Req() req: any) {
    // Di sini kita bisa memanggil AuthService untuk login dan menerbitkan token
    // req.user berisi data pengguna yang berhasil login via Google
    const profile = req.user;
    console.log(profile);
    const user = await this.authService.findOrCreateUser(profile);
    return this.authService.login(user);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard) // Guard untuk melindungi endpoint
  getProtectedResource(@Req() req) {
    return { message: 'You have access to this protected resource!' };
  }
}
