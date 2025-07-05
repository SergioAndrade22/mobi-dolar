export const quotationsMap = {
    blue: {
        dolarHoy: "dolar-blue",
        dolarSi: "blue",
    },
    oficial: {
        dolarHoy: "dolar-oficial",
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
    mayorista: {
        dolarHoy: "dolar-mayorista",
        dolarSi: "mayorista",
    },
    crypto: {
        dolarHoy: "dolar-cripto",
        dolarSi: "cripto",
    },
    tarjeta: {
        dolarHoy: "dolar-tarjeta",
        dolarSi: "tarjeta",
    },
}

export type Quotation = keyof typeof quotationsMap