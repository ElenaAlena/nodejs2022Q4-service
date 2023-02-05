import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [RepositoryModule],
  exports: [AlbumsService],
})
export class AlbumsModule {}
