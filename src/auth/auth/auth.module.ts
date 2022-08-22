import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, AuthStrategy],
  exports: [AuthStrategy],
})
export class AuthModule {}
