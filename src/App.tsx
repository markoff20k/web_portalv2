import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactGA from 'react-ga';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { Router } from 'react-router';
import { gaTrackerKey } from './api';
import { ErrorWrapper } from './containers';
import { useCurrenciesFetchInterval, useSetMobileDevice } from './hooks';

import * as mobileTranslations from './mobile/translations';
import { selectCurrentLanguage, selectMobileDeviceState } from './modules';
import { languageMap } from './translations';
import { ParallaxProvider } from 'react-scroll-parallax';


const gaKey = gaTrackerKey();
const browserHistory = createBrowserHistory();
 
if (gaKey) {
	ReactGA.initialize(gaKey);
	browserHistory.listen(location => {
		ReactGA.set({ page: location.pathname });
		ReactGA.pageview(location.pathname);
	});
}

/* Mobile components  */
const MobileFooter = React.lazy(() =>
	import('./mobile/components/NewBottomNavbar').then(({ BottomNavbar }) => ({ default: BottomNavbar })),
);
const MobileHeader = React.lazy(() => import('./mobile/components/Header').then(({ Header }) => ({ default: Header })));

/* Desktop components */
const AlertsContainer = React.lazy(() => import('./containers/Alerts').then(({ Alerts }) => ({ default: Alerts })));
const CustomizationContainer = React.lazy(() =>
	import('./containers/Customization').then(({ Customization }) => ({ default: Customization })),
);
const FooterContainer = React.lazy(() => import('./containers/Footer').then(({ Footer }) => ({ default: Footer })));
const HeaderContainer = React.lazy(() => import('./containers/Header').then(({ Header }) => ({ default: Header })));
const HeaderAuthToolbar = React.lazy(() => import('./containers/HeaderAuthToolbar').then(({ HeaderAuthToolbar }) => ({ default: HeaderAuthToolbar })));
const LayoutContainer = React.lazy(() => import('./routes').then(({ Layout }) => ({ default: Layout })));

const getTranslations = (lang: string, isMobileDevice: boolean) => {
	if (isMobileDevice) {
		return {
			...languageMap[lang],
			...mobileTranslations[lang],
		};
	}

	return languageMap[lang];
};

const RenderDeviceContainers = () => {
	const isMobileDevice = useSelector(selectMobileDeviceState);



	

	if (isMobileDevice) {
		return (
			<div className="pg-mobile-app">
				<MobileHeader />
				<AlertsContainer />
				<LayoutContainer />
				<MobileFooter />
			</div>
		);
	}

	return (
		<React.Fragment>
            <HeaderContainer/>
            <HeaderAuthToolbar/>
            <CustomizationContainer/>
            <AlertsContainer/>
            <LayoutContainer/>
            <FooterContainer/>
		</React.Fragment>
	);
};

export const App = () => {
	useCurrenciesFetchInterval();
	useSetMobileDevice();
	const lang = useSelector(selectCurrentLanguage);
	const isMobileDevice = useSelector(selectMobileDeviceState);

	return (
		<ParallaxProvider>
		<IntlProvider locale={lang} messages={getTranslations(lang, isMobileDevice)} key={lang}>
			<Router history={browserHistory}>
				<ErrorWrapper>
					<React.Suspense fallback={null}>
						<RenderDeviceContainers />
					</React.Suspense>
				</ErrorWrapper>
			</Router>
		</IntlProvider>
		</ParallaxProvider>
	);
};
