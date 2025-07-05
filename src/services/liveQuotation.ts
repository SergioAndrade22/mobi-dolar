import { Quotation, quotationsMap } from "../constants"
import axios from 'axios'

const url = "https://dolarapi.com/v1/dolares/"

export const getQuotation = (type: Quotation) => {
    const uri = quotationsMap[type].dolarSi
    return axios.get(`${url}${uri}`).then(response => ({
        compra: response.data.compra, 
        venta: response.data.venta,
        fecha: response.data.fechaActualizacion
    }))
}
