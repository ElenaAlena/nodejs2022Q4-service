import { Module } from '@nestjs/common';
import { RepositoryService } from './repositoty.service';

@Module({
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
