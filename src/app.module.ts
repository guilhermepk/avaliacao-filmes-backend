import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/config.postgres.config';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { ListModule } from './list/list.module';
import { ContentModule } from './content/content.module';
import { ListingModule } from './listing/listing.module';
import { RatingModule } from './rating/rating.module';
import { GenreModule } from './genre/genre.module';
import { ContentGenreModule } from './content-genre/content-genre.module';
import { UserListModule } from './user-list/user-list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
    UserModule,
    SessionModule,
    ListModule,
    ContentModule,
    ListingModule,
    RatingModule,
    GenreModule,
    ContentGenreModule,
    UserListModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
