import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [RepositoryModule],
})
export class TracksModule {}
