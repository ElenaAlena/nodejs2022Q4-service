import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { RepositoryService } from 'src/repository/repositoty.service';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService],
  imports: [RepositoryService],
})
export class FavouritesModule {}
