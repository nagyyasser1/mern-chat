export interface Pokemon {
  species: any;
  name: string;
  // Add other properties as needed based on the Pokeapi response structure
  // Here are some examples:
  url: string;
  id: number;
  sprites: {
    front_shiny: string | undefined;
    front_default: string; // URL of the default front sprite
  };
  types: Array<{ type: { name: string } }>; // Array of Pokemon types
  // ... add more properties as needed
}

export interface User {
  _id: string;
  fullName: string;
  username: string;
  gender: number;
  profilePic: string;
}
