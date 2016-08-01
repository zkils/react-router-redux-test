import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';
import { syncHistoryWithStore } from 'react-router-redux';
import resetStyle from './resources/css/reset.css';

import { IntlProvider} from 'react-intl-redux';
import { intlData } from './utils/initIntl';

const store = configureStore(intlData);
const history = syncHistoryWithStore(hashHistory,store);

// Provider를 통해 store를 생성 주입 해준다.
ReactDOM.render(
    <Provider store={store}>
        <IntlProvider key="intl" {...intlData}>
            <Router history={history} routes={routes}/>
        </IntlProvider>
    </Provider>,
    document.getElementById('app')
);
