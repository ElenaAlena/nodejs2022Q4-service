import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';

@Entity('favorites')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => ArtistEntity, (artist) => artist.favorite)
  artists: ArtistEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.favorite)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.favorite)
  tracks: TrackEntity[];
}
