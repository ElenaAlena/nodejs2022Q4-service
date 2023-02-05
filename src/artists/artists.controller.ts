import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    if (createArtistDto.name && createArtistDto.grammy) {
      const artist = this.artistsService.create(createArtistDto);
      return artist;
    }
    throw new HttpException('Some fields are missing', HttpStatus.BAD_REQUEST);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    const artist = await this.artistsService.findOne(id);
    if (!artist) {
      throw new HttpException(
        'The artist with such id is not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return artist;
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    if (
      (updateArtistDto.name && typeof updateArtistDto.name !== 'string') ||
      (updateArtistDto.grammy && typeof updateArtistDto.grammy !== 'boolean')
    ) {
      throw new HttpException('Artist is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artistsService.update(id, updateArtistDto);
    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.artistsService.remove(id);
    if (result) {
      throw new HttpException(
        'This artist was successfullly deleted',
        HttpStatus.NO_CONTENT,
      );
    } else {
      throw new HttpException(
        'The artist with such id is not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
