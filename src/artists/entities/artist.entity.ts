import { FavoriteEntity } from '../../favorites/entities/favorites.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({ type: 'boolean', nullable: true })
  grammy: boolean;

  @ManyToOne(() => FavoriteEntity, (favorite) => favorite.artists, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  favorite: FavoriteEntity;
}
