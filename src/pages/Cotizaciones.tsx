import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Cotizaciones.css';
import QuotationSelector from '../components/QuotationSelector';
import { useEffect, useState } from 'react';
import QuotationFrame from '../components/QuotationFrame';
import { Quotation, quotationsMap } from '../constants';
import { StoreManager } from '../services/storage';

const Cotizaciones: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState(['blue', 'ccl'] as Quotation[])
  const store = new StoreManager<Quotation[]>();
  store.init()

  useEffect(() => {
    store.getItem("cotizaciones").then((cotizaciones: Quotation[]) => {
      for (let quot of cotizaciones) {
        if (!quotationsMap[quot]) {
          cotizaciones = cotizaciones.filter(q => q !== quot);
        }
      }
      cotizaciones && setSelectedValues(cotizaciones)
    })
  }, [])

  const updateSelectedValues = (values: Quotation[]) => {
    store.setItem("cotizaciones", values)
    setSelectedValues(values)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="header ut--l_r_margin">Cotizaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cotizaciones</IonTitle>
          </IonToolbar>
        </IonHeader>
        <QuotationSelector selectedValues={selectedValues} setSelectedValues={updateSelectedValues}/>
        <div className="inner-container ut--l_r_margin">
          {
            selectedValues.map((type)=><QuotationFrame key={type} type={type}/>)
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cotizaciones;
