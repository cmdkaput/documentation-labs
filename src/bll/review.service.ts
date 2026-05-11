import { Injectable, Inject, OnApplicationBootstrap } from '@nestjs/common';
import type { IReviewRepository } from '../dal/review.repository.interface';

@Injectable()
export class ReviewService implements OnApplicationBootstrap {
  constructor(
    @Inject('IReviewRepository') private readonly repo: IReviewRepository
  ) {}

  async onApplicationBootstrap() {
    await this.importData();
  }

  async importData() {
    console.log('Starting import');
    const rows = await this.repo.readCsv('data.csv');
    
    for (const row of rows) {
      await this.repo.saveReview(row);
    }
    console.log(' 1000 records imported successfully');
  }
}