import { 
  InputCustomEvent,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRippleEffect,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSkeletonText,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  SelectCustomEvent,
} from '@ionic/react';
import './Tab1.css';
import { getQuotation } from '../services/liveQuotation';
import { useEffect, useState } from 'react';
import { Quotation, quotationsMap } from '../constants';
import { swapHorizontalOutline } from 'ionicons/icons';

const defaultQuotation = {
  compra: 0,
  venta: 0,
  fecha: ""
}

const Tab1: React.FC = () => {
  const [selectedQuotation, setSelectedQuotation] = useState("" as Quotation)
  const [quotation, setQuotation] = useState(defaultQuotation)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState(undefined as unknown as number)
  const [toPesos, setToPesos] = useState(true)

  const handleSelect = (type: Quotation) => setSelectedQuotation(type)
  const handleToggle = () => setToPesos(!toPesos)

  useEffect(() => {
    if(selectedQuotation) {
      setLoading(true)
      getQuotation(selectedQuotation)
        .then(data => setQuotation(data))
        .catch(err => {
          console.error(err)
          setQuotation(defaultQuotation)
        })
        .finally(() => setLoading(false))
    }
    else
      setQuotation(defaultQuotation)
    }, [selectedQuotation])
  
  const convertToPesos = (amount: number, exchangeValue: number) => amount * exchangeValue
  const convertToDollars = (amount: number, exchangeValue: number) => amount / exchangeValue

  const convert = (amount: number, exchangeValue: number) => 
    toPesos ? 
    convertToPesos(amount, exchangeValue) : 
    convertToDollars(amount, exchangeValue)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calculadora</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Calculadora</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="change-conversion">
          <IonText>{toPesos ? "Dólares" : "Pesos"}</IonText>
          <IonButton 
            className="ion-activatable ripple-parent rounded-rectangle" 
            size={"small"}
            onClick={() => handleToggle()}
          >
            <IonRippleEffect />
            <IonIcon icon={swapHorizontalOutline} size={"small"} />
          </IonButton>
          <IonText>{toPesos ? "Pesos" : "Dólares"}</IonText>
        </div>
        <IonSelect 
          className="selector ion-text-capitalize"
          id="quotation-select"
          aria-label="Cotizaciones" 
          placeholder="Seleccione una cotización para operar"
          multiple={false}
          value={selectedQuotation}
          onIonChange={(event: SelectCustomEvent) => handleSelect(event.detail.value as Quotation)}>
          {
            Object.keys(quotationsMap).map((key) => (
              <IonSelectOption className="ion-text-capitalize" key={key} value={key}>{key}</IonSelectOption>
            ))
          }
        </IonSelect>
        {selectedQuotation ? 
          <IonInput 
            label="Ingrese el monto que desea convertir:"
            type="number"
            placeholder="#####"
            value={input}
            onIonChange={
              (event: InputCustomEvent) => 
                event.detail.value && setInput(parseFloat(event.detail.value))
            } 
          /> :
          <IonText>
            <h2>Debe seleccionar un tipo de cotización para operar</h2>
          </IonText>
        }
        {loading ?
          <IonSpinner name="bubbles"></IonSpinner> :
          input ?
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{new Date(quotation.fecha).toLocaleTimeString() + " " + new Date(quotation.fecha).toLocaleDateString()}</IonCardTitle>
                <IonCardSubtitle>Conversión</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                <IonText className={"quotation-display"}>
                  Conversión a compra: {convert(input, quotation.compra)}
                </IonText >
                <IonText className={"quotation-display"}>
                  Conversión a venta: {convert(input, quotation.venta)}
                </IonText >
              </IonCardContent>
            </IonCard> : 
            selectedQuotation && 
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                  </IonCardTitle>
                  <IonCardSubtitle>
                    <IonSkeletonText animated={true} style={{ width: '40%' }}></IonSkeletonText>
                  </IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonText className={"quotation-display"} >
                    <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
                  </IonText >
                  <IonText className={"quotation-display"} >
                    <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
                  </IonText >
                </IonCardContent>
              </IonCard>
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
