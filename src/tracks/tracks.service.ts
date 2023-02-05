import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { RepositoryService } from 'src/repository/repositoty.service';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TracksService {
  constructor(private repository: RepositoryService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = new TrackEntity(createTrackDto);
    this.repository.addTrack(track);
    return track;
  }

  async findAll(): Promise<Track[]> {
    return this.repository.tracks;
  }

  async findOne(id: string): Promise<Track> {
    return this.repository.tracks.find((track) => track.id === id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const trackForUpdate = this.repository.tracks.find(
      (track) => track.id === id,
    );
    if (!trackForUpdate)
      throw new HttpException(
        'This track does not exist',
        HttpStatus.NOT_FOUND,
      );
    const updatedTrack = { ...trackForUpdate, ...updateTrackDto };
    this.repository.updateTrack(id, updatedTrack);
    return updatedTrack;
  }

  async remove(id: string) {
    const result = !!this.repository.tracks.find((track) => track.id === id);
    if (result) this.repository.deleteTrack(id);
    return result;
  }
}
