import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles/profiles.service';
import { ProfilesController } from './profiles/profiles.controller';
import { UsersController } from './users/users.controller';
import { ActionsController } from './actions/actions.controller';
import { ActionsService } from './actions/actions.service';
import { UsersService } from './users/users.service';
import { UserAction } from './entities/user-action.entity';
import { UserSession } from './entities/user-session.entity';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'anubandh',
      entities: [UserAction, UserSession],
      synchronize: false,
      logging: true
    }),
    TypeOrmModule.forFeature([UserSession, UserAction]),
    AuthModule,
  ],
  controllers: [AppController, ProfilesController, UsersController, ActionsController],
  providers: [AppService, ProfilesService, ActionsService, UsersService],
})
export class AppModule {}
