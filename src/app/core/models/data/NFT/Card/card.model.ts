import { chainType } from "../Payloads/Chain";

export interface NFTCard {
    cached_file_url: string;
    chain: chainType;
    contract_address: string;
    description: string;
    mint_date: string;
    name: string;
    token_id: string;
}