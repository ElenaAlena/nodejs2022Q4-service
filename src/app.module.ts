import { Module } from '@nestjs/common';
import { AlbumsModule } from './albums/albums.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { FavouritesModule } from './favorites/favorites.module';
import { RepositoryModule } from './repository/repository.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavouritesModule,
    RepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
