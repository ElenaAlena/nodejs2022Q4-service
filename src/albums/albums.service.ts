import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = this.albumsRepository.create(createAlbumDto);
    return this.albumsRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find({ loadRelationIds: true });
  }

  async findOne(id: string): Promise<Album> {
    return this.albumsRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const albumForUpdate = await this.findOne(id);
    if (!albumForUpdate)
      throw new HttpException(
        'This album does not exist',
        HttpStatus.NOT_FOUND,
      );

    const updatedAlbum = { ...albumForUpdate, ...updateAlbumDto };
    await this.albumsRepository.save(updatedAlbum);

    return updatedAlbum;
  }

  async remove(id: string) {
    const result = await this.albumsRepository.delete({ id });
    return result.affected ? result.raw : null;
  }
}
