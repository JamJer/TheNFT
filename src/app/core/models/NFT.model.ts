export interface NFTPreview {
    cached_file_url: string,
    chain: chainType,
    contract_address: string,
    description: string,
    mint_date: string,
    name: string,
    token_id: string
}

export enum chainType {
    ethereum = 'ethereum',
    polygon = 'polygon',
    rinkeby = 'rinkeby'
}