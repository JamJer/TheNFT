import { AddrCutFromHead, AddrTrimFromCenter } from './address.pipe';
import { LinkNFTAddr } from './link.pipe';
import { PriceNFTUnit } from './price.pipe';

export const CustomPipes = [
    AddrCutFromHead,
    AddrTrimFromCenter,
    LinkNFTAddr,
    PriceNFTUnit
];

export * from './address.pipe';