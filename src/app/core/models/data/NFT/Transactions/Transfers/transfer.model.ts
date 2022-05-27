import { transferTypes } from "../../Payloads";

export interface NFTransactionTransfer {
    type: transferTypes,
    owner_address?: string,
    transfer_from?: string,
    transfer_to?: string,
    contract_address: string,
    token_id: string,
    quantity: number,
    transaction_hash: string,
    block_hash: string,
    block_number: number,
    transaction_date: string
}