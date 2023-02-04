import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repositoty.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumsService {
  constructor(private repository: RepositoryService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = new AlbumEntity(createAlbumDto);
    this.repository.addAlbum(newAlbum);
    return newAlbum;
  }

  async findAll(): Promise<Album[]> {
    return this.repository.albums;
  }

  async findOne(id: string): Promise<Album> {
    return this.repository.albums.find((album) => album.id === id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const albumForUpdate = await this.findOne(id);
    if (!albumForUpdate)
      throw new HttpException(
        'This album does not exist',
        HttpStatus.NOT_FOUND,
      );
    const updatedAlbum = { ...albumForUpdate, ...updateAlbumDto };
    this.repository.updateAlbum(id, updatedAlbum);
    return updatedAlbum;
  }

  async remove(id: string) {
    const albumForDel = await this.findOne(id);
    if (!!albumForDel) this.repository.deleteAlbum(id);
    return !!albumForDel;
  }
}
