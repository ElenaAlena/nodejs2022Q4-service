import { v4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';

export class TrackEntity {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
  constructor({ name, artistId, albumId, duration }: CreateTrackDto) {
    this.id = v4();
    this.name = name;
    this.artistId = artistId || null;
    this.albumId = albumId || null;
    this.duration = duration;
  }
}
