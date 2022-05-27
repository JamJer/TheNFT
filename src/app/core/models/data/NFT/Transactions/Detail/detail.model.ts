import { NFTContractType } from "../../Payloads"

export interface NFTransactionDetail {
    contract_type: NFTContractType,
    contract_address: string,
    token_id: string,
    metadata_url: string,
    creators: {
        account_address: string,
        creator_share: number
    }[],
    royalties: {
        account_address: string,
        royalty_share: string,
    }[],
    signatures: string[],
    total: number
}

export interface NFTransactionPrice {
    asset_type: 'ETH' | 'ERC20',
    contract_address: string,
    price: number,
    price_usd: number
}