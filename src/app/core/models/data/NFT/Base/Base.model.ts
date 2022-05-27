import { chainType } from "../Payloads";

export interface NFTBase {
    chain: chainType,
    contract_address: string,
    token_id: string
}