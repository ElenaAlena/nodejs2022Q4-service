import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { FavoriteEntity } from '../../favorites/entities/favorites.entity';

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('int')
  year: number;

  @OneToOne(() => ArtistEntity, { onDelete: 'SET NULL', eager: true })
  @JoinColumn()
  artistId: string | null;

  @ManyToOne(() => FavoriteEntity, (favorite) => favorite.artists, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  favorite: FavoriteEntity;
}
