import { Exclude } from 'class-transformer';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { FavoriteEntity } from '../../favorites/entities/favorites.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tracks')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @OneToOne(() => ArtistEntity, { onDelete: 'SET NULL', eager: true })
  @JoinColumn()
  artistId: string | null;

  @OneToOne(() => AlbumEntity, { onDelete: 'SET NULL', eager: true })
  @JoinColumn()
  albumId: string | null;

  @Column('int')
  duration: number;

  @ManyToOne(() => FavoriteEntity, (favorite) => favorite.artists, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  favorite: FavoriteEntity;
}
