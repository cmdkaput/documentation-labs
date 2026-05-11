import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review, Restaurant, User, Admin, Visitor, RestaurantOwner, ReviewableEntity } from './dal/entities';
import { ReviewService } from './bll/review.service';
import { ReviewRepository } from './dal/review.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qwerty1234',
      database: 'tripadvisor_db',
      entities: [Review, Restaurant, User, Admin, Visitor, RestaurantOwner, ReviewableEntity],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Review, Restaurant, User]),
  ],
  providers: [
    ReviewService,
    {
      provide: 'IReviewRepository',
      useClass: ReviewRepository,
    },
>>>>>>> 3cdafd1f02c94cf7508146022d1762664a130728
  ],
})
export class AppModule {}