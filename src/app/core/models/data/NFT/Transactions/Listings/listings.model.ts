import { listingTypes, marketplace } from "../../Payloads";
import { NFTransactionDetail, NFTransactionPrice } from "../Detail";

export interface NFTransactionListings {
    type: listingTypes,
    lister_address: string,
    nft: NFTransactionDetail,
    quantity?: number,
    price_details: NFTransactionPrice,
    transaction_hash: string,
    block_hash: string,
    block_number: string,
    transaction_date: string,
    marketplace: marketplace
}