import { chainType } from "../Payloads";

export interface createEasy {
    chain: chainType,
    contract_address: string,
    transaction_hash: string,
    transaction_external_url: string,
    mint_to_address: string,
    name: string,
    description: string,
}