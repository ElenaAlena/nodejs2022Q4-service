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
import { validate } from 'uuid';
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
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    if (!validate(id)) {
      throw new HttpException('Artist id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artistsService.findOne(id);
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
      !validate(id) &&
      !updateArtistDto.name &&
      typeof updateArtistDto.name !== 'string'
    ) {
      throw new HttpException('Artist id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artistsService.update(id, updateArtistDto);
    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    if (!validate(id)) {
      throw new HttpException('Artist id is not valid', HttpStatus.BAD_REQUEST);
    }
    const result = this.artistsService.remove(id);
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
