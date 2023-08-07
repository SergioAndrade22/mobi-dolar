import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calculatorOutline, cashOutline } from 'ionicons/icons';
import Calculadora from './pages/Calculadora';
import Cotizaciones from './pages/Cotizaciones';
import "./styles/styles.css"

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/calculadora">
            <Calculadora />
          </Route>
          <Route exact path="/cotizaciones">
            <Cotizaciones />
          </Route>
          <Route exact path="/">
            <Redirect to="/calculadora" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="calculadora" href="/calculadora">
            <IonIcon aria-hidden="true" icon={calculatorOutline} />
            <IonLabel>Calculadora</IonLabel>
          </IonTabButton>
          <IonTabButton tab="cotizaciones" href="/cotizaciones">
            <IonIcon aria-hidden="true" icon={cashOutline} />
            <IonLabel>Cotizaciones</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
