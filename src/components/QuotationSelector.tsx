import { IonItem, IonList, IonSelect, IonSelectOption, SelectCustomEvent } from '@ionic/react';
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
    <IonList>
      <IonItem>
        <IonSelect 
            id="quotation-select"
            aria-label="Cotizaciones" 
            placeholder="Seleccione las cotizaciones a mostrar"
            multiple={true}
            value={selectedValues}
            onIonChange={(event: SelectCustomEvent) =>handleChange(event.detail.value as Quotation[])}>
            {
                Object.keys(quotationsMap).map((key) => (
                    <IonSelectOption key={key} value={key} >{key}</IonSelectOption>
                ))
            }
        </IonSelect>
      </IonItem>
    </IonList>
  );
}

export default QuotationSelector;