import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsModule } from '../artists/artists.module';
import { FavoriteEntity } from './entities/favorites.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    TypeOrmModule.forFeature([FavoriteEntity]),
  ],
})
export class FavoritesModule {}
