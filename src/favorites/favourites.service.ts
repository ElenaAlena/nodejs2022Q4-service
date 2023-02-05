import { Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repositoty.service';
import { FavoritesResponse } from './interfaces/favourites.interfaces';

@Injectable()
export class FavouritesService {
  constructor(private repository: RepositoryService) {}

  async getAll(): Promise<FavoritesResponse> {
    return this.repository.getFavourites();
  }

  async addTrack(id: string) {
    this.repository.addTrackToFavourites(id);
  }

  async removeTrack(id: string) {
    this.repository.deleteTrackFromFavourites(id);
  }

  async addAlbum(id: string) {
    this.repository.addAlbumToFavourites(id);
  }

  async removeAlbum(id: string) {
    this.repository.deleteAlbumFromFavourites(id);
  }

  async addArtist(id: string) {
    this.repository.addArtistToFavourites(id);
  }

  async removeArtist(id: string) {
    this.repository.deleteArtistFromFavourites(id);
  }
}
