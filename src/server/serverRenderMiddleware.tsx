import { renderToString } from 'react-dom/server';
import React from 'react';
import { App } from 'components/organisms/App/App';
import { StaticRouterContext } from 'react-router';
import { createRootReducer, RootState } from 'store/store';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { Request, Response } from 'express';
import { toggleTheme } from 'store/user/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';

function makeHTMLPage(content: string, reduxState: RootState) {
  return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Rendered on server</title>
              <link href="/main.css" rel="stylesheet">
          </head>
          <body>
              <div id="root">${content}</div>
              <script>
                window.__INITIAL_STATE__ = ${JSON.stringify({ ...reduxState })}
              </script>
              <script src="/main.js"></script>
          </body>
          </html>
      `;
}

export const serverRenderMiddleware = (req: Request, res: Response) => {
  const location = req.url;
  const context: StaticRouterContext = {};

  const history = createMemoryHistory({ initialEntries: ['/'] });
  console.log('ssr', location);
  // Не импортируем стор из store напрямую тк нам надо создавать его заново для каждого рендера на сервере
  // чтобы при перезагрузке страницы корректно перезагружался стор
  const store = configureStore({
    reducer: createRootReducer(history),
  });

  const jsx = (
    <Provider store={store}>
      <StaticRouter context={context} location={location}>
        <App />
      </StaticRouter>
    </Provider>
  );

  // Переключаем темку, чтобы показать что мы можем поменять стейт экшном на сервере и отправить измененный стейт
  // на клиент, который с ним инициализирует свой стор
  store.dispatch(toggleTheme());

  const reduxState = store.getState();

  if (context.url) {
    res.redirect(context.url);
    return;
  }

  const appContentHTML = renderToString(jsx);

  res.send(makeHTMLPage(appContentHTML, reduxState));
};
