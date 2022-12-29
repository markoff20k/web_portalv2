import { DropdownElem } from '../components/Order';

export const PG_TITLE_PREFIX = 'Fortem ONE';

export const pgRoutes = (isLoggedIn: boolean, isLight?: boolean): string[][] => {
	const routes = [

	];
	const routesUnloggedIn = [

	];

	return isLoggedIn ? routes : routesUnloggedIn;
};

export const DEFAULT_CCY_PRECISION = 2;
export const STORAGE_DEFAULT_LIMIT = 200;
export const ORDER_BOOK_DEFAULT_SIDE_LIMIT = 30;
export const DEFAULT_TRADING_VIEW_INTERVAL = '30';
export const VALUATION_PRIMARY_CURRENCY = 'USD';
export const VALUATION_SECONDARY_CURRENCY = 'USDT';

export const QUOTE_CURRENCIES = ['USD'];

export const PASSWORD_ENTROPY_STEP = 14;

export const DEFAULT_KYC_STEPS = ['email', 'profile', 'document'];

export const DEFAULT_ORDER_TYPES: DropdownElem[] = ['Limit', 'Market'];
export const AMOUNT_PERCENTAGE_ARRAY = [0.25, 0.5, 0.75, 1];

export const DEFAULT_MARKET = {
	id: '',
	name: '',
	base_unit: '',
	quote_unit: '',
	min_price: '',
	max_price: 0,
	min_amount: 0,
	amount_precision: 0,
	price_precision: 0,
};

export const colors = {
	light: {
		chart: {
			primary: '#fff',
			up: '#54B489',
			down: '#E85E59',
		},
		navbar: {
			sun: 'var(--icons)',
			moon: 'var(--primary-text-color)',
		},
		orderBook: {
			asks: 'var(--asks-level-4)',
			bids: 'var(--bids-level-4)',
		},
		depth: {
			fillAreaAsk: '#ef5350',
			fillAreaBid: '#13b887',
			gridBackgroundStart: '#1a243b',
			gridBackgroundEnd: '#1a243b',
			strokeAreaAsk: '#fa5252',
			strokeAreaBid: '#12b886',
			strokeGrid: '#B8E9F5',
			strokeAxis: '#cccccc',
		},
	},
	basic: {
		chart: {
			primary: 'var(--rgb-body-background-color)',
			up: 'var(--rgb-system-green)',
			down: 'var(--rgb-system-red)',
		},
		navbar: {
			sun: 'var(--primary-text-color)',
			moon: 'var(--icons)',
		},
		orderBook: {
			asks: 'var(--asks-level-4)',
			bids: 'var(--bids-level-7)',
		},
		depth: {
			fillAreaAsk: 'var(--rgb-asks)',
			fillAreaBid: 'var(--rgb-bids)',
			gridBackgroundStart: 'var(--rgb-asks)',
			gridBackgroundEnd: 'var(--rgb-asks)',
			strokeAreaAsk: 'var(--rgb-asks)',
			strokeAreaBid: 'var(--rgb-bids)',
			strokeGrid: 'var(--rgb-secondary-contrast-cta-color)',
			strokeAxis: 'var(--rgb-secondary-contrast-cta-color)',
		},
	},
};