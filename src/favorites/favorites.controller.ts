import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './interfaces/favorites.interfaces';

@Controller('favs')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll(): Promise<FavoritesResponse> {
    return this.favoritesService.getAll();
  }

  @Post('/track/:id')
  async addTrackToFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    await this.favoritesService.addTrack(id);
  }

  @Post('/album/:id')
  async addAlbumToFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    await this.favoritesService.addAlbum(id);
  }

  @Post('/artist/:id')
  async addArtistToFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    await this.favoritesService.addArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrackFromFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    await this.favoritesService.removeTrack(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbumFromFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    await this.favoritesService.removeAlbum(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtistFromFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    await this.favoritesService.removeArtist(id);
  }
}
