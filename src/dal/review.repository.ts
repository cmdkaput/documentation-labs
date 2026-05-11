import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import csv = require('csv-parser');
import { Review, Restaurant, Visitor, Admin, RestaurantOwner } from './entities';
import { IReviewRepository } from './review.repository.interface';

@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(
    @InjectRepository(Review) private repo: Repository<Review>
  ) {}

  async readCsv(path: string): Promise<any[]> {
    const results: any[] = [];
    return new Promise((resolve) => {
      fs.createReadStream(path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results));
    });
  }

  async saveReview(data: any): Promise<void> {
    const review = new Review();
    review.rating = Number(data.rating);
    review.comment = data.comment;

    const rest = new Restaurant();
    rest.name = data.restaurantName;
    rest.cuisineType = data.cuisine;
    review.restaurant = rest;

    let user;
    if (data.role === 'ADMIN') user = new Admin();
    else if (data.role === 'OWNER') user = new RestaurantOwner();
    else user = new Visitor();

    user.username = data.userName;
    user.email = data.userEmail;
    review.author = user;

    await this.repo.save(review);
  }
}