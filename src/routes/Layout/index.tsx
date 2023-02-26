import { AirdropCoinListScreen } from 'plugins/AirdropCoin';
import { CompetitionListingScreen, CompetitionDetailScreen } from 'plugins/Competition/screen';
import { HolderStartingScreen } from 'plugins/Holder';
import { VoteScreen } from 'plugins/Vote';
import * as React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Route, RouterProps, Switch } from 'react-router';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { minutesUntilAutoLogout, sessionCheckInterval /* showLanding */ } from '../../api';
import { AnnouncementDetail, NewModal } from '../../components';
import { AdminAnnouncement, AnnouncementEdit, WalletsFetch } from '../../containers';
import { MarketsList } from '../../containers/MarketsList';
import { MarketsListExchange } from '../../containers/MarketsListExchange';
import { toggleColorTheme } from '../../helpers';
import { IntlProps } from '../../index';
import { AirdropCoinListMobileScreen, StakingDetailMobileScreen, StakingListMobileScreen } from '../../mobile/plugins';
import { IEODetailMobileScreen, IEOListMobileScreen } from '../../mobile/plugins/IEO';
import { TradingCompetionListMobileScreen, TradingCompetitionDetailMobileScreen } from '../../mobile/plugins/TradingCompetion';

import ScaleLoader from 'react-spinners/ScaleLoader';

/* import { isMobile } from "react-device-detect"; */
import {
	ChangeForgottenPasswordMobileScreen,
	ConfirmMobileScreen,
	DepositMobileScreen,
	EmailVerificationMobileScreen,
	HomePageScreenMobile,
	NewForgotPasswordScreen,
	NewMarketsScreenMobile,
	NewSignInMobileScreen,
	NewSignUpMobileScreen,
	NewTradingScreenMobile,
	NewWalletDetail,
	NewWalletHistoryMobileScreen,
	NewWalletsMobileScreen,
	OrdersMobileScreen,
	ProfileAccountActivityMobileScreen,
	ProfileApiKeysMobileScreen,
	ProfileAuthMobileScreen,
	ProfileChangePasswordMobileScreen,
	ProfileLanguageMobileScreen,
	ProfileMobileScreen,
	ProfileThemeMobileScreen,
	ProfileVerificationMobileScreen,
	ReferralMobileScreen,
	WithdrawMobileScreen,
} from '../../mobile/screens';
import {
	configsFetch,
	logoutFetch,
	Market,
	RootState,
	selectConfigsLoading,
	selectConfigsSuccess,
	selectCurrentColorTheme,
	selectCurrentMarket,
	selectMobileDeviceState,
	selectPlatformAccessStatus,
	selectUserFetching,
	selectUserInfo,
	selectUserLoggedIn,
	toggleChartRebuild,
	User,
	userFetch,
	walletsReset,
} from '../../modules';
import { CustomizationDataInterface, customizationFetch, selectCustomizationData } from '../../modules/public/customization';
import { AirdropDetail, AirdropList } from '../../plugins/Airdrop';
import { SaleListScreen, SaleDetailScreen } from '../../plugins/Sale';
import { StakingDetailScreen, StakingListScreen } from '../../plugins/Stake';
import {
	AnnouncementScreen,
	AssetsFeeScreen,
	ChangeForgottenPasswordScreen,
	ConfirmScreen,
	DepositScreen,
	EmailVerificationScreen,
	ForgotPasswordScreen,
	HistoryScreen,
	LogInScreen,
	MagicLink,
	MaintenanceScreen,
	OrdersTabScreen,
	 
	ProfileTwoFactorAuthScreen,
	Referral,
	RegisterScreen,
	RestrictedScreen,
	TradingScreen,
	
	VerificationScreen,
	WalletListScreen,
	WithdrawScreen,
	FortemIOHomePage,
	FortemIOHomePageMobile,

	PortfolioScreen,

	QuickExchange,
	KYCScreen,
} from '../../screens';

import { VerifyAccount } from 'plugins/KYC';

import { DocumentationScreen } from '../../v2/src/screens';

import { LandingScreenMobile } from '../../v2/src/mobile/screens';

import { WalletsScreen } from '../../v2/src/screens';

import FAQ from "../../screens/FortemFAQ/FAQ";

