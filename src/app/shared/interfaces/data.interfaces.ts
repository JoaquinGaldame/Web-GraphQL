export interface API_Reponse<T>{
  results: T
}

export interface DataResponse{
  characters: API_Reponse<Character[]>;
  episodes: API_Reponse<Episode[]>;
}

export interface Character{
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: Origin;
  location: Location;
  isFavourite: boolean;
}

interface Origin{
  name: string;
}

interface Location{
  name: string;
}

export interface Episode{
  name: string;
  episode: string;
}