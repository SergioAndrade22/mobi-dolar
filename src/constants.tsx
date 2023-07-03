export const quotationsMap = {
    blue: "dolar-blue",
    oficial: "dolar-bancos-y-casas-de-cambio",
    bolsa: "dolar-mep",
    ccl: "dolar-contado-con-liquidacion",
    crypto: "bitcoin-usd",
    solidario: "banco-nacion"
}

export type Quotation = keyof typeof quotationsMap