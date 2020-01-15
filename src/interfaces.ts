export enum TYPE_COLOURS {
    bug = 'B1C12E',
    dark = '4F3A2D',
    dragon = '755EDF',
    electric = 'F8D030',
    fairy = 'F4B1F4',
    fighting = '82351D',
    fire = 'E73B0C',
    flying = 'A3B3F7',
    ghost = '6060B2',
    grass = '74C236',
    ground = 'D3B357',
    ice = 'A3E7FD',
    normal = 'C8C4BC',
    poison = '934594',
    psychic = 'ED4882',
    rock = 'B9A156',
    steel = 'B5B5C3',
    water = '3295F6'
  }

  /* Declaro variables para cada interfáz*/
  export interface Results{
      name: string;
      url: string;
      id?: string;
      details?: PokemonDetalles;
      description? : string;
  }

  export interface PokemonAPI{
      cantidad: number;
      siguiente: string;
      results : Results[];
  }

  export interface Sprites{
      front_default: string;
  }

  export interface PokemonDetalles{
      nombredetalle:string;
      id:number;
      sprites: Sprites;
      abilities?: Array<any>;
      types?: Array<any>;

  }