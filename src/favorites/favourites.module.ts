import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService],
  imports: [RepositoryModule],
})
export class FavouritesModule {}
