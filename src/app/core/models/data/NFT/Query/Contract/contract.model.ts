import { chainType } from "../../Payloads";

export interface ContractSaleStatisticQuery {
    contract_address: string,
    chain: chainType
}