import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { AlbumEntity } from '../albums/entities/album.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { UserEntity } from '../users/entities/user.entity';
import { FavoriteEntity } from '../favorites/entities/favorites.entity';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.BD_PORT,
  port: +process.env.BD_PORT,
  username: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_NAME,
  synchronize: false,
  entities: [
    AlbumEntity,
    TrackEntity,
    ArtistEntity,
    UserEntity,
    FavoriteEntity,
  ],
};

export const dataSource: DataSource = new DataSource(typeOrmConfig);
