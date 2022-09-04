export default interface Item {
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
