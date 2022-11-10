import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column()
  genres: string[];
}
