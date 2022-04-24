export interface NFTPreview {
    cached_file_url: string,
    chain: chainType,
    contract_address: string,
    description: string,
    mint_date: string,
    name: string,
    token_id: string
}

export interface NFTSearchByText {
    text: string, 
    chain: chainType, 
    order_by: order_type, 
    page_number: number, 
    page_size: number
}

export interface NFTSearchByAccount {
    account: string, 
    chain: chainType, 
    continuation: string, 
    include: string,
    page_size: number
}

export type NFTsearchTypes = NFTSearchByText | NFTSearchByAccount;

export enum chainType {
    all = 'all',
    ethereum = 'ethereum',
    polygon = 'polygon',
    rinkeby = 'rinkeby',
}

export enum order_type {
    relevance = 'relevance',
    mint_date = 'mint_date'
}

export enum APIFuncType {
    searchByText = '/search',
    searchByAccount = '/accounts'
}