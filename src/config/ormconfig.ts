import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { AlbumEntity } from '../albums/entities/album.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { UserEntity } from '../users/entities/user.entity';
import { FavoriteEntity } from '../favorites/entities/favorites.entity';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    AlbumEntity,
    TrackEntity,
    ArtistEntity,
    UserEntity,
    FavoriteEntity,
  ],
  migrations: [__dirname + './src/migrations/*.ts'],
  migrationsRun: true,
  synchronize: true,
};
