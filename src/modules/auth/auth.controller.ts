import { AuthDto } from '@auth/dto/auth.dto';
import { IRequestAuth } from '@common/interface/common.interface';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@auth/auth.service';
import { LocalAuthGuard } from '@auth/local-auth.guard';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { UserEntity } from '@user/entity/user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() authDto: AuthDto,
    @Request() req: IRequestAuth<Omit<UserEntity, 'password'>>,
  ) {
    return this.authService.login({
      user: req.user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(
    @Request()
    req: IRequestAuth<{
      id: number;
      phone: string;
      fullName: string;
    }>,
  ) {
    return req.user;
  }
}
