import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { RepositoryService } from 'src/repository/repositoty.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [RepositoryService],
  exports: [TracksService],
})
export class TracksModule {}
