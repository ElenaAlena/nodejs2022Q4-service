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
  UseGuards,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('album')
@UseGuards(JwtAuthGuard)
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    if (createAlbumDto.name && createAlbumDto.year) {
      const newAlbum = await this.albumsService.create(createAlbumDto);
      return newAlbum;
    }
    throw new HttpException('Body is not correct', HttpStatus.BAD_REQUEST);
  }

  @Get()
  async findAll(): Promise<Album[]> {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ): Promise<Album> {
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
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
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
