import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles/profiles.service';
import { ProfilesController } from './profiles/profiles.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'anubandh',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController, ProfilesController],
  providers: [AppService, ProfilesService],
})
export class AppModule {}
