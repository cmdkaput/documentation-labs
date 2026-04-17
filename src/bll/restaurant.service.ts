import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../dal/entities';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
  ) {}

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepo.find();
  }

  async findOne(id: number): Promise<Restaurant | null> {
    return this.restaurantRepo.findOneBy({ id });
  }

  async create(name: string, cuisineType: string): Promise<Restaurant> {
    const newRest = this.restaurantRepo.create({ name, cuisineType });
    return this.restaurantRepo.save(newRest);
  }

  async update(id: number, name: string, cuisineType: string): Promise<void> {
    await this.restaurantRepo.update(id, { name, cuisineType });
  }

  async remove(id: number): Promise<void> {
    await this.restaurantRepo.delete(id);
  }
}