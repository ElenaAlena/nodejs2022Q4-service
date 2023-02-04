import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { RepositotyModule } from 'src/repository/repository.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [RepositotyModule],
  exports: [AlbumsService],
})
export class AlbumsModule {}
