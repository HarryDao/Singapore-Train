import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { reducers } from 'reducers';
import { sagas } from 'sagas';

export interface RootProps {
    initialState?: { [key: string]: any },
    children: ReactNode
}

export const Root = (function() {
    let store = createStore(reducers, {});

    class _Root extends React.Component<RootProps> {
        static getStore() {
            return store;
        }

        render() {
            const { initialState, children } = this.props;
            const sagaMiddleware = createSagaMiddleware();
            
            let enhancer;
            if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
                enhancer = composeWithDevTools as typeof compose;
            } else {
                enhancer = compose;
            }

            store = createStore(
                reducers,
                initialState,
                enhancer(
                    applyMiddleware(sagaMiddleware)
                )
            );

            sagaMiddleware.run(sagas);
            
            return (
                <Provider store={store}>
                    {children}
                </Provider>
            );
        }
    }

    return _Root;
})();