import Status from "../../template_react_status/src/components/App";

import { ProfileScreen2 } from 'screens/ProfileScreen2';


import Default from "../../ui_chakra/views/Dashboard/Default.js";

interface ReduxProps {
	colorTheme: string;
	currentMarket?: Market;
	customization?: CustomizationDataInterface;
	user: User;
	isLoggedIn: boolean;
	isMobileDevice: boolean;
	userLoading?: boolean;
	platformAccessStatus: string;
	configsLoading: boolean;
	configsSuccess: boolean;
}

interface DispatchProps {
	fetchConfigs: typeof configsFetch;
	fetchCustomization: typeof customizationFetch;
	logout: typeof logoutFetch;
	userFetch: typeof userFetch;
	walletsReset: typeof walletsReset;
}

interface LocationProps extends RouterProps {
	location: {
		pathname: string;
	};
}

interface LayoutState {
	isShownExpSessionModal: boolean;
}

interface OwnProps {
	toggleChartRebuild: typeof toggleChartRebuild;
}

export type LayoutProps = ReduxProps & DispatchProps & LocationProps & IntlProps & OwnProps;


const renderLoader = () => (
	<div className="pg-loader-container">
		{/* <Spinner animation="border" variant="primary" /> */}
		{/*<img src={spinerLoading} style={{width: '38px', margin: '0 auto'}}></img>*/}
		<ScaleLoader color="#009991" />
	</div>
);

const STORE_KEY = 'lastAction';

//tslint:disable-next-line no-any
const PrivateRoute: React.FunctionComponent<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
	if (loading) {
		return renderLoader();
	}
	const renderCustomerComponent = props => <CustomComponent {...props} />;

	if (isLogged) {
		return <Route {...rest} render={renderCustomerComponent} />;
	}

	return (
		<Route {...rest}>
			<Redirect to={'/signin'} />
		</Route>
	);
};

//tslint:disable-next-line no-any
const PublicRoute: React.FunctionComponent<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
	if (loading) {
		return renderLoader();
	}

	if (isLogged) {
		return (
			<Route {...rest}>
				<Redirect to={'/dash'} />
			</Route>
		);
	}

	const renderCustomerComponent = props => <CustomComponent {...props} />;

	return <Route {...rest} render={renderCustomerComponent} />;
};

class LayoutComponent extends React.Component<LayoutProps, LayoutState> {
	public static eventsListen = ['click', 'keydown', 'scroll', 'resize', 'mousemove', 'TabSelect', 'TabHide'];

	public timer;
	public walletsFetchInterval;

	constructor(props: LayoutProps) {
		super(props);
		this.initListener();

		this.state = {
			isShownExpSessionModal: false,
		};
	}

	public componentDidMount() {
		this.props.fetchConfigs();
		this.props.userFetch();
		this.initInterval();
		this.check();
	}

	public componentDidUpdate(prevProps: LayoutProps) {
		const { customization, isLoggedIn, history, userLoading } = this.props;

		if (!isLoggedIn && prevProps.isLoggedIn && !userLoading) {
			this.props.walletsReset();
			if (!history.location.pathname.includes('/')) {
				history.push('/');
			}
		}

		if (customization && customization !== prevProps.customization) {
			this.handleApplyCustomization(customization);
		}
	}

	public componentWillUnmount() {
		for (const type of LayoutComponent.eventsListen) {
			document.body.removeEventListener(type, this.reset);
		}
		clearInterval(this.timer);
		clearInterval(this.walletsFetchInterval);
	}

	public translate = (key: string) => this.props.intl.formatMessage({ id: key });

