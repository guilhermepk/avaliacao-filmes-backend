import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/config.postgres.config';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { ListModule } from './list/list.module';
import { ListingModule } from './listing/listing.module';
import { RatingModule } from './rating/rating.module';
import { UserListModule } from './user-list/user-list.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
    BcryptModule,
    AuthModule,
    UserModule,
    SessionModule,
    ListModule,
    ListingModule,
    RatingModule,
    UserListModule,
    ContentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
