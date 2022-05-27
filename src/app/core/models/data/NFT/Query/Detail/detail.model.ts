import { NFTBase } from "../../Base";

export interface NFTDetailQuery extends NFTBase{
    refresh_metadata: boolean
}