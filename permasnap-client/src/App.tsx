import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonFab,
  IonFabButton
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { images, camera, searchSharp } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet >
          <Route path="/tab1" component={Tab1} exact={true} />
          <Route path="/tab2" component={Tab2} exact={true} />
          <Route path="/tab3" component={Tab3} />
          <Route path="/" render={() => <Redirect to="/tab2" />} exact={true} />
        </IonRouterOutlet>
        <IonFab vertical='bottom' horizontal='start' >
          <IonFabButton color="primary" href='/tab1'>
            <IonIcon icon={images} />
          </IonFabButton>
        </IonFab>
        <IonFab vertical='bottom' horizontal='center' >
          <IonFabButton color='secondary' href='/tab2'>
            <IonIcon icon={camera} />
          </IonFabButton>
        </IonFab>
        <IonFab vertical='bottom' horizontal='end' >
          <IonFabButton color='tertiary'  href='/tab3'>
            <IonIcon icon={searchSharp} />
          </IonFabButton>
        </IonFab>
    </IonReactRouter>
  </IonApp>
);

export default App;
