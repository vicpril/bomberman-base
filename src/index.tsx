import './styles/styles.css';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { App } from './components/organisms/App/App';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
