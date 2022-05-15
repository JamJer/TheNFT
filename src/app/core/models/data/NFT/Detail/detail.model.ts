import { chainType } from "../Payloads"

export interface NFTDetail {
    nft: {
        chain: chainType,
        contract_address: string,
        token_id: string,
        metadata_url?: string,
        metadata?: {
            description: string,
            background_color: string,
            external_url: string,
            image: string,
            name: string,
            animation_url: string
        },
        file_information: {
            height: number;
            width: number;
            file_size: number;
        },
        file_url: string,
        cached_file_url: string,
        mint_date: Date,
        updated_date: Date
    },
    owner: string,
    contract: {
        name: string;
        symbol: string;
        type: string;
    }
}