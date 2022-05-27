import { NFTBase } from "../../Base";
import { transactionType } from "../../Payloads";

export interface NFTransactionQuery extends NFTBase{
    type: transactionType[],
    continuation?: string,
    page_size?: number
}