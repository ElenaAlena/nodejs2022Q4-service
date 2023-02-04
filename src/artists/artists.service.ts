import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repositoty.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistsService {
  constructor(private repository: RepositoryService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = new ArtistEntity(createArtistDto);
    this.repository.addArtist(newArtist);
    return newArtist;
  }

  async findAll(): Promise<Artist[]> {
    return this.repository.artists;
  }

  async findOne(id: string): Promise<Artist> {
    return this.repository.artists.find((artist) => artist.id === id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artistToUpdate = this.repository.artists.find(
      (artist) => artist.id === id,
    );
    if (!artistToUpdate)
      throw new HttpException(
        'The artist with such id is not exist',
        HttpStatus.NOT_FOUND,
      );
    const updatedArtist = { ...artistToUpdate, ...updateArtistDto };
    this.repository.updateArtist(id, updatedArtist);
    return updatedArtist;
  }

  async remove(id: string) {
    const result = !!this.repository.artists.find((artist) => artist.id === id);
    if (result) {
      this.repository.deleteArtist(id);
    }
    return result;
  }
}
