import { 
  InputCustomEvent,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRippleEffect,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  SelectCustomEvent,
} from '@ionic/react';
import './Calculadora.css';
import { getQuotation } from '../services/liveQuotation';
import { useEffect, useState } from 'react';
import { Quotation, quotationsMap } from '../constants';
import { swapHorizontalOutline } from 'ionicons/icons';

const defaultQuotation = {
  compra: 0,
  venta: 0,
  fecha: ""
}

const Calculadora: React.FC = () => {
  const [selectedQuotation, setSelectedQuotation] = useState("" as Quotation)
  const [quotation, setQuotation] = useState(defaultQuotation)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState(0)
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
      <IonHeader className="resize-mobile">
        <IonToolbar>
          <IonTitle className="header ut--l_r_margin">Calculadora</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Calculadora</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="change-conversion ut--l_r_margin">
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
          className="ion-text-capitalize ut--l_r_margin"
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
        {selectedQuotation && 
          <IonInput
            className="ut--l_r_margin"
            label="Ingrese el monto que desea convertir:"
            labelPlacement="floating"
            type="number"
            placeholder="#####"
            value={input}
            onIonInput={
              (event: InputCustomEvent) => {
                const asFloat = parseFloat(event.detail.value as string)
                if (!Number.isNaN(asFloat)) 
                  setInput(asFloat)
                else
                  setInput(0)
              }
            } 
          />
        }
        {loading?
          <IonSpinner name="bubbles"></IonSpinner> :
            (selectedQuotation &&
            <IonCard className="ut--l_r_margin">
              <IonCardHeader>
                <IonCardTitle >Conversión</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonText color="dark" className={"conversion quotation-display"}>
                  Conversión a compra: ${convert(input, quotation.compra).toLocaleString()}
                </IonText >
                <IonText color="dark" className={"conversion quotation-display"}>
                  Conversión a venta: ${convert(input, quotation.venta).toLocaleString()}
                </IonText >
              </IonCardContent>

              <IonText color="medium" className={"card--footer"}>{new Date(quotation.fecha).toLocaleTimeString() + " " + new Date(quotation.fecha).toLocaleDateString()}</IonText>
            </IonCard>)
        }
      </IonContent>
    </IonPage>
  );
};

export default Calculadora;
