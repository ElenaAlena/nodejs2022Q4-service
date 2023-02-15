import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { FavouritesModule } from 'src/favorites/favorites.module';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavouritesModule),
    TypeOrmModule.forFeature([ArtistEntity]),
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
