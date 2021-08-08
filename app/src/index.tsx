import './styles/styles.css';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { App } from './components/organisms/App/App';
import './i18n';

const history = createBrowserHistory();

hydrate((
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>),
document.getElementById('root'));
