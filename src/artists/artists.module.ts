import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [RepositoryModule],
})
export class ArtistsModule {}
