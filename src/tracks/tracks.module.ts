import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavouritesModule } from 'src/favorites/favorites.module';
import { TrackEntity } from './entities/track.entity';
@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [
    forwardRef(() => FavouritesModule),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
})
export class TracksModule {}
