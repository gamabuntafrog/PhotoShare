import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import App from './App';
import './index.css';
import ReactDOM from "react-dom";
import ThemeAppWrapper from "./ThemeAppWrapper";
import {PersistGate} from 'redux-persist/integration/react';



const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeAppWrapper/>
        </PersistGate>
    </Provider>
);


// ReactDOM.render( <React.StrictMode>
//     <Provider store={store}>
//
//         <App />
//     </Provider>
// </React.StrictMode>, document.getElementById('root') as HTMLElement );