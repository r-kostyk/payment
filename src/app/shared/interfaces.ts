export interface Product {
    name: string
    date: Date
    amount: number
}

export interface CardType {
    cardTypes: Card[]
}

export interface Card {
    id: string
    value: string 
}

export interface Response {
    responseCode: string
    responseMessage: string
    invoiceNo: string
    approvalCode?: string
}