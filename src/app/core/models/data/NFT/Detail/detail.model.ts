import { NFTBase } from "../Base";
import { NFTContractType, NFTStatusOfContractToken } from "../Payloads"

// Details of the NFT.
export interface NFTDetailContent extends NFTBase{
    metadata_url?: string,
    metadata?: {
        description?: string,
        background_color?: string,
        external_url?: string,
        image?: string,
        name?: string,
        animation_url?: string
    },
    file_information?: {
        height?: number;
        width?: number;
        file_size?: number;
    },
    file_url?: string,
    cached_file_url?: string,
    mint_date?: Date,
    updated_date?: Date
}

// Information of the NFT’s contract.
export interface NFTDetailContract {
    name?: string;
    symbol?: string;
    type?: NFTContractType;
}

// A JSON object with an nft property that contains details for a single NFT.
export interface NFTDetail {
    nft: NFTDetailContent,
    owner?: string,
    contract?: NFTDetailContract,
    status?: NFTStatusOfContractToken, // Status of the contract tokens in the metadata refresh queue.
    status_message?: string,
    continuation?: string,
}