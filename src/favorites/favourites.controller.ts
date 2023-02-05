import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { validate } from 'uuid';
import { RepositoryService } from 'src/repository/repositoty.service';
import { FavouritesService } from './favourites.service';
import { FavoritesResponse } from './interfaces/favourites.interfaces';

@Controller('favs')
export class FavouritesController {
  constructor(
    private readonly favouritesService: FavouritesService,
    private repository: RepositoryService,
  ) {}

  getSuccessAnswer(text, type = 1) {
    return type === 1
      ? `The ${text} was successfully added to favourites`
      : `The ${text} was successfully removed from favourites`;
  }

  getErrorAnswer(text, type = 1) {
    return type === 1
      ? `The ${text} id is not valid`
      : `The ${text} is not exist`;
  }

  @Get()
  getAll(): Promise<FavoritesResponse> {
    return this.favouritesService.getAll();
  }

  @Post('/track/:id')
  addTrackToFavs(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException(
        this.getErrorAnswer('track', 1),
        HttpStatus.BAD_REQUEST,
      );
    }
    const track = this.repository.tracks.find((el) => el.id === id);
    if (track) {
      this.favouritesService.addTrack(id);
      throw new HttpException(
        this.getSuccessAnswer('track'),
        HttpStatus.CREATED,
      );
    }
    throw new HttpException(
      this.getErrorAnswer('track', 0),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Post('/album/:id')
  addAlbumToFavs(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException(
        this.getErrorAnswer('album', 1),
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = this.repository.albums.find((el) => el.id === id);
    if (album) {
      this.favouritesService.addAlbum(id);
      throw new HttpException(
        this.getSuccessAnswer('album'),
        HttpStatus.CREATED,
      );
    }
    throw new HttpException(
      this.getErrorAnswer('album', 0),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Post('/artist/:id')
  addArtistToFavs(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException(
        this.getErrorAnswer('artist', 1),
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist = this.repository.artists.find((el) => el.id === id);
    if (artist) {
      this.favouritesService.addArtist(id);
      throw new HttpException(
        this.getSuccessAnswer('artist'),
        HttpStatus.CREATED,
      );
    }
    throw new HttpException(
      this.getErrorAnswer('artist', 1),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Delete('/track/:id')
  deleteTrackFromFavs(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException(
        this.getErrorAnswer('track', 1),
        HttpStatus.BAD_REQUEST,
      );
    }

    const track = this.repository.tracks.find((el) => el.id === id);
    if (track) {
      this.favouritesService.removeTrack(id);
      throw new HttpException(
        this.getSuccessAnswer('track', 0),
        HttpStatus.NO_CONTENT,
      );
    }
    throw new HttpException(
      this.getErrorAnswer('artist', 1),
      HttpStatus.NOT_FOUND,
    );
  }

  @Delete('/album/:id')
  deleteAlbumFromFavs(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException(
        this.getErrorAnswer('track', 1),
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = this.repository.albums.find((el) => el.id === id);
    if (album) {
      this.favouritesService.removeAlbum(id);
      throw new HttpException(
        this.getSuccessAnswer('album', 0),
        HttpStatus.NO_CONTENT,
      );
    }
    throw new HttpException(
      this.getErrorAnswer('album', 1),
      HttpStatus.NOT_FOUND,
    );
  }

  @Delete('/artist/:id')
  deleteArtistFromFavs(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException(
        this.getErrorAnswer('track', 1),
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist = this.repository.artists.find((el) => el.id === id);
    if (artist) {
      this.favouritesService.removeArtist(id);
      throw new HttpException(
        this.getSuccessAnswer('artist', 0),
        HttpStatus.NO_CONTENT,
      );
    }
    throw new HttpException(
      this.getErrorAnswer('artist', 1),
      HttpStatus.NOT_FOUND,
    );
  }
}
