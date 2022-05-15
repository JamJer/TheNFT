import { chainType } from "../../Payloads/Chain";
import { order_type } from "../../Payloads/Order";
import { pageSize } from "../../Payloads/Page";

export interface NFTSearchQuery {
    text: string, 
    chain: chainType, 
    order_by: order_type, 
    page_number: number, 
    page_size: pageSize
}