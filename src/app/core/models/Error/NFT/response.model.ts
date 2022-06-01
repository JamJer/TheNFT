export enum NFTPortErrorTypes {
    OK = 'OK',
    NOK = 'NOK',
}

export interface NFTPortErrorModel {
    status_code: number,
    code: string,
    message: string,
}

export interface NFTPortErrorResponse {
    response: NFTPortErrorTypes,
    error: NFTPortErrorModel,
}