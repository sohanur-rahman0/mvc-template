import { Controller, Get, Post, Render, Body, Redirect, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthorizationGuard } from './authorization.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('signup')
  @Render('auth/signup')
  async signUp() {
    return { title: 'Signup' }
  }

  @UseGuards(AuthorizationGuard)
  @Get()
  test() {
    return this.authService.test();
  }

  @Post('signup')
  @Redirect('/')
  signUpPost(@Body() body) {
    return this.authService.signIn(body);
  }


  @Get('signin')
  @Render('auth/signin')
  signIn() {
    return { title: 'Signin' }
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  // @Redirect('/')
  signInPost(@Request() req) {
    return req.user;
  }

}
