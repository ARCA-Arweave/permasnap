import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'; //delays until data retrieved
import store, { persistor} from './redux/store'
// import { assertPermasnapAlbum } from './providers/FilesystemProvider';
import { defineCustomElements } from '@ionic/pwa-elements/loader'

/* defineCustomElements is for camera error */
defineCustomElements(window);
// /* prompt for permissions on app first start */
// assertPermasnapAlbum()


ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor} loading={(<h1>Continue showing splashscreen here</h1>)}>
			<App />
		</PersistGate>
	</Provider>
	, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
