import './QuotationSelector.css'
import { IonSelect, IonSelectOption, SelectCustomEvent } from '@ionic/react';
import { Quotation, quotationsMap } from '../constants';

type Props = {
    selectedValues: Quotation[]
    setSelectedValues: (values: Quotation[]) => void
}

const QuotationSelector: React.FC<Props> = ({ selectedValues, setSelectedValues }) => {
    const handleChange = (quotation: Quotation[]) => {
        setSelectedValues(quotation)
    }

  return (
    <IonSelect 
      className="selector ion-text-capitalize"
      id="quotation-select"
      aria-label="Cotizaciones" 
      placeholder="Seleccione las cotizaciones a mostrar"
      multiple={true}
      value={selectedValues}
      onIonChange={(event: SelectCustomEvent) =>handleChange(event.detail.value as Quotation[])}>
      {
        Object.keys(quotationsMap).map((key) => (
          <IonSelectOption className="ion-text-capitalize" key={key} value={key}>{key}</IonSelectOption>
        ))
      }
    </IonSelect>
  );
}

export default QuotationSelector;