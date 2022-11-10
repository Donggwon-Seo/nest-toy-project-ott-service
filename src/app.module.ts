import { Module } from '@nestjs/common';
import { MembersModule } from './members/members.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), MembersModule, AuthModule],
  controllers: [MoviesController],
  providers: [MoviesService], // typeORM 모듈 추가
})
export class AppModule {}
