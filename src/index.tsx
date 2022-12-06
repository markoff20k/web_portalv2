import * as Sentry from '@sentry/browser';
//import 'antd/dist/antd.dark.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/es/table/style/index.css';
import * as React from 'react';
import 'antd/es/pagination/style/index.css';
import 'antd/es/modal/style/index.css';
//import 'antd/es/row/style/index.css';
//import 'antd/es/col/style/index.css';
import 'antd/es/slider/style/index.css';
import 'antd/es/dropdown/style/index.css';
import 'antd/es/form/style/index.css';
import 'antd/es/tooltip/style/index.css';
import 'antd/es/card/style/index.css';
import 'antd/es/statistic/style/index.css';
import 'antd/es/alert/style/index.css';

import 'antd/es/input/style/index.css';
import 'antd/es/select/style/index.css';

import 'antd/es/list/style/index.css';

import 'antd/es/tabs/style/index.css';
import 'antd/es/menu/style/index.css';
import 'antd/es/switch/style/index.css';


import * as ReactDOM from 'react-dom';
import { WrappedComponentProps } from 'react-intl';
import { Provider } from 'react-redux';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import 'slick-carousel/slick/slick-theme.css';
//import 'slick-carousel/slick/slick.css';
import { sentryEnabled } from './api/config';
import { App } from './App';
import './fortem.css';
import './index.css';
//import './index.css.backup';
//import './index2.css';
import './template_react/doob/src/assets/scss/style.scss';
import './blockchain.css';
import './button.css';
//import './antd.css';

//import './buttons.pcss';
//import './button.css';

//import 'bootstrap/dist/css/bootstrap-grid.min.css';
//import '@openware/react-components/build/index.css';
//import './themes/bootstrap/bootstrap-utilities.css';
import './Feather.svg';

import { rootSaga } from './modules';
import { rangerSagas } from './modules/public/ranger';
import { rangerMiddleware, sagaMiddleware, store } from './store';




if (!Intl.PluralRules) {
	require('@formatjs/intl-pluralrules/polyfill');
	require('@formatjs/intl-pluralrules/locale-data/en');
	require('@formatjs/intl-pluralrules/locale-data/pt');
}
// @ts-ignore
if (!Intl.RelativeTimeFormat) {
	require('@formatjs/intl-relativetimeformat/polyfill');
	require('@formatjs/intl-relativetimeformat/locale-data/en');
	require('@formatjs/intl-relativetimeformat/locale-data/pt');
}

sagaMiddleware.run(rootSaga);
rangerMiddleware.run(rangerSagas);

export type IntlProps = WrappedComponentProps;

if (sentryEnabled()) {
	const key = process.env.REACT_APP_SENTRY_KEY;
	const organization = process.env.REACT_APP_SENTRY_ORGANIZATION;
	const project = process.env.REACT_APP_SENTRY_PROJECT;

	if (key && key.length && organization && organization.length && project && project.length) {
		Sentry.init({ dsn: `https://${key}@${organization}.ingest.sentry.io/${project}` });
	}
}

const render = () =>
	ReactDOM.render(
		
		<Provider store={store}>
			
			<App />
		</Provider>,
		document.getElementById('root') as HTMLElement,
	);

render();
