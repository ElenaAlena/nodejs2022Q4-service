import { v4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';

export class AlbumEntity {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
  constructor({ name, year, artistId = null }: CreateAlbumDto) {
    this.id = v4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
