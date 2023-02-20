import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from '../albums/albums.service';
import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistsService } from '../artists/artists.service';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { TracksService } from '../tracks/tracks.service';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './entities/favorites.entity';
import { FavoritesResponse } from './interfaces/favorites.interfaces';

@Injectable()
export class FavoritesService {
  private _id: string;
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoritesRepository: Repository<FavoriteEntity>,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
    private artistsService: ArtistsService,
  ) {
    this.init();
  }

  async init(): Promise<void> {
    const record = await this.favoritesRepository.find();
    if (record.length) {
      this._id = record[0].id;
    } else {
      const favorite = this.favoritesRepository.create();
      await this.favoritesRepository.save(favorite);
    }
  }

  async getAll(): Promise<FavoritesResponse> {
    const favs = await this.getFav();
    favs.albums.forEach(
      (a) => (a.artistId = (a.artistId as any as ArtistEntity)?.id ?? null),
    );
    favs.tracks.forEach(
      (t) => (
        (t.artistId = (t.artistId as any as ArtistEntity)?.id ?? null),
        (t.albumId = (t.albumId as any as AlbumEntity)?.id ?? null)
      ),
    );
    return favs;
  }

  async getFav() {
    const favs = await this.favoritesRepository.findOne({
      where: { id: this._id },
      relations: ['artists', 'albums', 'tracks'],
    });

    return { ...favs };
  }

  async addTrack(id: string) {
    const favs = await this.getFav();
    const track = await this.tracksService.findOne(id);
    if (track) {
      favs.tracks.push(track as TrackEntity);
      await this.favoritesRepository.save(favs);
      throw new HttpException(
        'The track was successfully added to favourites',
        HttpStatus.CREATED,
      );
    } else {
      throw new HttpException(
        'This track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeTrack(id: string) {
    const favs = await this.getFav();
    const track = await this.tracksService.findOne(id);
    if (track) {
      const index = favs.tracks.findIndex((el) => el.id === id);
      favs.tracks.splice(index, 1);
      await this.favoritesRepository.save(favs);
      throw new HttpException(
        'This track was successfully deleted from favorites',
        HttpStatus.NO_CONTENT,
      );
    } else {
      throw new HttpException(
        'This track is not in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async addAlbum(id: string) {
    const favs = await this.getFav();
    const album = await this.albumsService.findOne(id);
    if (album) {
      favs.albums.push(album as AlbumEntity);
      await this.favoritesRepository.save(favs);
      throw new HttpException(
        'The Album was successfully added to favorites',
        HttpStatus.CREATED,
      );
    } else {
      throw new HttpException(
        'This Album is not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeAlbum(id: string) {
    const favs = await this.getFav();
    const album = await this.albumsService.findOne(id);
    if (album) {
      const index = favs.albums.findIndex((el) => el.id === id);
      favs.albums.splice(index, 1);
      await this.favoritesRepository.save(favs);
      throw new HttpException(
        'This album was successfully deleted from favorites',
        HttpStatus.NO_CONTENT,
      );
    } else {
      throw new HttpException(
        'This album is not in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async addArtist(id: string) {
    const favs = await this.getFav();
    const artist = await this.artistsService.findOne(id);
    if (artist) {
      favs.artists.push(artist as ArtistEntity);
      await this.favoritesRepository.save(favs);
      throw new HttpException(
        'The Artist was successfully added to favourites',
        HttpStatus.CREATED,
      );
    } else {
      throw new HttpException(
        'This Artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeArtist(id: string) {
    const favs = await this.getFav();
    const artist = await this.artistsService.findOne(id);
    if (artist) {
      const index = favs.artists.findIndex((el) => el.id === id);
      favs.artists.splice(index, 1);
      await this.favoritesRepository.save(favs);
      throw new HttpException(
        'This artist was successfully deleted from favorites',
        HttpStatus.NO_CONTENT,
      );
    } else {
      throw new HttpException(
        'This artist is not in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
