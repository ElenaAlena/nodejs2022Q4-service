import { Album } from '../../albums/interfaces/album.interface';
import { Artist } from '../../artists/interfaces/artist.interface';
import { Track } from '../../tracks/interfaces/track.interface';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
