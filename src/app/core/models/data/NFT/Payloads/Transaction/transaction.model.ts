export enum transactionType {
    transfer = 'transfer', 
    burn = 'burn', 
    mint = 'mint', 
    bid = 'bid', 
    list = 'list',
    sale = 'sale',
    all = 'all'
}

export enum transferTypes {
    transfer = 'transfer',
    mint = 'mint', 
    burn = 'burn'
}

export enum bidsTypes {
    bid = 'bid',
    cancel_bid = 'cancel_bid'
}

export enum listingTypes {
    list = 'list',
    cancel_list = 'cancel_list'
}

export enum marketplace {
    opensea = 'opensea',
    rarible = 'rarible'
}