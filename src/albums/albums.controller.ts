import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    if (createAlbumDto.name && createAlbumDto.year) {
      const newAlbum = this.albumsService.create(createAlbumDto);
      return newAlbum;
    }
    throw new HttpException('Body is not correct', HttpStatus.BAD_REQUEST);
  }

  @Get()
  findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    const album = await this.albumsService.findOne(id);
    if (!album) {
      throw new HttpException(
        'Album with such id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return album;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    if (
      !updateAlbumDto.name &&
      !updateAlbumDto.year &&
      typeof updateAlbumDto.name !== 'string'
    ) {
      throw new HttpException('Album id is not valid', HttpStatus.BAD_REQUEST);
    }
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const isAlbumDel = await this.albumsService.remove(id);
    if (isAlbumDel) {
      throw new HttpException(
        'This album was successfullly deleted',
        HttpStatus.NO_CONTENT,
      );
    }
    throw new HttpException('This album does not exist', HttpStatus.NOT_FOUND);
  }
}
