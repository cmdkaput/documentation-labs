import { Controller, Get, Post, Body, Param, Render, Res } from '@nestjs/common';
import { RestaurantService } from '../bll/restaurant.service';
import type { Response } from 'express';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @Render('index')
  async list() {
    const restaurants = await this.restaurantService.findAll();
    return { restaurants }; 
  }

  @Get('create')
  @Render('create')
  createForm() {
    return {};
  }

  @Post('create')
  async create(@Body() body: { name: string; cuisineType: string }, @Res() res: Response) {
    await this.restaurantService.create(body.name, body.cuisineType);
    res.redirect('/restaurants'); 
  }

  @Get('edit/:id')
  @Render('edit')
  async editForm(@Param('id') id: number) {
    const restaurant = await this.restaurantService.findOne(id);
    return { restaurant };
  }

  @Post('edit/:id')
  async edit(@Param('id') id: number, @Body() body: { name: string; cuisineType: string }, @Res() res: Response) {
    await this.restaurantService.update(id, body.name, body.cuisineType);
    res.redirect('/restaurants');
  }

  @Post('delete/:id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    await this.restaurantService.remove(id);
    res.redirect('/restaurants');
  }
}