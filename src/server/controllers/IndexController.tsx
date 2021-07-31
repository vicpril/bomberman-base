import url from 'url';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { App } from 'components/organisms/App/App';
import { StaticRouterContext, matchPath } from 'react-router';
import { RootState, createRootReducer } from 'store/store';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { Request, Response } from 'express';
import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';

import { routes } from 'routes';

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

const createStore = (initialState = {}) => {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  // Не импортируем стор из store напрямую тк нам надо создавать его заново для каждого рендера на сервере
  // чтобы при перезагрузке страницы корректно перезагружался стор
  return configureStore({
    reducer: createRootReducer(history),
    preloadedState: initialState,
  });
};

export const IndexController = {

  index: (req: Request, res: Response) => {
    const location = req.url;
    const context: StaticRouterContext = {};

    const store = createStore();

    const renderApp = () => {
      const jsx = (
        <Provider store={store}>
          <StaticRouter context={context} location={location}>
            <App />
          </StaticRouter>
        </Provider>
      );

      const reduxState = store.getState();

      if (context.url) {
        res.redirect(context.url);
        return;
      }

      const appContentHTML = renderToStaticMarkup(jsx);

      res
        .status(context.statusCode || 200)
        .send(makeHTMLPage(appContentHTML, reduxState));
    };

    const dataRequirements: (Promise<void> | void)[] = [];

    /**
     * Call the fetchData method on the component-page
     * that corresponds to the current url (by router).
     *
     * We use `some` method to simulate working of the routes in react-router-dom
     * inside the Switch — selects the first found route.
     */
    routes.some((route) => {
      const { fetchData: fetchMethod } = route;
      const match = matchPath<{ slug: string }>(
        url.parse(location).pathname as string,
        route,
      );

      if (match && fetchMethod) {
        dataRequirements.push(
          fetchMethod({
            dispatch: store.dispatch,
            match,
          }),
        );
      }

      return Boolean(match);
    });

    // When all async actions will be finished
    return Promise.all(dataRequirements)
      .then(() => {
        renderApp();
      })
      .catch((err) => {
        throw err;
      });
  },
};
