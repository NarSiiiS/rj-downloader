import type Item from '@/Types/Item';

export default interface AlbumItem {
  album_album: string;
  album_artist: string;
  album_tracks: Item[];
  thumbnail: string;
  id: string;
  bg_colors: string[];
  photo: string;
  type: string;
}
