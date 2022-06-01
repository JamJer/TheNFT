import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { transactionTypeUnion } from "../../Payloads";

export interface NFTransactionTable {
    event: transactionTypeUnion,
    eventIcon?: IconDefinition,
    price?: number,
    priceInUSD?: number,
    from?: string,
    to?: string,
    date?: Date
}