import { NFTBase } from "../Base";

export interface NFTCard extends NFTBase{
    cached_file_url: string;
    description: string;
    mint_date: string;
    name: string;
}