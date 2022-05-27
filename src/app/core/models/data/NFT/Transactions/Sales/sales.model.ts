import { marketplace } from "../../Payloads"
import { NFTransactionDetail, NFTransactionPrice } from "../Detail"

export interface NFTransactionSales {
    type: 'sale',
    buyer_address: string,
    seller_address: string,
    nft: NFTransactionDetail,
    quantity?: number,
    price_details: NFTransactionPrice,
    transaction_hash: string,
    block_hash: string,
    block_number: number,
    transaction_date: string,
    marketplace?: marketplace
}