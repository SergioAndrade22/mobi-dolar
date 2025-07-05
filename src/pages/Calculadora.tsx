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
  IonLabel,
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
  const [selectedQuotation, setSelectedQuotation] = useState("blue" as Quotation)
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
      <IonHeader>
        <IonToolbar>
          <IonTitle className="header ut--l_r_margin">💱 Calculadora</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Calculadora</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="conversion-settings ut--l_r_margin">
          <div className="quotation-select-group">
            <IonLabel position="stacked" className="select-label">Tipo de cotización</IonLabel>
            <IonSelect
              className="conversion-select ion-text-capitalize"
              placeholder="Seleccione una cotización"
              value={selectedQuotation}
              onIonChange={(event: SelectCustomEvent) => handleSelect(event.detail.value as Quotation)}
            >
              {Object.keys(quotationsMap).map((key) => (
                <IonSelectOption className='ion-text-capitalize' key={key} value={key}>
                  {key}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>

          <div className="conversion-toggle-group">
            <IonLabel className="toggle-label">Conversión</IonLabel>
            <div className="toggle-wrapper">
              <IonText>{toPesos ? "💵 Dólares" : "🇦🇷 Pesos"}</IonText>
              <IonButton
                className="swap-btn ion-activatable ripple-parent"
                size="small"
                onClick={() => handleToggle()}
              >
                <IonRippleEffect />
                <IonIcon icon={swapHorizontalOutline} />
              </IonButton>
              <IonText>{toPesos ? "🇦🇷 Pesos" : "💵 Dólares"}</IonText>
            </div>
          </div>
        </div>

        {selectedQuotation && (
          <IonInput
            className="ut--l_r_margin conversion-input"
            label="Ingrese el monto que desea convertir:"
            labelPlacement="floating"
            type="number"
            placeholder="#####"
            value={input}
            onIonInput={(event: InputCustomEvent) => {
              const asFloat = parseFloat(event.detail.value as string);
              setInput(Number.isNaN(asFloat) ? 0 : asFloat);
            }}
          />
        )}

        {loading ? (
          <IonSpinner name="bubbles" />
        ) : (
          selectedQuotation && (
            <IonCard className="ut--l_r_margin conversion-card">
              <IonCardHeader>
                <IonCardTitle>💹 Conversión</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonText className="conversion conversion-buy">
                  Compra: ${convert(input, quotation.compra).toLocaleString()}
                </IonText>
                <IonText className="conversion conversion-sell">
                  Venta: ${convert(input, quotation.venta).toLocaleString()}
                </IonText>
              </IonCardContent>

              <IonText color="medium" className="card--footer">
                {new Date(quotation.fecha).toLocaleTimeString()} - {new Date(quotation.fecha).toLocaleDateString()}
              </IonText>
            </IonCard>
          )
        )}
      </IonContent>
    </IonPage>
  );
};

export default Calculadora;
