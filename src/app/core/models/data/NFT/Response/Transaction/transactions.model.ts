import { NFTransactionBids, NFTransactionListings, NFTransactionSales, NFTransactionTransfer } from "../../Transactions";

export type NFTransactionsRecords = NFTransactionTransfer | NFTransactionSales | NFTransactionBids | NFTransactionListings;

export interface NFTransactionResponse {
    response: string,
    transactions: NFTransactionsRecords[],
    continuation?: string 
}