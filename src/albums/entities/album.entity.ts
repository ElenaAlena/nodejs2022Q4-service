import { Exclude } from 'class-transformer';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { FavoriteEntity } from 'src/favorites/entities/favorites.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
