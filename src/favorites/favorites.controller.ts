import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { RepositoryService } from 'src/repository/repositoty.service';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './interfaces/favorites.interfaces';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private repository: RepositoryService,
  ) {}

  getSuccessAnswer(text, type = 1) {
    return type === 1
      ? `The ${text} was successfully added to favorites`
      : `The ${text} was successfully removed from favorites`;
  }

  getErrorAnswer(text, type = 1) {
    return type === 1
      ? `The ${text} id is not valid`
      : `The ${text} is not exist`;
  }

  @Get()
  getAll(): Promise<FavoritesResponse> {
    return this.favoritesService.getAll();
  }

  @Post('/track/:id')
  addTrackToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.repository.tracks.find((el) => el.id === id);
    if (track) {
      this.favoritesService.addTrack(id);
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
  addAlbumToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.repository.albums.find((el) => el.id === id);
    if (album) {
      this.favoritesService.addAlbum(id);
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
  addArtistToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.repository.artists.find((el) => el.id === id);
    if (artist) {
      this.favoritesService.addArtist(id);
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
  deleteTrackFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.repository.tracks.find((el) => el.id === id);
    if (track) {
      this.favoritesService.removeTrack(id);
      throw new HttpException(
        this.getSuccessAnswer('track', 0),
        HttpStatus.NO_CONTENT,
      );
    }
    throw new HttpException(
      this.getErrorAnswer('track', 1),
      HttpStatus.NOT_FOUND,
    );
  }

  @Delete('/album/:id')
  deleteAlbumFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.repository.albums.find((el) => el.id === id);
    if (album) {
      this.favoritesService.removeAlbum(id);
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
  deleteArtistFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.repository.artists.find((el) => el.id === id);
    if (artist) {
      this.favoritesService.removeArtist(id);
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
