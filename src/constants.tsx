export const quotationsMap = {
    blue: {
        dolarHoy: "dolar-blue",
        dolarSi: "blue",
    },
    oficial: {
        dolarHoy: "dolar-bancos-y-casas-de-cambio",
        dolarSi: "oficial",
    },
    bolsa: {
        dolarHoy: "dolar-mep",
        dolarSi: "bolsa",
    },
    ccl: {
        dolarHoy: "dolar-contado-con-liquidacion",
        dolarSi: "contadoconliqui",
    },
    solidario: {
        dolarHoy: "banco-nacion",
        dolarSi: "solidario",
    },
    crypto: {
        dolarHoy: "bitcoin-usd",
        dolarSi: "",
    },
}

export type Quotation = keyof typeof quotationsMap