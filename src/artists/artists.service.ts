import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = await this.artistsRepository.create(createArtistDto);
    return this.artistsRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    return this.artistsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artistToUpdate = await this.findOne(id);
    if (!artistToUpdate)
      throw new HttpException(
        'The artist with such id is not exist',
        HttpStatus.NOT_FOUND,
      );
    const updatedArtist = { ...artistToUpdate, ...updateArtistDto };
    await this.artistsRepository.update(id, updatedArtist);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.artistsRepository.delete({ id });
    return result.affected ? result.raw : null;
  }
}
