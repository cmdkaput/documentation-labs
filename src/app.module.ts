import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { 
  ReviewableEntity, 
  Restaurant, 
  User, 
  Visitor, 
  Admin, 
  RestaurantOwner, 
  Review 
} from './dal/entities';


import { ReviewService } from './bll/review.service';
import { ReviewRepository } from './dal/review.repository';
import { RestaurantService } from './bll/restaurant.service';
import { RestaurantController } from './presentation/restaurant.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qwerty1234',
      database: 'tripadvisor_db',
      entities: [ReviewableEntity, Restaurant, User, Visitor, Admin, RestaurantOwner, Review],
      synchronize: true,
    }),
    
    TypeOrmModule.forFeature([
      ReviewableEntity, 
      Restaurant, 
      User, 
      Visitor, 
      Admin, 
      RestaurantOwner, 
      Review
    ]),
  ],
  controllers: [
    RestaurantController, 
  ],
  providers: [
    RestaurantService,
    ReviewService,

    {
      provide: 'IReviewRepository',
      useClass: ReviewRepository,
    },
  ],
})
export class AppModule {}