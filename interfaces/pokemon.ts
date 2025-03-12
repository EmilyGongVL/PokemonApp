export interface Pokemon {
  name: string;
  image: string;
  id: string;
  url: string;
  height?: number;
  sprites?: {
    front_default: string;
  };
  abilities?: {
    ability: {
      name: string;
    };
  }[];
  stats?: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}
