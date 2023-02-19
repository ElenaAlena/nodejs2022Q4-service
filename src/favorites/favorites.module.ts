import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsModule } from 'src/artists/artists.module';
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