	public render() {
		const {
			colorTheme,
			isLoggedIn,
			isMobileDevice,
			userLoading,
			location,
			configsLoading,
			platformAccessStatus,
		} = this.props;
		const tradingCls = location.pathname.includes('/market') ? 'trading-layout' : '';
		toggleColorTheme(colorTheme);

		if (configsLoading && !platformAccessStatus.length) {
			return renderLoader();
		}

		if (isMobileDevice /* && isMobile */) {
			return (
				<div className={'container-fluid pg-layout pg-layout--mobile'}>
					<Switch>
						<PublicRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/signin"
							component={NewSignInMobileScreen}
						/>
						<PublicRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/signup"
							component={NewSignUpMobileScreen}
						/>

						<PublicRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/forgot_password"
							component={NewForgotPasswordScreen}
						/>
						<PublicRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/accounts/password_reset"
							component={ChangeForgottenPasswordMobileScreen}
						/>
						<PublicRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/accounts/confirmation"
							component={VerificationScreen}
						/>
						<PublicRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/email-verification"
							component={EmailVerificationMobileScreen}
						/>
						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/wallets/:currency/detail"
							component={NewWalletDetail}
						/>
						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/wallets/history"
							component={NewWalletHistoryMobileScreen}
						/>
						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/wallets/:currency/deposit"
							component={DepositMobileScreen}
						/>

						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/wallets/:currency/withdraw"
							component={WithdrawMobileScreen}
						/>
						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/confirm"
							component={ConfirmMobileScreen}
						/>
						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/wallets"
							component={NewWalletsMobileScreen}
						/>
						<PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/orders" component={OrdersMobileScreen} />
						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/profile/account-activity"
							component={ProfileAccountActivityMobileScreen}
						/>
						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/profile/api-keys"
							component={ProfileApiKeysMobileScreen}
						/>
						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/profile/language"
							component={ProfileLanguageMobileScreen}
						/>
						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/profile/2fa"
							component={ProfileAuthMobileScreen}
						/>
						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/profile/change-password"
							component={ProfileChangePasswordMobileScreen}
						/>
						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/profile/verification"
							component={ProfileVerificationMobileScreen}
						/>
						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/profile/theme"
							component={ProfileThemeMobileScreen}
						/>
						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/profile/referral"
							component={ProfileVerificationMobileScreen}
						/>
						<PrivateRoute
							loading={userLoading}
							isLogged={isLoggedIn}
							path="/profile"
							component={ProfileMobileScreen}
						/>

						<Route exact={false} path="/market/:market?" component={NewTradingScreenMobile} />
						
						<Route exact={true} path="/main" component={HomePageScreenMobile} />
						<Route exact={true} path="/" component={FortemIOHomePageMobile} />


						<Route exact={true} path="/home" component={FortemIOHomePageMobile} />
						
						<Route exact={true} path="/markets" component={NewMarketsScreenMobile} />
						<Route path="/tokenization" exact component={IEOListMobileScreen} />
						
						<PublicRoute path="/ieo/detail/:ieoID" exact component={SaleDetailScreen} />
						{/*<Route path="/ieo/detail/:ieoID" exact component={IEODetailMobileScreen} />*/}
						<Route path="/trading-competition" exact component={TradingCompetionListMobileScreen} />
						<Route
							path="/trading-competition/:competition_id"
							exact
							component={TradingCompetitionDetailMobileScreen}
						/>
						<Route path="/stake" exact component={StakingListMobileScreen} />
						<Route path="/stake/detail/:stake_id" exact component={StakingDetailMobileScreen} />
						<Route path="/vote" exact component={VoteScreen} />
						{/* new feature */}
						<Route path="/airdrops" exact component={AirdropCoinListMobileScreen} />
						{/* new feature */}

						<PublicRoute path="/tokens" exact component={SaleListScreen} />
						<PublicRoute path="/ieo/detail/:ieoID" exact component={SaleDetailScreen} />

						<Route path="*">
							<Redirect to="/home" />
						</Route>
					</Switch>
					{isLoggedIn && <WalletsFetch />}
					{this.handleRenderExpiredSessionModal()}
				</div>
			);
		}

		return (
			<div className={`container-fluid pg-layout ${tradingCls}`}>
				<Switch>
					<PublicRoute exact={true} path="/magic-link" component={MagicLink} />
					{/*TELA DE LOGIN*/}
					<PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/signin" component={LogInScreen} />
					{/*TELA DE CADASTRO*/}
					<PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/register" component={RegisterScreen} />
					<PublicRoute
						loading={userLoading}
						isLogged={isLoggedIn}
						path="/accounts/confirmation"
						component={VerificationScreen}
					/>

					<PublicRoute
						loading={userLoading}
						isLogged={isLoggedIn}
						path="/forgot_password"
						component={ForgotPasswordScreen}
					/>
		
					<PublicRoute
						loading={userLoading}
						isLogged={isLoggedIn}
						path="/accounts/password_reset"
						component={ChangeForgottenPasswordScreen}
					/>
					<PublicRoute
						loading={userLoading} 
						isLogged={isLoggedIn}
						path="/email-verification"
						component={EmailVerificationScreen}
					/>


					<PublicRoute

						path="/faq"
						component={FAQ}
					/>

<PublicRoute
						loading={userLoading} 
						isLogged={isLoggedIn}
						path="/status"
						component={Status}
					/>
					
					<PublicRoute path="/login" component={LogInScreen} />
					<PublicRoute path="/register" component={RegisterScreen} />

					
					

							
				 
					<PublicRoute path="/404" component={RestrictedScreen} />
					<PublicRoute path="/500" component={MaintenanceScreen} />
					<PublicRoute exact={false} path="/market/:market?" component={TradingScreen} />
					<PublicRoute exact={true} path="/" component={FortemIOHomePage} />
					<PublicRoute exact={true} path="/home" component={FortemIOHomePage} />
					<Route exact={true} path="/landing" component={LandingScreenMobile} />
					
					<PrivateRoute exact={true} loading={userLoading} isLogged={isLoggedIn} path="/docs" component={DocumentationScreen} />

					<PublicRoute exact={false} path="/fee" component={AssetsFeeScreen} />
					<PublicRoute path="/markets" component={MarketsList} />
					<PublicRoute path="/exchange" component={MarketsListExchange} />
					<PublicRoute path="/announcement" exact component={AnnouncementScreen} />
					<PublicRoute path="/referral" component={Referral} />

					<PrivateRoute
						loading={userLoading}
						isLogged={isLoggedIn}
						path="/announcement/create"
						component={AdminAnnouncement}
					/>
					<PrivateRoute
						loading={userLoading}
						isLogged={isLoggedIn}
						path="/announcement/edit/:id"
						component={AnnouncementEdit}
					/>
					<PrivateRoute
						loading={userLoading}
						isLogged={isLoggedIn}
						path="/announcement/detail/:id"
						component={AnnouncementDetail}
					/>
					{/* Dashboard Page */}


					<PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/orders" component={OrdersTabScreen} />
					<PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/history" component={HistoryScreen} />
					<PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/confirm" component={ConfirmScreen} />
					{/* OLD Profile Page */}
					
					<PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/sec" component={KYCScreen} />

					<PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/kyc" component={VerifyAccount} />

					{/* NEW Profile Page */}

					
					<PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile" component={ProfileScreen2} />

					<PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/admin/dashboard/default" component={Default} />
					
					{/*Wallets*/}
					<PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/dash" exact component={WalletsScreen} />
					<PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets" exact component={WalletListScreen} />					
					
					{/*Profile Test Page */}

					
					
					<PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets/deposit/:currency_id"
						exact
						component={DepositScreen}
					/>
					<PrivateRoute
						loading={userLoading}
						isLogged={isLoggedIn}
						path="/wallets/withdraw/:currency_id"
						exact
						component={WithdrawScreen}
					/>


<PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/security/2fa" component={ProfileTwoFactorAuthScreen} />




					<PrivateRoute
						loading={userLoading}
						isLogged={isLoggedIn}
						path="/security/2fa"
						component={ProfileTwoFactorAuthScreen}
					/>
					<PrivateRoute
						loading={userLoading}
						isLogged={isLoggedIn}
						path="/portfolio"
						component={PortfolioScreen}
					/>
					<PublicRoute path="/holder/starting" exact component={HolderStartingScreen} />


					<Route exact={true} path="/mobile" component={HomePageScreenMobile} />

					<PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/quick-exchange" component={QuickExchange} />

					{/* new feature */}
					<PublicRoute path="/airdrops" exact component={AirdropCoinListScreen} />
					{/* new feature */}
					{/* old feature */}
					<PublicRoute path="/airdrop" exact component={AirdropList} />
					<PrivateRoute
						loading={userLoading}
						isLogged={isLoggedIn}
						path="/airdrop/detail/:airdropID"
						component={AirdropDetail}
					/>
					{/* old feature */}
					<PublicRoute path="/tokens" exact component={SaleListScreen} />
					<PublicRoute path="/ieo/detail/:ieoID" exact component={SaleDetailScreen} />
					<PublicRoute path="/vote" exact component={VoteScreen} />
					<PublicRoute path="/trading-competition" exact component={CompetitionListingScreen} />
					<PublicRoute path="/trading-competition/:competition_id" exact component={CompetitionDetailScreen} />
					<PublicRoute path="/stake" exact component={StakingListScreen} />
					<PublicRoute path="/stake/detail/:stake_id" exact component={StakingDetailScreen} />

					<Route path="*">
							<Redirect to="/home" />
					</Route>


				</Switch>
				{isLoggedIn && <WalletsFetch />}
				{this.handleRenderExpiredSessionModal()}
			</div>
		);
	}

