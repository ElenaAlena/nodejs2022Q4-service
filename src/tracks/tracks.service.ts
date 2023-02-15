import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = this.tracksRepository.create(createTrackDto);
    return this.tracksRepository.save(track);
  }

  async findAll(): Promise<Track[]> {
    return this.tracksRepository.find({ loadRelationIds: true });
  }

  async findOne(id: string): Promise<Track> {
    return this.tracksRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const trackForUpdate = await this.findOne(id);
    if (!trackForUpdate)
      throw new HttpException(
        'This track does not exist',
        HttpStatus.NOT_FOUND,
      );
    const updatedTrack = { ...trackForUpdate, ...updateTrackDto };
    await this.tracksRepository.update(id, updatedTrack);
    return updatedTrack;
  }

  async remove(id: string) {
    const result = await this.tracksRepository.delete({ id });
    return result.affected ? result.raw : null;
  }
}
