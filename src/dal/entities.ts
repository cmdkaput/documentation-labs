import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, ChildEntity, OneToMany, ManyToOne } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'entity_type' } })
export abstract class ReviewableEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
}

@ChildEntity('RESTAURANT')
export class Restaurant extends ReviewableEntity {
  @Column({ nullable: true }) cuisineType: string;
  @OneToMany(() => Review, (r) => r.restaurant) reviews: Review[];
}

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column() username: string;
  @Column() email: string;
}

@ChildEntity('VISITOR') export class Visitor extends User {}
@ChildEntity('ADMIN') export class Admin extends User {}
@ChildEntity('OWNER') export class RestaurantOwner extends User {}

@Entity()
export class Review {
  @PrimaryGeneratedColumn() id: number;
  @Column() rating: number;
  @Column('text') comment: string;
  @Column({ default: 'PENDING' }) status: string;

  @ManyToOne(() => Restaurant, (res) => res.reviews, { cascade: true })
  restaurant: Restaurant;

  @ManyToOne(() => User, { cascade: true })
  author: User;
}