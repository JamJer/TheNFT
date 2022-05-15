import { chainType } from "../../Payloads";

export interface NFTDetailQuery{
    contract_address: string,
    token_id: string,
    chain: chainType,
    refresh_metadata: boolean
}