import { Route, Router } from "react-router-dom";
import React from "react";
import { createMemoryHistory } from "history";
import { Provider } from 'react-redux';
import store from '../store';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './query';

const WithProvider = (ui, {...rest} = {}) =>  (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Router history={createMemoryHistory()}>
                    <Route {...rest}>
                        {ui}
                    </Route>
                </Router>
            </Provider>
        </QueryClientProvider>
    )
export default WithProvider;
