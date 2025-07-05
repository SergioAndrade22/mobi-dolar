export const quotationsMap = {
    blue: {
        dolarHoy: "dolar-blue",
        dolarSi: "blue",
    },
    bolsa: {
        dolarHoy: "dolar-mep",
        dolarSi: "bolsa",
    },
    ccl: {
        dolarHoy: "dolar-contado-con-liquidacion",
        dolarSi: "contadoconliqui",
    },
    crypto: {
        dolarHoy: "dolar-cripto",
        dolarSi: "cripto",
    },
    oficial: {
        dolarHoy: "dolar-oficial",
        dolarSi: "oficial",
    },
    mayorista: {
        dolarHoy: "dolar-mayorista",
        dolarSi: "mayorista",
    },
    tarjeta: {
        dolarHoy: "dolar-tarjeta",
        dolarSi: "tarjeta",
    },
}

export type Quotation = keyof typeof quotationsMap