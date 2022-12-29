import { DEFAULT_KYC_STEPS, ORDER_BOOK_DEFAULT_SIDE_LIMIT, STORAGE_DEFAULT_LIMIT } from '../constants';

export const defaultConfig: Config = {
	/*
		api: {
		authzURL: 'http://localhost:9002/api/v2/barong',
		switchURL: 'http://localhost:9002/v2/applogic',
		transactionURL: 'http://localhost:9002/api/v2/peatio',
		ieoURL: 'http://localhost:9002/api/v2/peatio',

		infoURL: 'http://local.fortem-financia.io:9002/api/v2/peatio',
		downstreamURL: 'ws://local.fortem-financia.io:9003/api/public/',
	},
	*/

	
	api: {
		authzURL: 'https://www.fortem1.com.br/api/v2/auth',
		switchURL: 'https://www.fortem1.com.br/api/v2/applogic',
		transactionURL: 'https://www.fortem1.com.br/api/v2/peatio',
		ieoURL: 'https://www.fortem1.com.br/api/v2/peatio',

		infoURL: 'https://www.fortem1.com.br/api/v2/peatio',
		newKycURL: 'https://www.fortem1.com.br/api/v2/newKyc',
		statisticUrl: 'https://www.fortem1.com.br/api/v2/statistic',
		//downstreamURL: 'wss://www.fortem1.com.br/api/public/',
		downstreamURL: 'wss://www.fortem1.com.br/api/v2/ranger',

	},
	
	
	minutesUntilAutoLogout: '60',
	rangerReconnectPeriod: '1', 
	withCredentials: true,
	usernameEnabled: true,
	storage: {},
	gaTrackerKey: 'G-M47QL88D4R',
	msAlertDisplayTime: '10000',
	msPricesUpdates: '2000',
	incrementalOrderBook: true,
	finex: false,
	isResizable: true,
	isDraggable: true,
	languages: ['pt'],
	sessionCheckInterval: '5000',
	balancesFetchInterval: '2000',
	passwordEntropyStep: 14,
	showLanding: true,
	sentryEnabled: false,
	kycSteps: [
        'email',
        'profile',
        'document',
    ],


};


export const Cryptobase = {
	config: defaultConfig,
};

export const Window = {
	
		//env: config,
};


window.env = window.env || defaultConfig;
Cryptobase.config = { ...window.env };
Cryptobase.config.api.ieoURL = Cryptobase.config.api.ieoURL || '/api/v2/ieo';
Cryptobase.config.api.infoURL = Cryptobase.config.api.infoURL || '/api/v2/info';
Cryptobase.config.api.newKycURL = Cryptobase.config.api.newKycURL || '/api/v2/newKyc';
Cryptobase.config.api.statisticUrl = Cryptobase.config.api.statisticUrl || '/api/v2/statistic';
Cryptobase.config.storage = Cryptobase.config.storage || {};

export const transactionURL = () => Cryptobase.config.api.transactionURL;
export const authzURL = () => Cryptobase.config.api.authzURL;
export const switchURL = () => Cryptobase.config.api.switchURL;
export const ieoURL = () => Cryptobase.config.api.ieoURL;
export const downstreamURL = () => Cryptobase.config.api.downstreamURL;
export const infoURL = () => Cryptobase.config.api.infoURL;
export const newKycURL = () => Cryptobase.config.api.newKycURL;
export const statisticUrl = () => Cryptobase.config.api.statisticUrl;

export const minutesUntilAutoLogout = (): string => Cryptobase.config.minutesUntilAutoLogout || '15';
export const withCredentials = () => Cryptobase.config.withCredentials || true;
export const defaultStorageLimit = () => Cryptobase.config.storage.defaultStorageLimit || STORAGE_DEFAULT_LIMIT;
export const orderBookSideLimit = () => Cryptobase.config.storage.orderBookSideLimit || ORDER_BOOK_DEFAULT_SIDE_LIMIT;
export const gaTrackerKey = (): string => Cryptobase.config.gaTrackerKey || 'G-M47QL88D4R';
export const msAlertDisplayTime = (): string => Cryptobase.config.msAlertDisplayTime || '10000';
export const msPricesUpdates = () => Cryptobase.config.msPricesUpdates || '1000'
export const rangerReconnectPeriod = (): number =>
	Cryptobase.config.rangerReconnectPeriod ? Number(Cryptobase.config.rangerReconnectPeriod) : 1; 
export const incrementalOrderBook = (): boolean => Cryptobase.config.incrementalOrderBook || true;
export const isResizableGrid = (): boolean => Cryptobase.config.isResizable || true;
export const isDraggableGrid = (): boolean => Cryptobase.config.isDraggable || true;
export const languages =
	Cryptobase.config.languages && Cryptobase.config.languages.length > 0 ? Cryptobase.config.languages : ['pt'];
export const sessionCheckInterval = (): string => Cryptobase.config.sessionCheckInterval || '15000';
export const balancesFetchInterval = (): string => Cryptobase.config.balancesFetchInterval || '2000';
export const isFinexEnabled = (): boolean => Cryptobase.config.finex || false;
export const passwordEntropyStep = (): number => Cryptobase.config.passwordEntropyStep;
export const showLanding = (): boolean => Cryptobase.config.showLanding;
export const sentryEnabled = () => Cryptobase.config.sentryEnabled || defaultConfig.sentryEnabled;
export const kycSteps = (): string[] => Cryptobase.config.kycSteps || DEFAULT_KYC_STEPS;
export const isUsernameEnabled = (): boolean => true;
