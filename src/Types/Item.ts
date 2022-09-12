export default interface Item {
  podcast_artist?: string;
  created_by?: string;
  items?: Item[];
  items_count?: number;
  thumbnail?: string;
  id?: string;
  bg_colors?: string[];
  artist: string;
  photo: string;
  song: string;
  title: string;
  type: string;
  name: string;
  link: string;
  item?: {
    link: string;
    bg_colors: string[];
  };
}
