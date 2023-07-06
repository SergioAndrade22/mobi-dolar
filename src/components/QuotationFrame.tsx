import { Quotation, quotationsMap } from '../constants'
import './Quotation.css'

const QuotationFrame: React.FC<{type: Quotation}> = ({type}) => {
    return (
        <iframe className="frame" src={`https://dolarhoy.com/i/cotizaciones/${quotationsMap[type].dolarHoy}`}>
        </iframe>
    )
}

export default QuotationFrame