	private getLastAction = () => {
		if (localStorage.getItem(STORE_KEY) !== null) {
			return parseInt(localStorage.getItem(STORE_KEY) || '0', 10);
		}

		return 0;
	};

	private setLastAction = (lastAction: number) => {
		localStorage.setItem(STORE_KEY, lastAction.toString());
	};

	private initListener = () => {
		this.reset();
		for (const type of LayoutComponent.eventsListen) {
			document.body.addEventListener(type, this.reset);
		}
	};

	private reset = () => {
		this.setLastAction(Date.now());
	};

	private initInterval = () => {
		this.timer = setInterval(() => {
			this.check();
		}, parseFloat(sessionCheckInterval()));
	};

	private check = () => {
		const { user } = this.props;
		const now = Date.now();
		const timeleft = this.getLastAction() + parseFloat(minutesUntilAutoLogout()) * 60 * 1000;
		const diff = timeleft - now;
		const isTimeout = diff < 0;
		if (isTimeout && user.email) {
			if (user.state === 'active') {
				this.handleChangeExpSessionModalState();
			}

			this.props.logout();
		}
	};

	private handleSubmitExpSessionModal = () => {
		const { history } = this.props;
		this.handleChangeExpSessionModalState();
		history.push('/signin');
	};

	private handleRenderExpiredSessionModal = () => {
		const { isShownExpSessionModal } = this.state;

		return (
			<NewModal
				show={isShownExpSessionModal}
				onHide={this.handleChangeExpSessionModalState}
				titleModal={this.translate('page.modal.expired.title')}
				bodyModal={
					<Button block={true} type="button" onClick={this.handleSubmitExpSessionModal} size="lg" variant="primary">
						{this.translate('page.modal.expired.submit')}
					</Button>
				}
			/>
		);
	};

