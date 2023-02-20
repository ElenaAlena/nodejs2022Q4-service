import { Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repositoty.service';
import { FavoritesResponse } from './interfaces/favorites.interfaces';

@Injectable()
export class FavoritesService {
  constructor(private repository: RepositoryService) {}

  async getAll(): Promise<FavoritesResponse> {
    return this.repository.getFavorites();
  }

  async addTrack(id: string) {
    this.repository.addTrackToFavorites(id);
  }

  async removeTrack(id: string) {
    this.repository.deleteTrackFromFavorites(id);
  }

  async addAlbum(id: string) {
    this.repository.addAlbumToFavorites(id);
  }

  async removeAlbum(id: string) {
    this.repository.deleteAlbumFromFavorites(id);
  }

  async addArtist(id: string) {
    this.repository.addArtistToFavorites(id);
  }

  async removeArtist(id: string) {
    this.repository.deleteArtistFromFavorites(id);
  }
}
