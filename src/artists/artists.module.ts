import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([ArtistEntity]),
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