	private handleChangeExpSessionModalState = () => {
		this.setState({
			isShownExpSessionModal: !this.state.isShownExpSessionModal,
		});
	};

	private handleApplyCustomization = (customization: CustomizationDataInterface) => {
		const rootElement = document.documentElement;
		const parsedSettings = customization && customization.settings ? JSON.parse(customization.settings) : null;

		if (rootElement && parsedSettings && parsedSettings.theme_colors) {
			parsedSettings.theme_colors.reduce((result, item) => {
				const newItemColor = item.value;

				if (newItemColor) {
					rootElement.style.setProperty(item.key, item.value);
				}

				return result;
			}, {});

			this.props.toggleChartRebuild();
		}
	};
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
	configsLoading: selectConfigsLoading(state),
	configsSuccess: selectConfigsSuccess(state),
	colorTheme: selectCurrentColorTheme(state),
	currentMarket: selectCurrentMarket(state),
	customization: selectCustomizationData(state),
	user: selectUserInfo(state),
	isLoggedIn: selectUserLoggedIn(state),
	isMobileDevice: selectMobileDeviceState(state),
	userLoading: selectUserFetching(state),
	platformAccessStatus: selectPlatformAccessStatus(state),
});


const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
	fetchConfigs: () => dispatch(configsFetch()),
	fetchCustomization: () => dispatch(customizationFetch()),
	logout: () => dispatch(logoutFetch()),
	toggleChartRebuild: () => dispatch(toggleChartRebuild()),
	userFetch: () => dispatch(userFetch()),
	walletsReset: () => dispatch(walletsReset()),
});

export const Layout = compose(injectIntl, withRouter, connect(mapStateToProps, mapDispatchToProps))(LayoutComponent) as any;
