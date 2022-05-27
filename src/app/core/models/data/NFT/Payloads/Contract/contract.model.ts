export enum NFTContractType {
    ERC721 = 'ERC721',
    ERC1155 = 'ERC1155',
    ERC721_lazy = 'ERC721_lazy',
    ERC1155_lazy = 'ERC1155_lazy',
    UNDEFINED = 'UNDEFINED'
}

export enum NFTStatusOfContractToken {
    ADDED = 'ADDED',
    PROCESSING = 'PROCESSING',
    PENDING = 'PENDING',
    REFRESHED_RECENTLY = 'REFRESHED_RECENTLY'
}