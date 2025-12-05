
export type CategoryKey = 'genres' | 'production' | 'instruments' | 'moods' | 'vocals' | 'structure' | 'effects' | 'v5Advanced' | 'mixingPresets' | 'animeDrama' | 'v5Performance';

export interface TagMap {
  [key: string]: string;
}

export interface CategoryMap {
  [categoryName: string]: TagMap;
}

export interface DemoTemplate {
  name: string;
  tags: {
    [key in CategoryKey]?: string[];
  };
}

export interface StructureTemplate {
  name: string;
  content: string;
}

export interface SelectionState {
  genres: string[];
  production: string[];
  instruments: string[];
  moods: string[];
  vocals: string[];
  structure: string[];
  effects: string[];
  v5Advanced: string[];
  mixingPresets: string[];
  animeDrama: string[];
  v5Performance: string[];
}
